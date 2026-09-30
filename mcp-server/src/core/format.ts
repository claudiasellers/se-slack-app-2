/**
 * Shared response formatting: markdown rendering, truncation, deep links and
 * the standard tool-result envelope.
 */

import { APP_URL, CHARACTER_LIMIT } from "../constants.js";
import type { Availability, Dataset } from "../types.js";
import { formatAvailability } from "./plans.js";

export enum ResponseFormat {
  MARKDOWN = "markdown",
  JSON = "json",
}

/** Escape pipes so feature names never break a markdown table. */
function escapeCell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\n+/g, " ");
}

export function markdownTable(headers: string[], rows: string[][]): string {
  const lines = [
    `| ${headers.map(escapeCell).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(escapeCell).join(" | ")} |`),
  ];
  return lines.join("\n");
}

export function availabilityCell(value: Availability): string {
  if (value === true) return "Yes";
  if (value === false) return "—";
  return value;
}

export { formatAvailability };

/**
 * Deep link back to the web app.
 *
 * NOTE: the app does not read query parameters yet, so these land on the tool
 * with its defaults rather than pre-selecting the plans. The parameters are
 * included so the links start working the moment the app reads them, and so
 * the intended selection is legible to whoever receives the link.
 */
export function appLink(params: {
  plans?: string[];
  from?: string;
  to?: string;
  lob?: string;
  tab?: "feature-list" | "comparison-table";
}): string {
  const query = new URLSearchParams();
  if (params.tab) query.set("tab", params.tab);
  if (params.from) query.set("from", params.from);
  if (params.to) query.set("to", params.to);
  if (params.plans?.length) query.set("plans", params.plans.join(","));
  if (params.lob) query.set("lob", params.lob);

  const qs = query.toString();
  return qs ? `${APP_URL}?${qs}` : APP_URL;
}

/** One-line provenance footer so every answer says where the data came from. */
export function sourceFooter(dataset: Dataset): string {
  const sourceLabel = {
    "github-raw": "live from GitHub (`src/data/features.ts` on main)",
    "site-json": "the published site's features.json",
    "bundled-snapshot": "the snapshot bundled with this server build",
  }[dataset.source];

  const lines = [`_Source: ${sourceLabel}, read ${dataset.fetchedAt}._`];
  if (dataset.warnings.length) {
    lines.push("", ...dataset.warnings.map((w) => `> ⚠️ ${w}`));
  }
  return lines.join("\n");
}

export interface ToolResult {
  content: Array<{ type: "text"; text: string }>;
  structuredContent?: Record<string, unknown>;
  isError?: boolean;
}

/**
 * Build a tool result, truncating oversized markdown rather than flooding the
 * caller's context.
 */
export function toolResult(
  markdown: string,
  structured: Record<string, unknown>,
  format: ResponseFormat,
): ToolResult {
  let text = format === ResponseFormat.JSON ? JSON.stringify(structured, null, 2) : markdown;

  if (text.length > CHARACTER_LIMIT) {
    const keep = text.slice(0, CHARACTER_LIMIT - 400);
    text =
      `${keep}\n\n---\n\n**Response truncated** at ${CHARACTER_LIMIT.toLocaleString()} characters. ` +
      `Narrow it down with the \`category\`, \`features\` or \`limit\` parameters, ` +
      `or request \`response_format: "json"\` with fewer fields.`;
  }

  return {
    content: [{ type: "text", text }],
    structuredContent: structured,
  };
}

export function errorResult(message: string): ToolResult {
  return { content: [{ type: "text", text: `Error: ${message}` }], isError: true };
}

/** Turn a thrown value into an actionable message for the model. */
export function describeToolError(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}
