import React from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { TruncatedText } from "./TruncatedText"
import { getFeatureIcon } from "../utils/featureUtils"

interface FeatureCardProps {
  feature: string
  description: string
  painPoint?: string
  lobName?: string
  isExpanded: boolean
  onToggleExpanded: (feature: string) => void
  viewMode: 'names' | 'detailed'
  searchTerm?: string
  className?: string
  category?: string
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  description,
  painPoint,
  lobName,
  isExpanded,
  onToggleExpanded,
  viewMode,
  searchTerm = "",
  className = "",
  category
}) => {
  const hasPainPoint = !!painPoint && !!lobName
  
  // Names mode: ultra-compact display
  if (viewMode === 'names') {
    return (
      <div 
        className={`group relative rounded-md border bg-white hover:bg-gray-50 transition-all ${
          hasPainPoint ? "border-l-4 border-l-[#E01E5A] border-r border-t border-b border-gray-200" : "border-gray-200"
        } ${className}`}
      >
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center flex-1 min-w-0">
            <div className="mr-3 flex-shrink-0">
              {getFeatureIcon(feature, category)}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-medium text-[#4A154B] truncate pr-2">
                {feature}
              </h4>
              {/* Compact pain point indicator */}
              {hasPainPoint && (
                <div className="flex items-center text-xs text-red-600 mt-1">
                  <div className="mr-1.5 h-1.5 w-1.5 rounded-full bg-red-500"></div>
                  <span className="font-medium">{lobName} impact</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Always show expand button in names mode for details */}
          <button 
            onClick={() => onToggleExpanded(feature)}
            className="ml-2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            aria-label={isExpanded ? 'Hide details' : 'Show details'}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
        
        {/* Expanded details in names mode */}
        {isExpanded && (
          <div className="border-t border-gray-200 p-3 bg-gray-50">
            <div className="mb-3">
              <h5 className="text-sm font-medium text-gray-900 mb-2">Description</h5>
              <TruncatedText 
                text={description} 
                maxLength={200} 
                className="text-gray-700 text-sm"
                highlightTerm={searchTerm}
              />
            </div>
            
            {hasPainPoint && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <div className="flex items-center mb-2">
                  <div className="mr-2 h-2 w-2 rounded-full bg-[#E01E5A]"></div>
                  <h5 className="text-sm font-medium text-[#E01E5A]">
                    {lobName} Impact
                  </h5>
                </div>
                <TruncatedText 
                  text={painPoint} 
                  maxLength={200} 
                  className="text-red-700 text-sm"
                  highlightTerm={searchTerm}
                />
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
  
  // Detailed mode: full card display
  const showExpandButton = hasPainPoint
  
  return (
    <div 
      className={`group relative rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md ${
        hasPainPoint ? "border-l-4 border-l-[#E01E5A] border-r border-t border-b border-gray-200" : "border-gray-200"
      } ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start flex-1 min-w-0">
          <div className="mr-3 mt-0.5 flex-shrink-0">
                          {getFeatureIcon(feature, category)}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-[#4A154B] mb-2 pr-2">
              {feature}
            </h4>
            
            <div className="text-sm text-gray-600 mb-2 leading-relaxed">
              <TruncatedText 
                text={description} 
                maxLength={300} 
                className=""
                highlightTerm={searchTerm}
              />
            </div>
            
            {/* Show pain point indicator when collapsed */}
            {hasPainPoint && !isExpanded && (
              <div className="mt-2 flex items-center text-xs text-red-600">
                <div className="mr-1.5 h-1.5 w-1.5 rounded-full bg-red-500"></div>
                <span className="font-medium">{lobName} impact available</span>
              </div>
            )}
          </div>
        </div>
        
        {showExpandButton && (
          <button 
            onClick={() => onToggleExpanded(feature)}
            className="ml-2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            aria-label={isExpanded ? 'Hide pain point' : 'Show pain point'}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      
      {/* Expanded pain point content */}
      {isExpanded && hasPainPoint && (
        <div className="mt-4 border-t border-dashed border-gray-200 pt-4 animate-in slide-in-from-top-2 duration-200">
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="flex items-center mb-2">
              <div className="mr-2 h-2 w-2 rounded-full bg-[#E01E5A]"></div>
              <h5 className="text-sm font-medium text-[#E01E5A]">
                {lobName} Impact
              </h5>
            </div>
            <TruncatedText 
              text={painPoint} 
              maxLength={200} 
              className="text-red-700"
              highlightTerm={searchTerm}
            />
          </div>
        </div>
      )}
    </div>
  )
}