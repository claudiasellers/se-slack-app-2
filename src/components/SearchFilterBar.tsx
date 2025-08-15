import React from "react"
import { Search, Filter, Eye, EyeOff } from "lucide-react"

interface SearchFilterBarProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  showOnlyPainPoints: boolean
  onTogglePainPoints: (show: boolean) => void
  lobName?: string
  viewMode: 'names' | 'detailed'
  onViewModeChange: (mode: 'names' | 'detailed') => void
  totalFeatures: number
  filteredFeatures: number
  painPointCount: number
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchTerm,
  onSearchChange,
  showOnlyPainPoints,
  onTogglePainPoints,
  lobName,
  viewMode,
  onViewModeChange,
  totalFeatures,
  filteredFeatures,
  painPointCount
}) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
      {/* Search and View Mode Row */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search features and descriptions..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex items-center bg-white border border-gray-300 rounded-md">
          <button
            onClick={() => onViewModeChange('names')}
            className={`px-3 py-2 text-sm font-medium rounded-l-md transition-colors ${
              viewMode === 'names' 
                ? 'bg-blue-100 text-blue-700 border-r border-blue-200' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50 border-r border-gray-300'
            }`}
          >
            <Eye className="h-4 w-4 inline mr-1" />
            Feature Names
          </button>
          <button
            onClick={() => onViewModeChange('detailed')}
            className={`px-3 py-2 text-sm font-medium rounded-r-md transition-colors ${
              viewMode === 'detailed' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <EyeOff className="h-4 w-4 inline mr-1" />
            Details
          </button>
        </div>
      </div>
      
      {/* Filters and Stats Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Pain Points Filter */}
          {lobName && painPointCount > 0 && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showPainPoints"
                checked={showOnlyPainPoints}
                onChange={(e) => onTogglePainPoints(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="showPainPoints" className="ml-2 text-sm text-gray-700 flex items-center">
                <Filter className="h-3 w-3 mr-1" />
                Show only {lobName} pain points
                <span className="ml-1 bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-medium">
                  {painPointCount}
                </span>
              </label>
            </div>
          )}
        </div>
        
        {/* Results Count */}
        <div className="text-sm text-gray-600">
          {searchTerm || showOnlyPainPoints ? (
            <span>
              Showing <span className="font-medium text-gray-900">{filteredFeatures}</span> of{" "}
              <span className="font-medium text-gray-900">{totalFeatures}</span> features
            </span>
          ) : (
            <span>
              <span className="font-medium text-gray-900">{totalFeatures}</span> features total
            </span>
          )}
        </div>
      </div>
      
      {/* Active Filters */}
      {(searchTerm || showOnlyPainPoints) && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Active filters:</span>
            
            {searchTerm && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Search: "{searchTerm}"
                <button
                  onClick={() => onSearchChange("")}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                  aria-label="Remove search filter"
                >
                  ×
                </button>
              </span>
            )}
            
            {showOnlyPainPoints && lobName && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {lobName} pain points only
                <button
                  onClick={() => onTogglePainPoints(false)}
                  className="ml-1 text-red-600 hover:text-red-800"
                  aria-label="Remove pain points filter"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}