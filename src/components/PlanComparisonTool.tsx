"use client"

import type React from "react"
import { useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Loader2,
  Users,
  FileText,
  MessageSquare,
  Lock,
  Settings,
  Zap,
  List,
  BarChart,
  Clock,
  Bot,
  Workflow,
  Shield,
  Database,
  UserCheck,
  Download,
  Cloud,
  Smartphone
} from "lucide-react"
import { featureData } from "../data/features"
import mixpanel from "mixpanel-browser"

// get feature icon
const getFeatureIcon = (feature: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    Canvas: <FileText className="h-5 w-5 text-[#2EB67D]" />,
    "Custom Canvas Templates": <FileText className="h-5 w-5 text-[#2EB67D]" />,
    "Slack Sales Templates": <FileText className="h-5 w-5 text-[#2EB67D]" />,
    "Clips": <MessageSquare className="h-5 w-5 text-[#36C5F0]" />,
    "Guests": <Users className="h-5 w-5 text-[#36C5F0]" />,
    "Slack Connect (Shared Channels)": <Users className="h-5 w-5 text-[#36C5F0]" />,
    "Sponsored Connections - Slack Connect": <Users className="h-5 w-5 text-[#36C5F0]" />,
    "Per-Org Customization - Slack Connect": <Settings className="h-5 w-5 text-[#4A154B]" />,
    "Multi-Workspace Channels": <MessageSquare className="h-5 w-5 text-[#36C5F0]" />,
    "Channel Posting Permissions": <Lock className="h-5 w-5 text-[#E01E5A]" />,
    "Workflow Builder": <Workflow className="h-5 w-5 text-[#ECB22E]" />,
    "Message Activity": <BarChart className="h-5 w-5 text-[#36C5F0]" />,
    "Slack Catch Up": <MessageSquare className="h-5 w-5 text-[#36C5F0]" />,
    "Slack AI": <Bot className="h-5 w-5 text-[#4A154B]" />,
    "Out of Office Responder": <Clock className="h-5 w-5 text-[#ECB22E]" />,
    "Lists": <List className="h-5 w-5 text-[#2EB67D]" />,
    "Slack Channel Templates": <FileText className="h-5 w-5 text-[#2EB67D]" />,
    "Granular Admin Roles": <Settings className="h-5 w-5 text-[#4A154B]" />,
    "Central Channel Dashboard": <BarChart className="h-5 w-5 text-[#36C5F0]" />,
    "Admin API": <Settings className="h-5 w-5 text-[#4A154B]" />,
    "Analytics API (Members)": <BarChart className="h-5 w-5 text-[#36C5F0]" />,
    "Analytics API (Conversations)": <BarChart className="h-5 w-5 text-[#36C5F0]" />,
    "App Analytics": <BarChart className="h-5 w-5 text-[#36C5F0]" />,
    "Custom Retention Policies (Workspace)": <Database className="h-5 w-5 text-[#E01E5A]" />,
    "Custom Retention Policies (Org-Wide)": <Database className="h-5 w-5 text-[#E01E5A]" />,
    "Lock Guest Names": <Lock className="h-5 w-5 text-[#E01E5A]" />,
    "Google OAuth 2.0": <UserCheck className="h-5 w-5 text-[#E01E5A]" />,
    "SAML SSO": <Shield className="h-5 w-5 text-[#E01E5A]" />,
    "Multi-SAML SSO": <Shield className="h-5 w-5 text-[#E01E5A]" />,
    "SCIM API Provisioning": <Settings className="h-5 w-5 text-[#4A154B]" />,
    "SCIM API (Guest Provisioning)": <Settings className="h-5 w-5 text-[#4A154B]" />,
    "Atlas": <Users className="h-5 w-5 text-[#36C5F0]" />,
    "Custom User Groups": <Users className="h-5 w-5 text-[#36C5F0]" />,
    "IDP Groups": <Users className="h-5 w-5 text-[#36C5F0]" />,
    "Session Duration - Desktop + Mobile": <Clock className="h-5 w-5 text-[#ECB22E]" />,
    "Session Management": <Settings className="h-5 w-5 text-[#4A154B]" />,
    "Domain Claiming (create workspace)": <Lock className="h-5 w-5 text-[#E01E5A]" />,
    "MDM (Mobile Device Management)": <Shield className="h-5 w-5 text-[#E01E5A]" />,
    "MAM (Mobile Application Management)": <Shield className="h-5 w-5 text-[#E01E5A]" />,
    "Native Mobile Controls": <Settings className="h-5 w-5 text-[#4A154B]" />,
    "EKM (Enterprise Key Management)": <Lock className="h-5 w-5 text-[#E01E5A]" />,
    "Block File Downloads (Desktop + Mobile)": <Lock className="h-5 w-5 text-[#E01E5A]" />,
    "Legal Holds": <Lock className="h-5 w-5 text-[#E01E5A]" />,
    "Information Barriers": <Shield className="h-5 w-5 text-[#E01E5A]" />,
    "DLP (Data Loss Prevention)": <Shield className="h-5 w-5 text-[#E01E5A]" />,
    "Native DLP": <Shield className="h-5 w-5 text-[#E01E5A]" />,
    "Audit Logs API": <Database className="h-5 w-5 text-[#E01E5A]" />,
    "Audit Logs (Native Dashboard)": <Database className="h-5 w-5 text-[#E01E5A]" />,
    "Discovery/DLP API": <Shield className="h-5 w-5 text-[#E01E5A]" />,
    "Exports (Public Data)": <Database className="h-5 w-5 text-[#E01E5A]" />,
    "Exports (Full Data)": <Database className="h-5 w-5 text-[#E01E5A]" />,
    "Exports (Single User Exports)": <Database className="h-5 w-5 text-[#E01E5A]" />,
    "Custom Terms of Service": <FileText className="h-5 w-5 text-[#2EB67D]" />,
    "Approve Workspaces": <Settings className="h-5 w-5 text-[#4A154B]" />,
    "Data Residency (IDR)": <Database className="h-5 w-5 text-[#E01E5A]" />,
    "Customer Support Tier": <MessageSquare className="h-5 w-5 text-[#36C5F0]" />,
    "99.99% Guaranteed Uptime SLA": <Zap className="h-5 w-5 text-[#ECB22E]" />,
    "Integrations": <Zap className="h-5 w-5 text-[#ECB22E]" />,
    "Salesforce Channels":  <Cloud className="h-5 w-5 text-[#36C5F0]" />,
    "Record Unfurls":<Cloud className="h-5 w-5 text-[#36C5F0]" />,
    "Record Search": <Cloud className="h-5 w-5 text-[#36C5F0]" />,
    "Record View & Edit": <Cloud className="h-5 w-5 text-[#36C5F0]" />,
    "Related List Views": <Cloud className="h-5 w-5 text-[#36C5F0]" />,
    "Connect multiple Salesforce orgs": <Cloud className="h-5 w-5 text-[#36C5F0]" />,
    "Salesforce standalone List Views": <Cloud className="h-5 w-5 text-[#36C5F0]" />,
    "Salesforce workflow automation (Event triggers)": <Cloud className="h-5 w-5 text-[#36C5F0]" />,
    "Salesforce workflow automation (Scheduled triggers)": <Cloud className="h-5 w-5 text-[#36C5F0]" />,
    "Sales Home": <Cloud className="h-5 w-5 text-[#36C5F0]" />,
    "Exports (Salesforce Channels)": <Cloud className="h-5 w-5 text-[#36C5F0]" />,
    "Native Device Management: Block Jailbroken Devices": <Smartphone className="h-5 w-5 text-[#4A154B]" />,
    "Native Device Management: Block Copy / Paste": <Smartphone className="h-5 w-5 text-[#4A154B]" />,
    "Salesforce Channel AI Summary Tab": <Zap className="h-5 w-5 text-[#36C5F0]" />,
  }

  return iconMap[feature] || <Zap className="h-5 w-5 text-[#ECB22E]" />
}

