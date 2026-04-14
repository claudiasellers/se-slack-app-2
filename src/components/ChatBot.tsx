import { useState, useRef, useEffect } from "react"
import { MessageSquare, X, Send, Bot, Settings } from "lucide-react"
import { featureData } from "../data/features"
import mixpanel from "mixpanel-browser"

type Message = {
  role: "user" | "assistant"
  content: string
}

// Build a system prompt that includes all feature data so Claude can answer accurately
function buildSystemPrompt(): string {
  const availability = featureData.featureAvailability as Record<string, Record<string, boolean | string>>
  const descriptions = featureData.featureDescriptions as Record<string, string>
  const painPoints = featureData.featurePainPoints as Record<string, Record<string, string>>

  const planKeys = ["free", "pro", "plus_v1", "plus_v2", "grid_v1", "grid_v2"]
  const planNames: Record<string, string> = {
    free: "Free", pro: "Pro", plus_v1: "Business+ V1", plus_v2: "Business+ V2",
    grid_v1: "Enterprise Grid V1", grid_v2: "Enterprise+",
  }
  const planHeader = planKeys.map((k) => planNames[k]).join(" | ")

  let prompt = `You are a helpful Slack Plan Assistant embedded in a Slack plan comparison tool. Help users understand Slack's plans, features, and find the right fit for their team.

## Guidelines
- Be concise and conversational. Keep responses under 250 words unless the user asks for detail.
- Use **bold** for feature names and plan names.
- Use bullet points for lists.
- When comparing plans, focus on the meaningful differences.
- When asked about a feature, include its description and which plans have it.
- When asked about use cases, reference the pain points data for the relevant department.
- Only reference features and plans from the data below — don't invent anything.
- If unsure, say so honestly.

## Slack Plans (lowest to highest tier)
- **Free** — Basic plan with limited features
- **Pro** — For small teams needing more functionality
- **Business+ V1** — Legacy Business+ plan
- **Business+ V2** — Current Business+ plan (includes Slack AI natively)
- **Enterprise Grid V1** — Legacy Enterprise plan for large organizations
- **Enterprise+** (grid_v2) — Current top-tier plan (includes Slack AI natively)

Slack AI was previously a separate add-on for Business+ V1 (plus_v1_ai) and Grid V1 (grid_v1_ai). It's now included natively in Business+ V2 and Enterprise+.

## Feature Availability
Feature | ${planHeader}
`
  for (const [feature, plans] of Object.entries(availability)) {
    const vals = planKeys.map((k) => {
      const v = plans[k]
      if (v === true) return "Yes"
      if (v === false) return "No"
      return String(v)
    })
    prompt += `${feature} | ${vals.join(" | ")}\n`
  }

  prompt += "\n## Feature Descriptions\n"
  for (const [feature, desc] of Object.entries(descriptions)) {
    if (desc) prompt += `- **${feature}**: ${desc}\n`
  }

  prompt += "\n## Pain Points by Department\n"
  for (const [feature, lobs] of Object.entries(painPoints)) {
    prompt += `### ${feature}\n`
    for (const [lob, pain] of Object.entries(lobs as Record<string, string>)) {
      prompt += `- ${lob}: ${pain}\n`
    }
  }

  return prompt
}

