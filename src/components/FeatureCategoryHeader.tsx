import React from "react"
import { ChevronRight, ChevronDown } from "lucide-react"

interface FeatureCategoryHeaderProps {
  category: string
  featureCount: number
  painPointCount: number
  isExpanded: boolean
  onToggle: () => void
  color: string
  showPainPointBadge: boolean
  className?: string
}

export const FeatureCategoryHeader: React.FC<FeatureCategoryHeaderProps> = ({
  category,
  featureCount,
  painPointCount,
  isExpanded,
  onToggle,
  color,
  showPainPointBadge,
  className = ""
}) => {
  return (
    <button
      onClick={onToggle}
      className={`flex w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-left hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
      aria-expanded={isExpanded}
      aria-controls={`category-${category.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className="flex items-center space-x-3 min-w-0 flex-1">
        <div 
          className="w-1 h-6 rounded-full flex-shrink-0"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
        <h4 
          className="text-lg font-medium flex-shrink-0"
          style={{ color }}
        >
          {category}
        </h4>
        
        <div className="flex items-center space-x-2 min-w-0">
          {/* Feature count badge */}
          <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full font-medium flex-shrink-0">
            {featureCount} feature{featureCount !== 1 ? 's' : ''}
          </span>
          
          {/* Pain points badge */}
          {showPainPointBadge && painPointCount > 0 && (
            <span className="text-xs text-red-700 bg-red-100 px-2 py-1 rounded-full font-medium flex-shrink-0">
              {painPointCount} pain point{painPointCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-2 flex-shrink-0">
        {/* Expansion indicator */}
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white border border-gray-200 transition-transform">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-500" />
          )}
        </div>
      </div>
    </button>
  )
}