// categorize features
const categorizeFeatures = (features: string[]) => {
  if (!features || features.length === 0) {
    return {}
  }

  const categories: Record<string, string[]> = {
   "Collaboration Tools": [
      "Canvas",
      "Custom Canvas Templates",
      "Clips",
      "Slack Connect (Shared Channels)",
      "Multiple Workspaces",
      "Multi-Workspace Channels",
      "Lists",
      "Slack Channel Templates",
      "Workflow Builder",
      "Channel Posting Permissions"
    ],
    "Administration & Analytics": [
      "Granular Admin Roles",
      "Central Channel Dashboard",
      "Admin API",
      "Analytics API (Members)",
      "Analytics API (Conversations)",
      "App Analytics",
      "Atlas",
      "Message Activity",
      "Approve Workspaces",
    ],
    "Security & Compliance": [
      "Custom Retention Policies (Workspace)",
      "Custom Retention Policies (Org-Wide)",
      "SAML SSO",
      "Multi-SAML SSO",
      "Session Duration - Desktop + Mobile",
      "Session Management",
      "MDM (Mobile Device Management)",
      "MAM (Mobile Application Management)",
      "EMM (Enterprise Mobility Management)",
      "Native Device Management: Block Jailbroken Devices",
      "Native Device Management: Block Copy / Paste",
      "EKM (Enterprise Key Management)",
      "Block File Downloads (Desktop + Mobile)",
      "Legal Holds",
      "Information Barriers",
      "DLP (Data Loss Prevention)",
      "Native DLP",
      "Audit Logs API",
      "Audit Logs (Native Dashboard)",
      "Discovery/DLP API",
      "Data Residency (IDR)",
      "Custom Terms of Service"
    ],
    "External Collaboration": [
      "Guests",
      "Sponsored Connections - Slack Connect",
      "Per-Org Customization - Slack Connect",
      "Lock Guest Names"
    ],
    "User Management": [
      "SCIM API Provisioning",
      "SCIM API Provisioning (Guest Provisioning)",
      "Atlas",
      "Custom User Groups",
      "IDP Groups",
      "Domain Claiming (create workspace)",
      "Google OAuth 2.0",
    ],
    "Data & Exports": [
      "Exports (Public Data)",
      "Exports (Full Data)",
      "Exports (Single User Exports)",
      "Exports (Salesforce Channels)",
    ],
    "Support & Reliability": ["Guaranteed Uptime and Fast Customer Support"],
    "Slack AI": [
      "Thread & Channel Summaries",
      "File Summaries",
      "Recaps",
      "Huddles Notes",
      "Slack AI Search",
      "Enterprise Search",
      "3rd Party Agent Apps",
      "AI Workflow Builder",
      "AI Steps in Workflow Builder",
      "AI Action Items",
      "Catchup Summaries on Mobile",
      "AI Language Translations"
    ],
    "Salesforce Integration": [
      "Salesforce Channels",
      "Record Unfurls",
      "Record Search",
      "Record View & Edit",
      "Related List Views",
      "Connect multiple Salesforce orgs",
      "Salesforce standalone List Views",
      "Salesforce workflow automation (Event triggers)",
      "Salesforce workflow automation (Scheduled triggers)",
      "Sales Home",
      "Slack Sales Templates",
      "Salesforce Channel AI Summary Tab"
    ],
    "Other Features": [],
  }

  // Create a map of categorized features
  const categorized: Record<string, string[]> = {}

  // add all features that match  predefined categories
  for (const category in categories) {
    const categoryFeatures = features.filter((feature) => categories[category].includes(feature))

    if (categoryFeatures.length > 0) {
      categorized[category] = categoryFeatures
    }
  }

  // add remaining features to "Other Features"
  const otherFeatures = features.filter((feature) => {
    for (const category in categories) {
      if (category !== "Other Features" && categories[category].includes(feature)) {
        return false
      }
    }
    return true
  })

  if (otherFeatures.length > 0) {
    categorized["Other Features"] = otherFeatures
  }

  return categorized
}