// Compute once at module level
const systemPrompt = buildSystemPrompt()

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Hi! I'm your Slack Plan Assistant, powered by Claude. I can help you understand Slack's plans, compare features, and find the right fit for your team. What would you like to know?",
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [apiKey, setApiKey] = useState(
    () => import.meta.env.VITE_ANTHROPIC_API_KEY || localStorage.getItem("anthropic_api_key") || ""
  )
  const [showSettings, setShowSettings] = useState(false)
  const [keyInput, setKeyInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (isOpen && !showSettings) inputRef.current?.focus()
  }, [isOpen, showSettings])

  const sendMessage = async (userText: string) => {
    if (isStreaming) return

    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: userText },
        { role: "assistant", content: "I need an Anthropic API key to respond. Click the gear icon above to add one." },
      ])
      setShowSettings(true)
      return
    }

    const userMessage: Message = { role: "user", content: userText }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsStreaming(true)

    mixpanel.track("Chatbot Message Sent", { message_length: userText.length })

    // Build API messages — skip the UI-only welcome message
    const currentMessages = [...messages.slice(1), userMessage]
    const apiMessages = currentMessages.map((m) => ({ role: m.role, content: m.content }))

    // Add an empty assistant message to stream into
    setMessages((prev) => [...prev, { role: "assistant", content: "" }])

    try {
      abortRef.current = new AbortController()

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1024,
          system: systemPrompt,
          messages: apiMessages,
          stream: true,
        }),
        signal: abortRef.current.signal,
      })

      if (!res.ok) {
        const body = await res.text().catch(() => "")
        console.error("[ChatBot] API error:", res.status, body)
        let errorMsg = "Something went wrong."
        if (res.status === 401) {
          errorMsg = "Invalid API key. Click the gear icon to update it."
          setShowSettings(true)
        } else if (res.status === 429) {
          errorMsg = "Rate limited — please wait a moment and try again."
        } else {
          errorMsg = `Error ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`
        }
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: "assistant", content: errorMsg }
          return updated
        })
        setIsStreaming(false)
        return
      }

      // Stream SSE response
      const reader = res.body?.getReader()
      if (!reader) throw new Error("No response body")

      const decoder = new TextDecoder()
      let accumulated = ""
      let buffer = ""
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n")
        buffer = lines.pop() || "" // keep incomplete last line

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue
          const data = line.slice(6)
          if (data === "[DONE]") continue

          try {
            const parsed = JSON.parse(data)
            if (parsed.type === "content_block_delta" && parsed.delta?.text) {
              accumulated += parsed.delta.text
              const current = accumulated
              setMessages((prev) => {
                const updated = [...prev]
                updated[updated.length - 1] = { role: "assistant", content: current }
                return updated
              })
            }
          } catch {
            // skip unparseable chunks
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return
      console.error("[ChatBot] Fetch error:", err)
      setMessages((prev) => {
        const updated = [...prev]
        const last = updated[updated.length - 1]
        if (last && last.role === "assistant" && last.content === "") {
          updated[updated.length - 1] = {
            role: "assistant",
            content: `Connection error: ${err instanceof Error ? err.message : "Unknown error"}. Check the browser console for details.`,
          }
        }
        return updated
      })
    } finally {
      setIsStreaming(false)
      abortRef.current = null
    }
  }

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed || isStreaming) return
    sendMessage(trimmed)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleChat = () => {
    const opening = !isOpen
    setIsOpen(opening)
    if (opening) mixpanel.track("Chatbot Opened")
  }

  const saveApiKey = () => {
    const trimmed = keyInput.trim()
    if (!trimmed) return
    setApiKey(trimmed)
    localStorage.setItem("anthropic_api_key", trimmed)
    setShowSettings(false)
    setKeyInput("")
  }

  // Render bold markdown and line breaks
  const renderContent = (text: string) => {
    const lines = text.split("\n")
    return lines.map((line, i) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g)
      return (
        <span key={i}>
          {parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={j}>{part.slice(2, -2)}</strong>
            }
            return <span key={j}>{part}</span>
          })}
          {i < lines.length - 1 && <br />}
        </span>
      )
    })
  }

  return (
    <>
      {/* Chat window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-4 left-4 z-50 flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:left-auto sm:right-6 sm:w-[380px]"
          style={{ height: "min(600px, calc(100vh - 140px))" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-[#4A154B] px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-white" />
              <div>
                <h3 className="text-sm font-semibold text-white">Slack Plan Assistant</h3>
                <p className="text-xs text-purple-200">Powered by Claude</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setShowSettings(!showSettings)
                  setKeyInput(apiKey)
                }}
                className="rounded-full p-1.5 text-purple-200 transition-colors hover:bg-white/10 hover:text-white"
                title="API Key Settings"
              >
                <Settings className="h-4 w-4" />
              </button>
              <button
                onClick={toggleChat}
                className="rounded-full p-1.5 text-purple-200 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Settings panel */}
          {showSettings && (
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
              <label className="mb-1.5 block text-xs font-medium text-gray-600">Anthropic API Key</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveApiKey()}
                  placeholder="sk-ant-..."
                  className="flex-1 rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs outline-none focus:border-[#4A154B] focus:ring-1 focus:ring-[#4A154B]/30"
                />
                <button
                  onClick={saveApiKey}
                  className="rounded-lg bg-[#4A154B] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#611f64]"
                >
                  Save
                </button>
              </div>
              <p className="mt-1.5 text-[10px] text-gray-400">
                Stored locally in your browser. Never sent anywhere except Anthropic's API.
              </p>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.content && (
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#4A154B] text-white rounded-br-md"
                        : "bg-gray-100 text-gray-800 rounded-bl-md"
                    }`}
                  >
                    {renderContent(msg.content)}
                  </div>
                )}
              </div>
            ))}
            {isStreaming && messages[messages.length - 1]?.content === "" && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions — show only on initial state */}
          {messages.length <= 1 && (
            <div className="border-t border-gray-100 px-4 py-2">
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Compare Business+ vs Enterprise+",
                  "Slack AI features",
                  "Security & compliance",
                  "Help for sales teams",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    disabled={isStreaming}
                    className="rounded-full border border-[#4A154B]/20 bg-white px-3 py-1.5 text-xs text-[#4A154B] transition-colors hover:bg-[#4A154B]/5 disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gray-200 px-3 py-3">
            <div className="flex items-center gap-2 rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 focus-within:border-[#4A154B] focus-within:ring-1 focus-within:ring-[#4A154B]/30">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Slack plans..."
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
                disabled={isStreaming}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isStreaming}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4A154B] text-white transition-colors hover:bg-[#611f64] disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${
          isOpen ? "bg-gray-600 hover:bg-gray-700" : "bg-[#4A154B] hover:bg-[#611f64]"
        }`}
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageSquare className="h-6 w-6 text-white" />}
      </button>
    </>
  )
}
