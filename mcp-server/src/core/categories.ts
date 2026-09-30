/**
 * Category grouping, matching `categorizeFeatures` in the web app: features
 * fall into their declared category, and anything unlisted lands in
 * "Other Features".
 */

import type { CategoryMap, Dataset } from "../types.js";

export const OTHER_CATEGORY = "Other Features";

/** Category a feature belongs to, or "Other Features". */
export function categoryOf(categories: CategoryMap, feature: string): string {
  for (const [category, features] of Object.entries(categories)) {
    if (category !== OTHER_CATEGORY && features.includes(feature)) return category;
  }
  return OTHER_CATEGORY;
}

/**
 * Group feature names into categories, preserving the app's category order and
 * dropping categories with no matches.
 */
export function groupByCategory(dataset: Dataset, features: string[]): Record<string, string[]> {
  const grouped: Record<string, string[]> = {};
  const claimed = new Set<string>();

  for (const [category, categoryFeatures] of Object.entries(dataset.categories)) {
    if (category === OTHER_CATEGORY) continue;
    const matches = features.filter((f) => categoryFeatures.includes(f));
    if (matches.length > 0) {
      grouped[category] = matches;
      matches.forEach((f) => claimed.add(f));
    }
  }

  const leftovers = features.filter((f) => !claimed.has(f));
  if (leftovers.length > 0) grouped[OTHER_CATEGORY] = leftovers;

  return grouped;
}

export function listCategories(dataset: Dataset): string[] {
  return Object.keys(dataset.categories);
}

/**
 * Match a caller-supplied category name case-insensitively, so "security"
 * finds "Security & Compliance".
 */
export function resolveCategory(dataset: Dataset, input: string): string | undefined {
  const needle = input.trim().toLowerCase();
  const names = listCategories(dataset);

  const exact = names.find((n) => n.toLowerCase() === needle);
  if (exact) return exact;

  const partial = names.filter((n) => n.toLowerCase().includes(needle));
  return partial.length === 1 ? partial[0] : undefined;
}