// get section colors
const getSectionColor = (category: string) => {
  const colorMap: Record<string, string> = {
    "Collaboration Tools": "#36C5F0", // slack blue
    "Administration & Analytics": "#4A154B", // slack purple
    "Security & Compliance": "#E01E5A", // slack red
    "External Collaboration": "#2EB67D", // slack green
    "User Management": "#ECB22E", // slack yellow
    "Data & Exports": "#E01E5A", // slack red
    "Support & Reliability": "#36C5F0", // slack blue
    "Other Features": "#4A154B", // slack purple
  }

  return colorMap[category] || "#4A154B" // defaukt to slack purple
}

// include  new state variables
export default function PlanComparisonTool() {
  // tab state
  const [activeTab, setActiveTab] = useState<"feature-list" | "comparison-table">("feature-list")

  // feature List tab states (original functionality)
  const [currentPlan, setCurrentPlan] = useState("free")
  const [futurePlan, setFuturePlan] = useState("pro")
  const [upgradeFeatures, setUpgradeFeatures] = useState<string[]>([])

  // comparison table tab states (new functionality)
  const [selectedPlans, setSelectedPlans] = useState<string[]>(["free", "pro"])

  // shared states
  const [lineOfBusiness, setLineOfBusiness] = useState("")
  const [categorizedFeatures, setCategorizedFeatures] = useState<Record<string, string[]>>({})
  const [painPoints, setPainPoints] = useState<{ [key: string]: string }>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submittedLineOfBusiness, setSubmittedLineOfBusiness] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

  // get upgrade features (for Feature List tab)
  const getUpgradeFeatures = (current: string, future: string) => {
    const addedFeatures: string[] = []

    for (const feature in featureData.featureAvailability) {
      const currentAccess =
        featureData.featureAvailability[feature as keyof typeof featureData.featureAvailability][
          current as keyof (typeof featureData.featureAvailability)[keyof typeof featureData.featureAvailability]
        ] ?? false
      const futureAccess =
        featureData.featureAvailability[feature as keyof typeof featureData.featureAvailability][
          future as keyof (typeof featureData.featureAvailability)[keyof typeof featureData.featureAvailability]
        ] ?? false

      // Add feature if it's available in future plan but not in current plan
      if (currentAccess !== futureAccess && futureAccess) {
        addedFeatures.push(feature)
      }
    }

    return addedFeatures
  }

  // toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  // get LOB pain points
  const getLOBPainPoints = (features: string[], lob: string) => {
    const relevantPainPoints: { [key: string]: string } = {}

    features.forEach((feature) => {
      const painPoint = featureData.featurePainPoints[feature as keyof typeof featureData.featurePainPoints]
      if (painPoint && painPoint[lob as keyof typeof painPoint]) {
        relevantPainPoints[feature] = painPoint[lob as keyof typeof painPoint] as string
      }
    })

    return relevantPainPoints
  }

  // download PDF
  const downloadPDF = async () => {
    try {
      // new window for PDF content
      const printWindow = window.open("", "_blank")
      if (!printWindow) return

      // get current date for the filename
      const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      // build HTML for PDF
      let htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Slack Plan Comparison</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #4A154B;
              padding-bottom: 20px;
            }
            .header h1 {
              color: #4A154B;
              margin: 0;
              font-size: 24px;
            }
            .header p {
              color: #666;
              margin: 5px 0;
            }
            .plans-header {
              margin: 20px 0;
              text-align: center;
            }
            .plan-pill {
              display: inline-block;
              background: #f0f0f0;
              padding: 5px 10px;
              margin: 0 5px;
              border-radius: 15px;
              font-size: 12px;
              font-weight: bold;
            }
            .category {
              margin: 30px 0;
              page-break-inside: avoid;
            }
            .category-title {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 15px;
              padding: 10px;
              background: #f8f9fa;
              border-left: 4px solid #4A154B;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
              font-size: 12px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
              vertical-align: top;
            }
            th {
              background-color: #f8f9fa;
              font-weight: bold;
              text-align: center;
            }
            .feature-name {
              font-weight: bold;
              margin-bottom: 5px;
            }
            .feature-description {
              font-size: 10px;
              color: #666;
              line-height: 1.3;
            }
            .yes {
              color: #28a745;
              font-weight: bold;
              text-align: center;
            }
            .no {
              color: #dc3545;
              font-weight: bold;
              text-align: center;
            }
            .partial {
              color: #666;
              text-align: center;
              font-style: italic;
            }
            .pain-point {
              background: #fff5f5;
              border: 1px solid #fed7d7;
              padding: 5px;
              margin-top: 5px;
              border-radius: 3px;
            }
            .pain-point-title {
              font-size: 10px;
              font-weight: bold;
              color: #E01E5A;
              margin-bottom: 3px;
            }
            .pain-point-text {
              font-size: 9px;
              color: #666;
              line-height: 1.2;
            }
            @media print {
              body { margin: 0; }
              .category { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Slack Plan Comparison</h1>
            <p>Generated on ${currentDate}</p>
          </div>
          
          <div class="plans-header">
            <strong>Comparing Plans:</strong>
            ${selectedPlans
              .map((plan) => {
                const planLabel = planOptions.find((option) => option.value === plan)?.label || plan
                return `<span class="plan-pill">${planLabel}</span>`
              })
              .join("")}
          </div>
      `

      // add each category and its features
      Object.entries(categorizedFeatures).forEach(([category, features]) => {
        htmlContent += `
          <div class="category">
            <div class="category-title">${category}</div>
            <table>
              <thead>
                <tr>
                  <th style="width: 40%;">Feature</th>
                  ${selectedPlans
                    .map((plan) => {
                      const planLabel = planOptions.find((option) => option.value === plan)?.label || plan
                      return `<th style="width: ${60 / selectedPlans.length}%;">${planLabel}</th>`
                    })
                    .join("")}
                </tr>
              </thead>
              <tbody>
        `

        features.forEach((feature) => {
          const description =
            featureData.featureDescriptions[feature as keyof typeof featureData.featureDescriptions] ||
            "No description available."
          const hasPainPoint = submittedLineOfBusiness && painPoints[feature]

          htmlContent += `
            <tr>
              <td>
                <div class="feature-name">${feature}</div>
                <div class="feature-description">${description}</div>
                ${
                  hasPainPoint
                    ? `
                  <div class="pain-point">
                    <div class="pain-point-title">${lobOptions.find((option) => option.value === submittedLineOfBusiness)?.label} Pain Point</div>
                    <div class="pain-point-text">${painPoints[feature]}</div>
                  </div>
                `
                    : ""
                }
              </td>
              ${selectedPlans
                .map((plan) => {
                  const hasFeature =
                    featureData.featureAvailability[feature as keyof typeof featureData.featureAvailability][
                      plan as keyof (typeof featureData.featureAvailability)[keyof typeof featureData.featureAvailability]
                    ]

                  if (hasFeature === true) {
                    return `<td class="yes">✓ Yes</td>`
                  } else if (hasFeature === false) {
                    return `<td class="no">✗ No</td>`
                  } else {
                    return `<td class="partial">${hasFeature}</td>`
                  }
                })
                .join("")}
            </tr>
          `
        })

        htmlContent += `
              </tbody>
            </table>
          </div>
        `
      })

      htmlContent += `
        </body>
        </html>
      `

      // write content to new window
      printWindow.document.write(htmlContent)
      printWindow.document.close()

      // wait for content to load then print
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print()
          printWindow.close()
        }, 250)
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("There was an error generating the PDF. Please try again.")
    }
  }

  // handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      try {
        if (activeTab === "feature-list") {
          // feature list logic
          const features = getUpgradeFeatures(currentPlan, futurePlan)
          setUpgradeFeatures(features)

          // categoriz features
          const categorized = categorizeFeatures(features)
          setCategorizedFeatures(categorized)

          // get pain points if line of business is selected
          if (lineOfBusiness) {
            const lobPainPoints = getLOBPainPoints(features, lineOfBusiness)
            setPainPoints(lobPainPoints)
            setSubmittedLineOfBusiness(lineOfBusiness)
          } else {
            setPainPoints({})
            setSubmittedLineOfBusiness("")
          }
        } else {
          // comparison table logic - show all features from highest selected plan
          // get features from highest selected plan
          const planHierarchy = ["free", "pro", "plus_v1", "plus_v2", "grid_v1", "grid_v2"]
          const highestSelectedPlan =
            planHierarchy.reverse().find((plan) => selectedPlans.includes(plan)) || selectedPlans[0]

          // get ALL features available in highest selected plan
          const highestPlanFeatures: string[] = []
          for (const feature in featureData.featureAvailability) {
            const hasAccess =
              featureData.featureAvailability[feature as keyof typeof featureData.featureAvailability][
                highestSelectedPlan as keyof (typeof featureData.featureAvailability)[keyof typeof featureData.featureAvailability]
              ] ?? false

            if (hasAccess) {
              highestPlanFeatures.push(feature)
            }
          }

          // categorize features from highest plan
          const categorized = categorizeFeatures(highestPlanFeatures)
          setCategorizedFeatures(categorized)

          // default all categories expanded
          const initialExpandState: Record<string, boolean> = {}
          Object.keys(categorized).forEach((category) => {
            initialExpandState[category] = true
          })
          setExpandedCategories(initialExpandState)

          // get pain points if LOB selected
          if (lineOfBusiness) {
            const lobPainPoints = getLOBPainPoints(highestPlanFeatures, lineOfBusiness)
            setPainPoints(lobPainPoints)
            setSubmittedLineOfBusiness(lineOfBusiness)
          } else {
            setPainPoints({})
            setSubmittedLineOfBusiness("")
          }
        }

        setIsSubmitted(true)

        // mp event
        mixpanel.track("Plan Comparison Submitted", {
          tab: activeTab,
          currentPlan,
          futurePlan,
          selectedPlans,
          lineOfBusiness,
        })

        // mp user profile
        mixpanel.people.increment("Total Comparisons")
        mixpanel.people.set({
          "Line of Business": lineOfBusiness,
          "Last Comparison Date": new Date().toISOString(),
          "Last Used Tab": activeTab,
        })
      } catch (error) {
        console.error("Error during plan comparison:", error)
      } finally {
        setIsLoading(false)
      }
    }, 800)
  }

  //reset form when switching tabs
  const handleTabChange = (tab: "feature-list" | "comparison-table") => {
    setActiveTab(tab)
    setIsSubmitted(false)
    setLineOfBusiness("")
    setExpandedCategories({})
    setPainPoints({})
    setSubmittedLineOfBusiness("")

    // mp event tab change
    mixpanel.track("Tab Changed", { tab: tab })
  }

  type PlanOption = { value: string; label: string }
  type PlanGroup = { label: string; options: PlanOption[] }
  type PlanStructure = (PlanOption | PlanGroup)[]

  const planGroups: PlanStructure = [
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro" },
    {
      label: "Business+",
      options: [
        { value: "plus_v1", label: "Business+ V1" },
        { value: "plus_v2", label: "Business+ V2" },
      ],
    },
    {
      label: "Enterprise",
      options: [
        { value: "grid_v1", label: "Grid V1" },
        { value: "grid_v2", label: "Enterprise+ V2" },
      ],
    },
  ]

  const planOptions: PlanOption[] = planGroups.flatMap((g) => ("options" in g ? g.options : g))

  const lobOptions: { value: string; label: string }[] = [
    { value: "", label: "Select Line of Business (Optional)" },
    { value: "it", label: "IT" },
    { value: "engineering", label: "Engineering" },
    { value: "sales", label: "Sales" },
    { value: "hr", label: "Human Resources" },
    { value: "marketing", label: "Marketing" },
    { value: "finance", label: "Finance" },
    { value: "customer_support", label: "Customer Support" },
    { value: "operations", label: "Operations" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#4A154B] text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg viewBox="0 0 54 54" className="h-8 w-8 text-white" fill="currentColor">
                <path d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386" />
                <path d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387" />
                <path d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386" />
                <path d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.25m14.336-.001v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.25a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387" />
              </svg>
              <h1 className="text-xl font-bold">Slack Plan Comparison</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-[#4A154B]">Find the right Slack plan for your team</h2>
          <p className="mt-2 text-gray-600">Compare plans to see what features you'll gain by upgrading</p>
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          {/* Left Column - Form */}
          <div className="md:col-span-4">
            <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-[#36C5F0]">Select Options</h3>

              <form onSubmit={handleSubmit}>
                {activeTab === "feature-list" ? (
                  // Feature List form
                  <>
                    <div className="mb-4">
                      <label htmlFor="currentPlan" className="mb-1 block font-medium text-[#36C5F0]">
                        Current Plan
                      </label>
                      <div className="relative">
                        <select
                          id="currentPlan"
                          value={currentPlan}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setCurrentPlan(e.target.value)
                            mixpanel.track("Plan Selection Changed", {
                              plan_type: "current",
                              selected_plan: e.target.value,
                              tab: activeTab,
                            })
                          }}
                          className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 shadow-sm focus:border-[#36C5F0] focus:outline-none focus:ring-2 focus:ring-[#36C5F0]/50"
                          disabled={isLoading}
                        >
                          {planGroups.map((group) => {
                            if ("options" in group) {
                              return (
                                <optgroup label={group.label} key={group.label}>
                                  {group.options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </optgroup>
                              )
                            }
                            return (
                              <option key={group.value} value={group.value}>
                                {group.label}
                              </option>
                            )
                          })}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="futurePlan" className="mb-1 block font-medium text-[#36C5F0]">
                        Future Plan
                      </label>
                      <div className="relative">
                        <select
                          id="futurePlan"
                          value={futurePlan}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setFuturePlan(e.target.value)
                            mixpanel.track("Plan Selection Changed", {
                              plan_type: "future",
                              selected_plan: e.target.value,
                              tab: activeTab,
                            })
                          }}
                          className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 shadow-sm focus:border-[#36C5F0] focus:outline-none focus:ring-2 focus:ring-[#36C5F0]/50"
                          disabled={isLoading}
                        >
                          {planGroups.map((group) => {
                            if ("options" in group) {
                              return (
                                <optgroup label={group.label} key={group.label}>
                                  {group.options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </optgroup>
                              )
                            }
                            return (
                              <option key={group.value} value={group.value}>
                                {group.label}
                              </option>
                            )
                          })}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </>
                ) : (
                  // Comparison Table form
                  <div className="mb-6">
                    <label htmlFor="planSelection" className="mb-1 block font-medium text-[#36C5F0]">
                      Select Plans to Compare
                    </label>
                    <div className="space-y-2">
                      {planOptions.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`plan-${option.value}`}
                            checked={selectedPlans.includes(option.value)}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              const plan = option.value
                              const action = e.target.checked ? "selected" : "deselected"
                              if (e.target.checked) {
                                setSelectedPlans((prev) => [...prev, option.value])
                              } else {
                                setSelectedPlans((prev) => prev.filter((p) => p !== option.value))
                              }
                              mixpanel.track("Compared Plans Selected", { plan, action, tab: activeTab })
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-[#36C5F0] focus:ring-[#36C5F0]"
                            disabled={isLoading}
                          />
                          <label htmlFor={`plan-${option.value}`} className="ml-2 block text-sm text-gray-900">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    {selectedPlans.length < 2 && (
                      <p className="mt-1 text-sm text-red-500">Please select at least 2 plans to compare</p>
                    )}
                  </div>
                )}

                <div className="mb-6">
                  <label htmlFor="lineOfBusiness" className="mb-1 block font-medium text-[#36C5F0]">
                    Line of Business
                  </label>
                  <div className="relative">
                    <select
                      id="lineOfBusiness"
                      value={lineOfBusiness}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        const lob = e.target.value
                        setLineOfBusiness(lob)
                        mixpanel.track("Line of Business Changed", { selected_lob: lob, tab: activeTab })
                      }}
                      className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 shadow-sm focus:border-[#36C5F0] focus:outline-none focus:ring-2 focus:ring-[#36C5F0]/50"
                      disabled={isLoading}
                    >
                      {lobOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#36C5F0] px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-[#2EAAD3] focus:outline-none focus:ring-2 focus:ring-[#36C5F0]/50 focus:ring-offset-2 disabled:opacity-70"
                  disabled={isLoading || (activeTab === "comparison-table" && selectedPlans.length < 2)}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {activeTab === "feature-list" ? "Comparing Plans..." : "Comparing Plans..."}
                    </span>
                  ) : activeTab === "feature-list" ? (
                    "Compare Plans"
                  ) : (
                    "Compare Plans"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="md:col-span-8">
            <div className="rounded-lg bg-white shadow-sm">
              {/* Tabs - Always visible */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
                  <button
                    onClick={() => handleTabChange("feature-list")}
                    className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                      activeTab === "feature-list"
                        ? "border-[#36C5F0] text-[#36C5F0]"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    New Feature List
                  </button>
                  <button
                    onClick={() => handleTabChange("comparison-table")}
                    className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                      activeTab === "comparison-table"
                        ? "border-[#36C5F0] text-[#36C5F0]"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Plan Comparison Table
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {!isSubmitted ? (
                  <div className="flex h-full items-center justify-center rounded-lg bg-gray-50 p-8 text-center">
                    <div>
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ECF4FB]">
                        <ArrowRight className="h-8 w-8 text-[#36C5F0]" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">Select plans to compare</h3>
                      <p className="mt-2 text-sm text-gray-500">
                        {activeTab === "feature-list"
                          ? "Choose your current and future plans to see what features you'll gain by upgrading"
                          : "Choose multiple plans to see features side-by-side"}
                      </p>
                    </div>
                  </div>
                ) : activeTab === "feature-list" ? (
                  // Feature List Content (Original functionality)
                  <>
                    <div className="mb-4 flex items-center">
                      <div className="flex items-center space-x-2">
                        <div className="rounded-md bg-gray-100 px-2 py-1 text-sm font-medium text-gray-800">
                          {planOptions.find((option) => option.value === currentPlan)?.label}
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <div className="rounded-md bg-[#4A154B] px-2 py-1 text-sm font-medium text-white">
                          {planOptions.find((option) => option.value === futurePlan)?.label}
                        </div>
                      </div>
                    </div>

                    <h3 className="mb-4 text-xl font-semibold text-[#4A154B]">Features you'll gain by upgrading</h3>

                    {upgradeFeatures.length === 0 ? (
                      <div className="rounded-lg bg-gray-50 p-4 text-center text-gray-500">
                        No additional features available in this upgrade path.
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {Object.entries(categorizedFeatures).map(([category, features]) => (
                          <div key={category}>
                            <h4 className="mb-3 text-lg font-medium" style={{ color: getSectionColor(category) }}>
                              {category}
                            </h4>
                            <div className="grid gap-4 sm:grid-cols-2">
                              {features.map((feature) => {
                                const hasPainPoint = submittedLineOfBusiness && painPoints[feature]

                                return (
                                  <div
                                    key={feature}
                                    className={`group relative rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md ${
                                      hasPainPoint ? "border-l-4 border-l-[#E01E5A] border-gray-200" : "border-gray-200"
                                    }`}
                                  >
                                    <div className="mb-2 flex items-start">
                                      <div className="mr-3 mt-0.5 flex-shrink-0">{getFeatureIcon(feature)}</div>
                                      <div className="w-full">
                                        <h4 className="font-semibold text-[#4A154B]">{feature}</h4>
                                        <p className="mt-1 text-sm text-gray-600">
                                          {featureData.featureDescriptions[
                                            feature as keyof typeof featureData.featureDescriptions
                                          ] || "No description available."}
                                        </p>

                                        {hasPainPoint && (
                                          <div className="mt-3 border-t border-dashed border-gray-200 pt-3">
                                            <div className="flex items-center">
                                              <div className="mr-2 h-2 w-2 rounded-full bg-[#E01E5A]"></div>
                                              <h5 className="text-sm font-medium text-[#E01E5A]">
                                                {
                                                  lobOptions.find((option) => option.value === submittedLineOfBusiness)
                                                    ?.label
                                                }{" "}
                                                Pain Point
                                              </h5>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-700">{painPoints[feature]}</p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  // Comparison Table Content
                  <>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {selectedPlans.map((plan) => (
                          <div
                            key={plan}
                            className="rounded-md bg-gray-100 px-2 py-1 text-sm font-medium text-gray-800"
                          >
                            {planOptions.find((option) => option.value === plan)?.label}
                          </div>
                        ))}
                      </div>

                      {/* Download PDF Button */}
                      <button
                        onClick={() => {
                          downloadPDF()
                          mixpanel.track("PDF Downloaded", {
                            compared_plans: selectedPlans,
                            line_of_business: submittedLineOfBusiness,
                            tab: activeTab,
                          })
                        }}
                        className="flex items-center space-x-2 rounded-md bg-[#4A154B] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#3A1240] focus:outline-none focus:ring-2 focus:ring-[#4A154B]/50 focus:ring-offset-2"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download PDF</span>
                      </button>
                    </div>

                    {/* Side-by-side comparison table */}
                    <div className="mb-8 overflow-x-auto">
                      <table className="w-full min-w-full divide-y divide-gray-200 border">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                              Feature
                            </th>
                            {selectedPlans.map((plan) => (
                              <th
                                key={plan}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                              >
                                {planOptions.find((option) => option.value === plan)?.label}
                              </th>
                            ))}
                          </tr>
                        </thead>
                      </table>
                    </div>

                    {/* Accordions for feature categories */}
                    <div className="space-y-4">
                      {Object.entries(categorizedFeatures).map(([category, features]) => (
                        <div key={category} className="rounded-lg border border-gray-200">
                          <button
                            onClick={() => {
                              toggleCategory(category)
                              mixpanel.track("Category Expanded", {
                                category_name: category,
                                action: expandedCategories[category] ? "collapsed" : "expanded",
                                tab: activeTab,
                              })
                            }}
                            className="flex w-full items-center justify-between rounded-t-lg bg-gray-50 px-4 py-3 text-left"
                          >
                            <h4 className="text-lg font-medium" style={{ color: getSectionColor(category) }}>
                              {category}
                            </h4>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                              {expandedCategories[category] ? (
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-gray-500" />
                              )}
                            </div>
                          </button>

                          {expandedCategories[category] && (
                            <div className="p-4">
                              <div className="overflow-x-auto">
                                <table className="w-full min-w-full divide-y divide-gray-200">
                                  <tbody className="divide-y divide-gray-200 bg-white">
                                    {features.map((feature) => (
                                      <tr
                                        key={feature}
                                        className={submittedLineOfBusiness && painPoints[feature] ? "bg-red-50" : ""}
                                      >
                                        <td className="px-6 py-4">
                                          <div className="flex items-start">
                                            <div className="mr-3 mt-0.5 flex-shrink-0">{getFeatureIcon(feature)}</div>
                                            <div>
                                              <div className="font-medium text-gray-900">{feature}</div>
                                              <div className="mt-1 text-sm text-gray-500 leading-tight">
                                                {featureData.featureDescriptions[
                                                  feature as keyof typeof featureData.featureDescriptions
                                                ] || "No description available."}
                                              </div>

                                              {submittedLineOfBusiness && painPoints[feature] && (
                                                <div className="mt-2 rounded-md bg-red-50 p-2">
                                                  <div className="flex items-center">
                                                    <div className="mr-2 h-2 w-2 rounded-full bg-[#E01E5A]"></div>
                                                    <span className="text-sm font-medium text-[#E01E5A]">
                                                      {
                                                        lobOptions.find(
                                                          (option) => option.value === submittedLineOfBusiness,
                                                        )?.label
                                                      }{" "}
                                                      Pain Point
                                                    </span>
                                                  </div>
                                                  <p className="mt-1 text-sm text-gray-700">{painPoints[feature]}</p>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </td>

                                        {selectedPlans.map((plan) => {
                                          const hasFeature =
                                            featureData.featureAvailability[
                                              feature as keyof typeof featureData.featureAvailability
                                            ][
                                              plan as keyof (typeof featureData.featureAvailability)[keyof typeof featureData.featureAvailability]
                                            ]

                                          return (
                                            <td
                                              key={`${feature}-${plan}`}
                                              className="whitespace-nowrap px-6 py-4 text-sm align-top"
                                            >
                                              {hasFeature === true ? (
                                                <div className="flex items-center text-green-600">
                                                  <svg
                                                    className="mr-1.5 h-5 w-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                  >
                                                    <path
                                                      fillRule="evenodd"
                                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                      clipRule="evenodd"
                                                    />
                                                  </svg>
                                                  <span>Yes</span>
                                                </div>
                                              ) : hasFeature === false ? (
                                                <div className="flex items-center text-red-600">
                                                  <svg
                                                    className="mr-1.5 h-5 w-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                  >
                                                    <path
                                                      fillRule="evenodd"
                                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                      clipRule="evenodd"
                                                    />
                                                  </svg>
                                                  <span>No</span>
                                                </div>
                                              ) : (
                                                <div className="text-gray-600">{hasFeature}</div>
                                              )}
                                            </td>
                                          )
                                        })}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Slack Technologies, LLC, a Salesforce company. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="#" className="hover:text-[#1264A3] hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:text-[#1264A3] hover:underline">
              Terms
            </a>
            <a href="#" className="hover:text-[#1264A3] hover:underline">
              Cookie Preferences
            </a>
            <a href="#" className="hover:text-[#1264A3] hover:underline">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
