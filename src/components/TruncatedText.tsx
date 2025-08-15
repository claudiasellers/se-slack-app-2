import React, { useState } from "react"
import { truncateText } from "../utils/textUtils"

interface TruncatedTextProps {
  text: string
  maxLength?: number
  className?: string
  showMoreText?: string
  showLessText?: string
  highlightTerm?: string
}

export const TruncatedText: React.FC<TruncatedTextProps> = ({ 
  text, 
  maxLength = 100, 
  className = "",
  showMoreText = "Show More",
  showLessText = "Show Less",
  highlightTerm = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { truncated, needsTruncation } = truncateText(text, maxLength)
  
  const displayText = isExpanded ? text : truncated
  
  // Simple highlight function without dangerouslySetInnerHTML for security
  const renderText = (content: string) => {
    if (!highlightTerm.trim()) return content
    
    const parts = content.split(new RegExp(`(${highlightTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'))
    return parts.map((part, index) => 
      part.toLowerCase() === highlightTerm.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : part
    )
  }

  return (
    <div className={className}>
      <span className="text-sm leading-relaxed">
        {renderText(displayText)}
        {needsTruncation && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-1 text-blue-600 hover:text-blue-700 font-medium text-sm underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
            aria-label={isExpanded ? `Collapse text` : `Expand text`}
          >
            {isExpanded ? showLessText : showMoreText}
          </button>
        )}
      </span>
    </div>
  )
}