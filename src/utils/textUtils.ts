// Text utility functions for the Slack Plan Comparison Tool

export interface TruncationResult {
  truncated: string
  needsTruncation: boolean
}

/**
 * Truncates text to specified length, ensuring we don't cut words in half
 */
export const truncateText = (text: string, maxLength: number): TruncationResult => {
  if (!text || text.length <= maxLength) {
    return { truncated: text, needsTruncation: false }
  }
  
  // Find the last space before maxLength to avoid cutting words
  const truncated = text.substring(0, maxLength).replace(/\s+\S*$/, '')
  return { 
    truncated: truncated + '...', 
    needsTruncation: true 
  }
}

/**
 * Filters features by search term, checking both feature names and descriptions
 */
export const filterFeaturesBySearch = (
  features: string[], 
  searchTerm: string, 
  descriptions: Record<string, string>
): string[] => {
  if (!searchTerm.trim()) return features
  
  const term = searchTerm.toLowerCase()
  return features.filter(feature => {
    const featureName = feature.toLowerCase()
    const description = descriptions[feature]?.toLowerCase() || ''
    
    return featureName.includes(term) || description.includes(term)
  })
}

/**
 * Highlights search terms in text for better UX
 */
export const highlightSearchTerm = (text: string, searchTerm: string): string => {
  if (!searchTerm.trim()) return text
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>')
}

/**
 * Counts features that have pain points for a given LOB
 */
export const countFeaturesWithPainPoints = (
  features: string[], 
  painPoints: Record<string, string>
): number => {
  return features.filter(feature => painPoints[feature]).length
}

/**
 * Determines if a category should be expanded by default based on content
 */
export const shouldExpandCategory = (
  features: string[], 
  painPoints: Record<string, string>,
  maxFeaturesForAutoExpand: number = 5
): boolean => {
  const hasPainPoints = features.some(feature => painPoints[feature])
  const isSmallCategory = features.length <= maxFeaturesForAutoExpand
  
  return hasPainPoints || isSmallCategory
}