/**
 * Loads the plan comparison dataset, preferring live data from GitHub so the
 * server reflects edits the moment they land on `main` - no redeploy needed.
 *
 * Source order:
 *   1. raw.githubusercontent.com  (features.ts + the component's category map)
 *   2. the published site's features.json, if the emit step is in place
 *   3. the snapshot compiled into this build
 *
 * Results are cached for CACHE_TTL_MS. A failed refresh never throws away a
 * good cached copy; it keeps serving the stale one and records a warning.
 */

import {
  CACHE_TTL_MS,
  COMPONENT_RAW_URL,
  DATA_MODE,
  FEATURES_JSON_URL,
  FEATURES_PATH,
  FETCH_TIMEOUT_MS,
  FEATURES_RAW_URL,
  GITHUB_API_BASE,
  GITHUB_BRANCH,
  GITHUB_OWNER,
  GITHUB_REPO,
  GITHUB_TOKEN,
} from "../constants.js";
import type { CategoryMap, CommitInfo, Dataset, FeatureData, LegacyAddOns } from "../types.js";
import { parseCategoryMap, parseFeaturesModule, validateFeatureData } from "./parse.js";
import { SNAPSHOT_CATEGORIES, SNAPSHOT_FEATURE_DATA, SNAPSHOT_GENERATED_AT, SNAPSHOT_LEGACY_ADD_ONS } from "./snapshot.js";

interface CacheEntry {
  dataset: Dataset;
  expiresAt: number;
}

let cache: CacheEntry | null = null;
let inFlight: Promise<Dataset> | null = null;

let commitCache: { info: CommitInfo | null; expiresAt: number } | null = null;

async function fetchText(url: string): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "text/plain, */*", "User-Agent": "slack-plan-comparison-mcp-server" },
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText} for ${url}`);
    }
    return await response.text();
  } finally {
    clearTimeout(timer);
  }
}

function describeError(error: unknown): string {
  if (error instanceof Error) {
    if (error.name === "AbortError") return `timed out after ${FETCH_TIMEOUT_MS}ms`;
    return error.message;
  }
  return String(error);
}

function snapshotDataset(warnings: string[]): Dataset {
  return {
    featureData: SNAPSHOT_FEATURE_DATA,
    legacyAddOns: SNAPSHOT_LEGACY_ADD_ONS,
    categories: SNAPSHOT_CATEGORIES,
    source: "bundled-snapshot",
    fetchedAt: new Date().toISOString(),
    warnings: [
      ...warnings,
      `Using the snapshot bundled with this build (taken ${SNAPSHOT_GENERATED_AT}). It may be behind the live tool.`,
    ],
  };
}

/** Try raw GitHub: the authoritative, always-current source. */
async function loadFromGitHubRaw(warnings: string[]): Promise<Dataset> {
  const [featuresSource, componentSource] = await Promise.all([
    fetchText(FEATURES_RAW_URL),
    fetchText(COMPONENT_RAW_URL).catch((error) => {
      warnings.push(
        `Could not read category groupings from the live component (${describeError(error)}); using bundled categories.`,
      );
      return null;
    }),
  ]);

  const { featureData, legacyAddOns } = parseFeaturesModule(featuresSource);

  let categories: CategoryMap = SNAPSHOT_CATEGORIES;
  if (componentSource) {
    try {
      categories = parseCategoryMap(componentSource);
    } catch (error) {
      warnings.push(`Could not parse category groupings (${describeError(error)}); using bundled categories.`);
    }
  }

  return {
    featureData,
    legacyAddOns,
    categories,
    source: "github-raw",
    fetchedAt: new Date().toISOString(),
    warnings,
  };
}

/** Fallback: a features.json artifact published next to the site, if present. */
async function loadFromSiteJson(warnings: string[]): Promise<Dataset> {
  const raw = await fetchText(FEATURES_JSON_URL);
  const parsed = JSON.parse(raw) as {
    featureData?: unknown;
    legacyAddOns?: LegacyAddOns;
    categories?: CategoryMap;
  };

  return {
    featureData: validateFeatureData(parsed.featureData) satisfies FeatureData,
    legacyAddOns: parsed.legacyAddOns ?? SNAPSHOT_LEGACY_ADD_ONS,
    categories: parsed.categories ?? SNAPSHOT_CATEGORIES,
    source: "site-json",
    fetchedAt: new Date().toISOString(),
    warnings,
  };
}

async function loadFresh(): Promise<Dataset> {
  if (DATA_MODE === "bundled") {
    return snapshotDataset([]);
  }

  const warnings: string[] = [];

  try {
    return await loadFromGitHubRaw(warnings);
  } catch (error) {
    warnings.push(`Live GitHub read failed (${describeError(error)}).`);
  }

  try {
    return await loadFromSiteJson(warnings);
  } catch (error) {
    warnings.push(`Published features.json unavailable (${describeError(error)}).`);
  }

  return snapshotDataset(warnings);
}

/**
 * Get the dataset, refreshing from upstream when the cache has expired.
 * Concurrent callers share a single in-flight refresh.
 */
export async function getDataset(options: { forceRefresh?: boolean } = {}): Promise<Dataset> {
  const now = Date.now();

  if (!options.forceRefresh && cache && cache.expiresAt > now) {
    return cache.dataset;
  }

  if (inFlight) return inFlight;

  inFlight = (async () => {
    try {
      const dataset = await loadFresh();
      cache = { dataset, expiresAt: Date.now() + CACHE_TTL_MS };
      return dataset;
    } catch (error) {
      if (cache) {
        // A refresh failure should never take a working server down.
        const stale: Dataset = {
          ...cache.dataset,
          warnings: [
            ...cache.dataset.warnings,
            `Refresh failed (${describeError(error)}); serving data cached at ${cache.dataset.fetchedAt}.`,
          ],
        };
        return stale;
      }
      return snapshotDataset([`Initial load failed (${describeError(error)}).`]);
    } finally {
      inFlight = null;
    }
  })();

  return inFlight;
}

/**
 * Last commit that touched the feature data file - this is what answers
 * "when was this last updated?" for the people who keep asking.
 */
export async function getLastUpdatedCommit(): Promise<CommitInfo | null> {
  const now = Date.now();
  if (commitCache && commitCache.expiresAt > now) return commitCache.info;

  const url = `${GITHUB_API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?path=${encodeURIComponent(
    FEATURES_PATH,
  )}&sha=${encodeURIComponent(GITHUB_BRANCH)}&per_page=1`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "slack-plan-comparison-mcp-server",
    };
    if (GITHUB_TOKEN) headers.Authorization = `Bearer ${GITHUB_TOKEN}`;

    const response = await fetch(url, { signal: controller.signal, headers });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const commits = (await response.json()) as Array<{
      sha?: string;
      html_url?: string;
      commit?: { message?: string; author?: { name?: string; date?: string } };
    }>;

    const head = commits[0];
    const info: CommitInfo | null = head?.sha
      ? {
          sha: head.sha,
          shortSha: head.sha.slice(0, 7),
          date: head.commit?.author?.date ?? "unknown",
          message: (head.commit?.message ?? "").split("\n")[0] ?? "",
          author: head.commit?.author?.name ?? "unknown",
          url: head.html_url ?? "",
        }
      : null;

    commitCache = { info, expiresAt: Date.now() + CACHE_TTL_MS };
    return info;
  } catch {
    // Freshness is a nice-to-have; never fail a tool call over it.
    commitCache = { info: null, expiresAt: Date.now() + 60_000 };
    return null;
  } finally {
    clearTimeout(timer);
  }
}
