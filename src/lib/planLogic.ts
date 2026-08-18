// Pure plan-comparison logic, shared by the React app and the MCP server.
//
// Lifted from PlanComparisonTool.tsx with semantics preserved exactly. No React,
// no JSX, no DOM — this module must stay importable from a plain Node process.
// Imports are relative (not the "@/" alias) so tsx can run it outside Vite.

import { featureData, legacyAddOns } from "../data/features"
import { featureCategories, planHierarchy, planOptions } from "../data/taxonomy"

export type Availability = boolean | string
type AvailabilityRow = Record<string, Availability>

const availability = featureData.featureAvailability as unknown as Record<string, AvailabilityRow>
const descriptions = featureData.featureDescriptions as unknown as Record<string, string>
const painPoints = featureData.featurePainPoints as unknown as Record<string, Record<string, string>>

/** Every feature name, in data order. */
export const allFeatures = (): string[] => Object.keys(availability)

export const planLabel = (plan: string): string =>
  planOptions.find((p) => p.value === plan)?.label ?? plan

/**
 * Resolve a plan id from either its id ("grid_v2") or its display label
 * ("Enterprise+"), case-insensitively. Returns undefined if neither matches.
 */
export const resolvePlan = (input: string): string | undefined => {
  const needle = input.trim().toLowerCase()
  const byValue = planOptions.find((p) => p.value.toLowerCase() === needle)
  if (byValue) return byValue.value
  return planOptions.find((p) => p.label.toLowerCase() === needle)?.value
}

/**
 * Feature access for a plan, with legacy add-on override.
 * If an applicable add-on defines a suffixed key (e.g. plus_v1_ai), it wins;
 * otherwise fall back to the base plan key, defaulting to false.
 *
 * Verbatim from PlanComparisonTool.tsx:406.
 */
export const getFeatureAccess = (feature: string, plan: string, addOns: string[] = []): Availability => {
  const featureAvail = availability[feature]
  if (!featureAvail) return false

  for (const addOnKey of addOns) {
    const addOn = legacyAddOns[addOnKey]
    if (addOn && addOn.applicablePlans.includes(plan)) {
      const addOnPlanKey = `${plan}${addOn.planKeySuffix}`
      if (addOnPlanKey in featureAvail) {
        return featureAvail[addOnPlanKey]
      }
    }
  }

  return featureAvail[plan] ?? false
}

/**
 * TAB 1 ("New Feature List") — the upgrade delta.
 *
 * Features the future plan has that the current plan does not. Add-ons apply to
 * the CURRENT plan only: they describe what the customer already owns, so the
 * pitch doesn't over-claim. The future plan is evaluated on what it includes
 * natively. This asymmetry is deliberate — see PlanComparisonTool.tsx:431.
 *
 * Verbatim from PlanComparisonTool.tsx:426.
 */
export const getUpgradeFeatures = (current: string, future: string, currentAddOns: string[] = []): string[] => {
  const addedFeatures: string[] = []

  for (const feature in availability) {
    const currentAccess = getFeatureAccess(feature, current, currentAddOns)
    const futureAccess = getFeatureAccess(feature, future, []) // Future plan doesn't use legacy add-ons

    if (currentAccess !== futureAccess && futureAccess) {
      addedFeatures.push(feature)
    }
  }

  return addedFeatures
}

/**
 * TAB 2 helper — the highest tier among the selected plans.
 *
 * Note: the original spelled this `planHierarchy.reverse().find(...)`, which was
 * safe only because the array was re-declared inside the handler. planHierarchy
 * is now shared, so the copy is required to avoid mutating it.
 * From PlanComparisonTool.tsx:760.
 */
export const getHighestPlan = (selectedPlans: string[]): string =>
  [...planHierarchy].reverse().find((plan) => selectedPlans.includes(plan)) ?? selectedPlans[0]

/**
 * TAB 2 ("Plan Comparison Table") — every feature present in a plan.
 * Truthy availability counts, so caveat strings ("(Limited)", "Only 10") are
 * included. With no add-ons this matches the original raw lookup exactly.
 * From PlanComparisonTool.tsx:765.
 */
export const getPlanFeatures = (plan: string, addOns: string[] = []): string[] =>
  Object.keys(availability).filter((feature) => Boolean(getFeatureAccess(feature, plan, addOns)))

/**
 * Group features into display categories. Categories with no matches are
 * omitted; anything uncategorized lands in "Other Features".
 * Verbatim from PlanComparisonTool.tsx:167 (category table now in taxonomy.ts).
 */
export const categorizeFeatures = (features: string[]): Record<string, string[]> => {
  if (!features || features.length === 0) {
    return {}
  }

  const categorized: Record<string, string[]> = {}

  for (const category in featureCategories) {
    const categoryFeatures = features.filter((feature) => featureCategories[category].includes(feature))

    if (categoryFeatures.length > 0) {
      categorized[category] = categoryFeatures
    }
  }

  const otherFeatures = features.filter((feature) => {
    for (const category in featureCategories) {
      if (category !== "Other Features" && featureCategories[category].includes(feature)) {
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

/**
 * Pain points for a line of business, keyed by feature. Features with no entry
 * for that LOB are omitted.
 * Verbatim from PlanComparisonTool.tsx:467.
 */
export const getLOBPainPoints = (features: string[], lob: string): Record<string, string> => {
  const relevantPainPoints: Record<string, string> = {}

  features.forEach((feature) => {
    const painPoint = painPoints[feature]
    if (painPoint && painPoint[lob]) {
      relevantPainPoints[feature] = painPoint[lob]
    }
  })

  return relevantPainPoints
}

export const getDescription = (feature: string): string => descriptions[feature] ?? ""

/** All pain points for one feature, across every LOB. */
export const getAllPainPoints = (feature: string): Record<string, string> => painPoints[feature] ?? {}

/**
 * The tri-state availability rendering, previously inlined in both the PDF
 * builder (:672) and the table JSX (:1505).
 */
export const formatAvailability = (value: Availability): string => {
  if (value === true) return "Yes"
  if (value === false || value === undefined) return "No"
  return String(value)
}

/** TAB 2 as data: one row per feature, one cell per selected plan. */
export const comparePlans = (
  plans: string[],
  addOns: string[] = []
): { feature: string; description: string; cells: Record<string, Availability> }[] => {
  const highest = getHighestPlan(plans)
  return getPlanFeatures(highest, addOns).map((feature) => ({
    feature,
    description: getDescription(feature),
    cells: Object.fromEntries(plans.map((plan) => [plan, getFeatureAccess(feature, plan, addOns)])),
  }))
}
