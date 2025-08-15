import React from "react"
import { TruncatedText } from "./TruncatedText"
import { getFeatureIcon } from "../utils/featureUtils"

interface CompactFeatureRowProps {
  feature: string
  description: string
  painPoint?: string
  lobName?: string
  selectedPlans: string[]
  featureAvailability: Record<string, any>
  planOptions: Array<{ value: string; label: string }>
  searchTerm?: string
  viewMode?: 'names' | 'detailed'
  category?: string
}

export const CompactFeatureRow: React.FC<CompactFeatureRowProps> = ({
  feature,
  description,
  painPoint,
  lobName,
  selectedPlans,
  featureAvailability,
  planOptions,
  searchTerm = "",
  viewMode = 'names',
  category
}) => {
  const hasPainPoint = !!painPoint && !!lobName

  return (
    <>
      {/* Desktop Table Row */}
      <tr className={`hidden md:table-row ${hasPainPoint ? "bg-red-50" : ""}`}>
        <td className="px-6 py-4">
          <div className="flex items-start">
            <div className="mr-3 mt-0.5 flex-shrink-0">{getFeatureIcon(feature, category)}</div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-gray-900 mb-1">{feature}</div>
              {viewMode === 'detailed' && (
                <TruncatedText 
                  text={description} 
                  maxLength={150}
                  className="text-gray-500 text-xs leading-tight"
                  highlightTerm={searchTerm}
                />
              )}

              {hasPainPoint && (
                <details className="mt-2">
                  <summary className="text-xs text-red-600 cursor-pointer hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded">
                    📍 {lobName} Impact
                  </summary>
                  <div className="mt-1 text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200">
                    <TruncatedText 
                      text={painPoint} 
                      maxLength={120}
                      className="text-red-700"
                      highlightTerm={searchTerm}
                    />
                  </div>
                </details>
              )}
            </div>
          </div>
        </td>

        {selectedPlans.map((plan) => {
          const hasFeature = featureAvailability[plan]

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
                <div className="text-gray-600 text-xs">{hasFeature}</div>
              )}
            </td>
          )
        })}
      </tr>

      {/* Mobile Card View */}
      <div className="md:hidden border rounded-lg p-4 mb-4 bg-white">
        <div className="flex items-start mb-3">
          <div className="mr-3 flex-shrink-0">{getFeatureIcon(feature, category)}</div>
          <div className="min-w-0 flex-1">
            <h4 className="font-medium text-gray-900 mb-1">{feature}</h4>
            {viewMode === 'detailed' && (
              <TruncatedText 
                text={description} 
                maxLength={100}
                className="text-gray-600 text-sm"
                highlightTerm={searchTerm}
              />
            )}
            
            {hasPainPoint && (
              <details className="mt-2">
                <summary className="text-sm text-red-600 cursor-pointer hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded">
                  📍 {lobName} Impact
                </summary>
                <div className="mt-2 text-sm text-red-600 bg-red-50 p-3 rounded border border-red-200">
                  <TruncatedText 
                    text={painPoint} 
                    maxLength={150}
                    className="text-red-700"
                    highlightTerm={searchTerm}
                  />
                </div>
              </details>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          {selectedPlans.map(plan => {
            const planLabel = planOptions.find(option => option.value === plan)?.label || plan
            const hasFeature = featureAvailability[plan]
            
            return (
              <div key={plan} className="flex justify-between items-center py-1">
                <span className="text-gray-600 font-medium">{planLabel}:</span>
                <span className={`font-medium ${
                  hasFeature === true 
                    ? 'text-green-600' 
                    : hasFeature === false 
                      ? 'text-red-600' 
                      : 'text-gray-600'
                }`}>
                  {hasFeature === true ? '✓ Yes' : hasFeature === false ? '✗ No' : hasFeature}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}