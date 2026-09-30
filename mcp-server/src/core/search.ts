/**
 * Feature name lookup and search.
 *
 * Feature names in the data are long and specific ("Enterprise search w/ 3P
 * read only connectors (OneDrive, Box, GDrive)"), so exact-match-only lookup
 * would be unusable in conversation. These helpers score partial matches and,
 * when a lookup misses, return near-misses to suggest.
 */

import type { Dataset } from "../types.js";
import { categoryOf } from "./categories.js";

export interface FeatureMatch {
  feature: string;
  category: string;
  description?: string;
  /** 0-1, higher is better. */
  score: number;
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function tokens(value: string): string[] {
  return normalize(value).split(" ").filter(Boolean);
}

/** Levenshtein distance, capped for speed on short strings. */
function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1]! + 1, prev[j]! + 1, prev[j - 1]! + cost);
    }
    prev = curr;
  }

  return prev[b.length]!;
}

/** Score how well `query` matches `feature`, searching name and description. */
function scoreFeature(query: string, feature: string, description?: string): number {
  const nQuery = normalize(query);
  const nFeature = normalize(feature);
  if (!nQuery) return 0;

  if (nFeature === nQuery) return 1;
  if (nFeature.startsWith(nQuery)) return 0.95;
  if (nFeature.includes(nQuery)) return 0.85;

  const queryTokens = tokens(query);
  const featureTokens = new Set(tokens(feature));
  const matched = queryTokens.filter((t) => featureTokens.has(t)).length;

  if (matched === queryTokens.length && queryTokens.length > 0) return 0.8;
  if (matched > 0) return 0.45 + 0.3 * (matched / queryTokens.length);

  // Typo tolerance on short queries only, where edit distance is meaningful.
  if (nQuery.length >= 4) {
    const distance = editDistance(nQuery, nFeature);
    const tolerance = Math.max(1, Math.floor(nQuery.length / 4));
    if (distance <= tolerance) return 0.6;
  }

  if (description && normalize(description).includes(nQuery)) return 0.35;

  return 0;
}

/** Ranked feature search across names and descriptions. */
export function searchFeatures(dataset: Dataset, query: string, limit = 20): FeatureMatch[] {
  const { featureAvailability, featureDescriptions } = dataset.featureData;

  const matches: FeatureMatch[] = [];
  for (const feature of Object.keys(featureAvailability)) {
    const description = featureDescriptions[feature];
    const score = scoreFeature(query, feature, description);
    if (score > 0) {
      matches.push({
        feature,
        category: categoryOf(dataset.categories, feature),
        ...(description ? { description } : {}),
        score,
      });
    }
  }

  matches.sort((a, b) => b.score - a.score || a.feature.localeCompare(b.feature));
  return matches.slice(0, limit);
}

export class FeatureNotFoundError extends Error {
  readonly suggestions: string[];

  constructor(query: string, suggestions: string[]) {
    const hint = suggestions.length
      ? ` Did you mean: ${suggestions.map((s) => `"${s}"`).join(", ")}?`
      : " Use slackplan_search_features to browse available feature names.";
    super(`No feature matches "${query}".${hint}`);
    this.name = "FeatureNotFoundError";
    this.suggestions = suggestions;
  }
}

/**
 * Resolve a single feature name, tolerating partial and near-miss input.
 * Throws with suggestions when nothing is confident enough.
 */
export function requireFeature(dataset: Dataset, query: string): string {
  if (dataset.featureData.featureAvailability[query]) return query;

  const matches = searchFeatures(dataset, query, 5);
  const best = matches[0];

  if (best && best.score >= 0.8) return best.feature;

  throw new FeatureNotFoundError(
    query,
    matches.map((m) => m.feature),
  );
}
