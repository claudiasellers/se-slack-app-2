/**
 * Shared constants for the Slack Plan Comparison MCP server.
 */

/** Public web app the data mirrors. */
export const APP_URL = "https://claudiasellers.github.io/se-slack-app-2/";

/** GitHub repo backing the app. */
export const GITHUB_OWNER = "claudiasellers";
export const GITHUB_REPO = "se-slack-app-2";
export const GITHUB_BRANCH = process.env.SLACKPLAN_BRANCH ?? "main";

const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}`;

/** Path (in-repo) of the canonical feature data file. */
export const FEATURES_PATH = "src/data/features.ts";
/** Path (in-repo) of the component holding the category groupings. */
export const COMPONENT_PATH = "src/components/PlanComparisonTool.tsx";

export const FEATURES_RAW_URL = `${RAW_BASE}/${FEATURES_PATH}`;
export const COMPONENT_RAW_URL = `${RAW_BASE}/${COMPONENT_PATH}`;

/** Optional pre-built JSON published alongside the site (fallback source). */
export const FEATURES_JSON_URL = `${APP_URL}features.json`;

export const GITHUB_API_BASE = "https://api.github.com";

/** How long fetched data stays warm before we re-check GitHub, in ms. */
export const CACHE_TTL_MS = Number(process.env.SLACKPLAN_CACHE_TTL_MS ?? 10 * 60 * 1000);

/** Network timeout for any single upstream request, in ms. */
export const FETCH_TIMEOUT_MS = Number(process.env.SLACKPLAN_FETCH_TIMEOUT_MS ?? 15_000);

/**
 * Data sourcing mode.
 *  - "remote"  (default) fetch live from GitHub, fall back to the bundled snapshot
 *  - "bundled" never touch the network; always use the snapshot compiled into this build
 */
export const DATA_MODE = (process.env.SLACKPLAN_DATA_MODE ?? "remote") as "remote" | "bundled";

/** Optional token to raise the GitHub API rate limit for freshness lookups. */
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? process.env.SLACKPLAN_GITHUB_TOKEN;

/** Maximum characters in any single tool response before truncation kicks in. */
export const CHARACTER_LIMIT = 25_000;

export const SERVER_NAME = "slack-plan-comparison-mcp-server";
export const SERVER_VERSION = "1.0.0";
