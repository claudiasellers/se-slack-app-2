import React from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface CollapseExpandAllProps {
  onCollapseAll: () => void
  onExpandAll: () => void
  totalCategories: number
  expandedCategories: number
}

export const CollapseExpandAll: React.FC<CollapseExpandAllProps> = ({
  onCollapseAll,
  onExpandAll,
  totalCategories,
  expandedCategories
}) => {
  const allExpanded = expandedCategories === totalCategories
  const allCollapsed = expandedCategories === 0

  return (
    <div className="mb-4 flex justify-end">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-600">
          {expandedCategories} of {totalCategories} categories expanded
        </span>
        <div className="flex gap-1">
          <button
            onClick={onExpandAll}
            disabled={allExpanded}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              allExpanded
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            <ChevronDown className="h-4 w-4 inline mr-1" />
            Expand All
          </button>
          <button
            onClick={onCollapseAll}
            disabled={allCollapsed}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              allCollapsed
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ChevronUp className="h-4 w-4 inline mr-1" />
            Collapse All
          </button>
        </div>
      </div>
    </div>
  )
}