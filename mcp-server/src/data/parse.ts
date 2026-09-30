/**
 * Parsers that turn the app's TypeScript source files into plain data.
 *
 * `src/data/features.ts` and the category map inside `PlanComparisonTool.tsx`
 * are pure object literals with no imports, no functions and no template
 * strings, so they can be read directly rather than mirrored by hand. That
 * keeps this server honest: it reports what the live site reports.
 *
 * SECURITY NOTE: evaluating a remote module means trusting whoever can push to
 * the repo. That is the same trust boundary as the published site itself, and
 * the fetch is pinned to a single HTTPS repo path. `validateFeatureData` below
 * rejects anything that does not have the expected shape, and setting
 * SLACKPLAN_DATA_MODE=bundled disables remote loading entirely.
 */

import type { CategoryMap, FeatureData, LegacyAddOns } from "../types.js";

export class ParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ParseError";
  }
}

/**
 * Strip the TypeScript-only bits from a pure-data module so it can be
 * evaluated as JavaScript.
 *
 * Handles `export const x: SomeType = {...}` -> `const x = {...}`. The type
 * annotations in this file never contain an `=`, so a non-greedy match to the
 * first `=` is safe.
 */
function stripTypeScript(source: string): string {
  if (/^\s*(import|export)\s+.*\bfrom\b/m.test(source) || /\brequire\s*\(/.test(source)) {
    throw new ParseError(
      "features.ts now contains imports, so it can no longer be read as a standalone data file. " +
        "Update the MCP server's parser, or publish a features.json build artifact instead.",
    );
  }

  return source
    .replace(/export\s+default\s+/g, "")
    .replace(/export\s+const\s+([A-Za-z_$][\w$]*)\s*(?::[^=]*)?=\s*/g, "const $1 = ")
    .replace(/\bas\s+const\b/g, "")
    .replace(/\bsatisfies\s+[A-Za-z_$][\w$<>,.\s[\]{}|]*(?=[;,\n])/g, "");
}

/**
 * Evaluate a data-only module body and pull out the named exports.
 *
 * Runs in a function scope with no arguments; the module body has no access to
 * anything this server holds, though it does share the process globals.
 */
function evaluateModule(body: string, wanted: string[]): Record<string, unknown> {
  const returnExpr = `{ ${wanted.map((n) => `${n}: typeof ${n} === "undefined" ? undefined : ${n}`).join(", ")} }`;
  try {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const fn = new Function(`"use strict";\n${body}\nreturn ${returnExpr};`);
    return fn() as Record<string, unknown>;
  } catch (error) {
    throw new ParseError(
      `Could not evaluate the feature data module: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Throw unless `value` really looks like the app's featureData export. */
export function validateFeatureData(value: unknown): FeatureData {
  if (!isPlainObject(value)) {
    throw new ParseError("featureData is missing or is not an object.");
  }

  const { featureAvailability, featureDescriptions, featurePainPoints } = value;

  if (!isPlainObject(featureAvailability) || Object.keys(featureAvailability).length === 0) {
    throw new ParseError("featureData.featureAvailability is missing or empty.");
  }

  for (const [feature, plans] of Object.entries(featureAvailability)) {
    if (!isPlainObject(plans)) {
      throw new ParseError(`featureAvailability["${feature}"] is not a plan -> availability map.`);
    }
    for (const [planKey, availability] of Object.entries(plans)) {
      if (typeof availability !== "boolean" && typeof availability !== "string") {
        throw new ParseError(
          `featureAvailability["${feature}"]["${planKey}"] must be a boolean or string, got ${typeof availability}.`,
        );
      }
    }
  }

  if (featureDescriptions !== undefined && !isPlainObject(featureDescriptions)) {
    throw new ParseError("featureData.featureDescriptions is not an object.");
  }
  if (featurePainPoints !== undefined && !isPlainObject(featurePainPoints)) {
    throw new ParseError("featureData.featurePainPoints is not an object.");
  }

  return {
    featureAvailability: featureAvailability as FeatureData["featureAvailability"],
    featureDescriptions: (featureDescriptions ?? {}) as FeatureData["featureDescriptions"],
    featurePainPoints: (featurePainPoints ?? {}) as FeatureData["featurePainPoints"],
  };
}

function validateLegacyAddOns(value: unknown): LegacyAddOns {
  if (!isPlainObject(value)) return {};
  const result: LegacyAddOns = {};
  for (const [key, addOn] of Object.entries(value)) {
    if (
      isPlainObject(addOn) &&
      typeof addOn.label === "string" &&
      Array.isArray(addOn.applicablePlans) &&
      typeof addOn.planKeySuffix === "string"
    ) {
      result[key] = {
        label: addOn.label,
        applicablePlans: addOn.applicablePlans.filter((p): p is string => typeof p === "string"),
        planKeySuffix: addOn.planKeySuffix,
      };
    }
  }
  return result;
}

/** Parse the contents of `src/data/features.ts`. */
export function parseFeaturesModule(source: string): {
  featureData: FeatureData;
  legacyAddOns: LegacyAddOns;
} {
  const body = stripTypeScript(source);
  const exports = evaluateModule(body, ["featureData", "legacyAddOns"]);
  return {
    featureData: validateFeatureData(exports.featureData),
    legacyAddOns: validateLegacyAddOns(exports.legacyAddOns),
  };
}

/**
 * Find a balanced `{ ... }` literal starting at the first `{` at or after
 * `startIndex`, skipping over string contents and comments.
 */
function extractBalancedObject(source: string, startIndex: number): string {
  const open = source.indexOf("{", startIndex);
  if (open === -1) throw new ParseError("Could not find the start of the category object literal.");

  let depth = 0;
  let quote: string | null = null;
  let escaped = false;

  for (let i = open; i < source.length; i++) {
    const ch = source[i]!;
    const next = source[i + 1];

    if (quote) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === quote) quote = null;
      continue;
    }

    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
      continue;
    }
    if (ch === "/" && next === "/") {
      const nl = source.indexOf("\n", i);
      i = nl === -1 ? source.length : nl;
      continue;
    }
    if (ch === "/" && next === "*") {
      const end = source.indexOf("*/", i + 2);
      i = end === -1 ? source.length : end + 1;
      continue;
    }

    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return source.slice(open, i + 1);
    }
  }

  throw new ParseError("Unbalanced braces while reading the category object literal.");
}

/**
 * Pull the `const categories: Record<string, string[]> = { ... }` map out of
 * PlanComparisonTool.tsx so category groupings stay in sync with the web app.
 */
export function parseCategoryMap(componentSource: string): CategoryMap {
  const marker = /const\s+categories\s*:\s*Record<\s*string\s*,\s*string\[\]\s*>\s*=/.exec(componentSource);
  if (!marker) {
    throw new ParseError(
      "Could not locate the `categories` map in PlanComparisonTool.tsx. " +
        "It may have been renamed or moved; the bundled snapshot will be used instead.",
    );
  }

  const literal = extractBalancedObject(componentSource, marker.index + marker[0].length);
  const evaluated = evaluateModule(`const categories = ${literal};`, ["categories"]).categories;

  if (!isPlainObject(evaluated)) {
    throw new ParseError("The parsed `categories` value is not an object.");
  }

  const result: CategoryMap = {};
  for (const [category, features] of Object.entries(evaluated)) {
    if (!Array.isArray(features)) {
      throw new ParseError(`categories["${category}"] is not an array.`);
    }
    result[category] = features.filter((f): f is string => typeof f === "string");
  }

  if (Object.keys(result).length === 0) {
    throw new ParseError("The parsed `categories` map is empty.");
  }

  return result;
}
