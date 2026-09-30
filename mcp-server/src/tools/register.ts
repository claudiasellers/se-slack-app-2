/**
 * Tool registration for the Slack Plan Comparison MCP server.
 *
 * Every tool is read-only. Together they cover the two things the web app
 * does - "what do they gain upgrading X to Y" and "show me a side-by-side" -
 * plus the lookups that are awkward in a UI but natural in conversation.
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { APP_URL } from "../constants.js";
import { getDataset, getLastUpdatedCommit } from "../data/loader.js";
import { categoryOf, groupByCategory, listCategories, resolveCategory } from "../core/categories.js";
import {
  ResponseFormat,
  appLink,
  availabilityCell,
  describeToolError,
  errorResult,
  markdownTable,
  sourceFooter,
  toolResult,
} from "../core/format.js";
import { LOB_DEFINITIONS, getPainPoint, lobLabel, requireLob } from "../core/lob.js";
import {
  PLAN_DEFINITIONS,
  formatAvailability,
  getFeatureAccess,
  getLostFeatures,
  getUpgradeFeatures,
  isAvailable,
  planLabel,
  requirePlan,
  resolveAddOns,
  resolvedPlanLabel,
} from "../core/plans.js";
import { searchFeatures, requireFeature } from "../core/search.js";
import type { Availability, Dataset } from "../types.js";

const READ_ONLY = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: true,
} as const;

const responseFormatSchema = z
  .nativeEnum(ResponseFormat)
  .default(ResponseFormat.MARKDOWN)
  .describe("Output format: 'markdown' for a readable brief, 'json' for structured data.");

const planIdList = PLAN_DEFINITIONS.map((p) => p.id).join(" | ");
const lobIdList = LOB_DEFINITIONS.map((l) => l.id).join(" | ");

/** Shared: resolve a plan plus its add-ons, collecting any warnings. */
function resolvePlanWithAddOns(dataset: Dataset, planInput: string, addOnInput: string[]) {
  const plan = requirePlan(planInput);
  const { applied, ignored } = resolveAddOns(plan, addOnInput, dataset);
  return {
    plan,
    addOns: applied,
    label: resolvedPlanLabel(plan, applied, dataset),
    warnings: ignored.map(({ addOn, reason }) => `Ignored add-on "${addOn}": ${reason}.`),
  };
}

export function registerTools(server: McpServer): void {
  // ---------------------------------------------------------------------
  // 1. Plans, lines of business and categories - the vocabulary
  // ---------------------------------------------------------------------
  server.registerTool(
    "slackplan_list_plans",
    {
      title: "List Slack plans, add-ons, LOBs and categories",
      description: `List every Slack plan the comparison tool knows about, in upgrade order, along with legacy add-ons, lines of business, and feature categories.

Call this first when you are unsure what plan key, line of business or category name to pass to the other tools.

Args:
  - response_format ('markdown' | 'json'): Output format (default: 'markdown')

Returns JSON shaped as:
  {
    "plans": [{ "id": string, "label": string, "group": string?, "rank": number, "available_add_ons": string[], "aliases": string[] }],
    "legacy_add_ons": [{ "key": string, "label": string, "applicable_plans": string[] }],
    "lines_of_business": [{ "id": string, "label": string }],
    "categories": [{ "name": string, "feature_count": number }],
    "total_features": number
  }

Notes:
  - Plans are ordered free -> pro -> plus_v1 -> plus_v2 -> grid_v1 -> grid_v2.
  - "grid_v2" is labelled "Enterprise+"; "plus_v2" is "Business+ V2".
  - Legacy add-ons (currently the Slack AI Add-on) only apply to the older plans
    that could have purchased them: Pro, Business+ V1 and Grid V1.

Examples:
  - Use when: "What plans can I compare?" or "What are the valid LOB values?"
  - Don't use when: You already know the plan keys and want a comparison (use slackplan_compare_upgrade).`,
      inputSchema: { response_format: responseFormatSchema },
      annotations: READ_ONLY,
    },
    async ({ response_format }) => {
      try {
        const dataset = await getDataset();

        const categoryCounts = listCategories(dataset).map((name) => ({
          name,
          feature_count: (dataset.categories[name] ?? []).length,
        }));

        const structured = {
          plans: PLAN_DEFINITIONS.map((p) => ({
            id: p.id,
            label: p.label,
            ...(p.group ? { group: p.group } : {}),
            rank: p.rank,
            available_add_ons: p.availableAddOns,
            aliases: p.aliases,
          })),
          legacy_add_ons: Object.entries(dataset.legacyAddOns).map(([key, addOn]) => ({
            key,
            label: addOn.label,
            applicable_plans: [...addOn.applicablePlans],
          })),
          lines_of_business: LOB_DEFINITIONS.map((l) => ({ id: l.id, label: l.label, in_web_app: l.inWebApp })),
          categories: categoryCounts,
          total_features: Object.keys(dataset.featureData.featureAvailability).length,
          app_url: APP_URL,
        };

        const markdown = [
          "# Slack Plan Comparison — reference",
          "",
          "## Plans (upgrade order)",
          "",
          markdownTable(
            ["Key", "Label", "Group", "Legacy add-ons"],
            PLAN_DEFINITIONS.map((p) => [
              `\`${p.id}\``,
              p.label,
              p.group ?? "—",
              p.availableAddOns.length ? p.availableAddOns.join(", ") : "—",
            ]),
          ),
          "",
          "## Legacy add-ons",
          "",
          Object.entries(dataset.legacyAddOns).length
            ? markdownTable(
                ["Key", "Label", "Applies to"],
                Object.entries(dataset.legacyAddOns).map(([key, a]) => [
                  `\`${key}\``,
                  a.label,
                  a.applicablePlans.map(planLabel).join(", "),
                ]),
              )
            : "_None._",
          "",
          "## Lines of business",
          "",
          LOB_DEFINITIONS.map(
            (l) => `- \`${l.id}\` — ${l.label}${l.inWebApp ? "" : " _(in the data, not in the web app's dropdown)_"}`,
          ).join("\n"),
          "",
          "## Feature categories",
          "",
          categoryCounts.map((c) => `- ${c.name} (${c.feature_count})`).join("\n"),
          "",
          `**${structured.total_features} features** tracked in total.`,
          "",
          sourceFooter(dataset),
        ].join("\n");

        return toolResult(markdown, structured, response_format);
      } catch (error) {
        return errorResult(describeToolError(error));
      }
    },
  );

  // ---------------------------------------------------------------------
  // 2. The core question: what does a customer gain upgrading?
  // ---------------------------------------------------------------------
  server.registerTool(
    "slackplan_compare_upgrade",
    {
      title: "Compare an upgrade between two Slack plans",
      description: `Show exactly which features a customer gains by moving from one Slack plan to another, grouped by category, optionally framed around a line of business's pain points.

This is the primary tool - it reproduces the "New Feature List" tab of the Slack Plan Comparison Tool and uses the same logic, so results match the web app.

Args:
  - from_plan (string, required): Current plan. Accepts keys (${planIdList}) or names like "Business+ V2", "Ent+", "Grid V1".
  - to_plan (string, required): Target plan, same accepted formats.
  - line_of_business (string, optional): One of ${lobIdList}. Adds the customer pain point each gained feature solves for that team.
  - from_add_ons (string[], optional): Legacy add-ons the customer already owns on their CURRENT plan, e.g. ["slack_ai"]. Critical for legacy Pro / Business+ V1 / Grid V1 customers, who already have some AI features and should not be sold them again.
  - category (string, optional): Restrict to one category, e.g. "Security & Compliance" or just "security".
  - include_lost_features (boolean, optional, default true): Also report features available today that the target plan does not offer.
  - response_format ('markdown' | 'json'): Output format (default: 'markdown')

Returns JSON shaped as:
  {
    "from": { "plan": string, "label": string, "add_ons": string[] },
    "to": { "plan": string, "label": string },
    "line_of_business": string | null,
    "gained_count": number,
    "gained_by_category": { "<category>": [ { "feature": string, "description": string?, "from": bool|string, "to": bool|string, "pain_point": string? } ] },
    "lost_features": [ { "feature": string, "from": bool|string } ],
    "app_url": string
  }

Notes:
  - Availability can be a qualifier string, not just yes/no. "Per-Org Customization - Slack Connect" is "(Limited)" on Pro and true on Business+; that counts as a gain.
  - Legacy add-ons are deliberately NOT applied to the target plan, because newer plans bundle what the add-ons sold separately.
  - Upgrades are usually additive, but not always - Google OAuth 2.0 is on Pro/Business+ and not on Grid, so it can appear under lost features.

Examples:
  - Use when: "What does a Business+ V2 customer get by moving to Enterprise+?" -> from_plan="plus_v2", to_plan="grid_v2"
  - Use when: "Pitch Grid V1 + Slack AI to Enterprise+ for their IT team" -> from_plan="grid_v1", from_add_ons=["slack_ai"], to_plan="grid_v2", line_of_business="it"
  - Don't use when: You want availability across many plans at once (use slackplan_comparison_matrix).

Error handling:
  - Returns an error naming the valid plan keys if a plan cannot be resolved.
  - Returns "No features are gained..." when the two plans are identical or the move is a downgrade.`,
      inputSchema: {
        from_plan: z.string().min(1).describe(`Current plan: ${planIdList}, or a name like "Ent+".`),
        to_plan: z.string().min(1).describe(`Target plan: ${planIdList}, or a name like "Enterprise+".`),
        line_of_business: z
          .string()
          .optional()
          .describe(`Optional line of business for pain-point framing: ${lobIdList}.`),
        from_add_ons: z
          .array(z.string())
          .default([])
          .describe('Legacy add-ons owned on the current plan, e.g. ["slack_ai"].'),
        category: z.string().optional().describe("Optional category filter, e.g. 'Security & Compliance'."),
        include_lost_features: z
          .boolean()
          .default(true)
          .describe("Include features available today but missing on the target plan."),
        response_format: responseFormatSchema,
      },
      annotations: READ_ONLY,
    },
    async ({ from_plan, to_plan, line_of_business, from_add_ons, category, include_lost_features, response_format }) => {
      try {
        const dataset = await getDataset();
        const warnings: string[] = [];

        const from = resolvePlanWithAddOns(dataset, from_plan, from_add_ons);
        warnings.push(...from.warnings);
        const to = requirePlan(to_plan);

        const lob = line_of_business ? requireLob(line_of_business) : undefined;

        let categoryFilter: string | undefined;
        if (category) {
          categoryFilter = resolveCategory(dataset, category);
          if (!categoryFilter) {
            return errorResult(
              `Unknown category "${category}". Valid categories: ${listCategories(dataset).join(", ")}.`,
            );
          }
        }

        let gained = getUpgradeFeatures(dataset, from.plan.id, to.id, from.addOns);
        if (categoryFilter) {
          gained = gained.filter((g) => categoryOf(dataset.categories, g.feature) === categoryFilter);
        }

        const grouped = groupByCategory(
          dataset,
          gained.map((g) => g.feature),
        );
        const byFeature = new Map(gained.map((g) => [g.feature, g]));

        const gainedByCategory: Record<
          string,
          Array<{ feature: string; description?: string; from: Availability; to: Availability; pain_point?: string }>
        > = {};

        for (const [cat, features] of Object.entries(grouped)) {
          gainedByCategory[cat] = features.map((feature) => {
            const entry = byFeature.get(feature)!;
            const description = dataset.featureData.featureDescriptions[feature];
            const painPoint = lob ? getPainPoint(dataset, feature, lob.id) : undefined;
            return {
              feature,
              ...(description ? { description } : {}),
              from: entry.from,
              to: entry.to,
              ...(painPoint ? { pain_point: painPoint } : {}),
            };
          });
        }

        const lost = include_lost_features
          ? getLostFeatures(dataset, from.plan.id, to.id, from.addOns).filter(
              (l) => !categoryFilter || categoryOf(dataset.categories, l.feature) === categoryFilter,
            )
          : [];

        const link = appLink({
          tab: "feature-list",
          from: from.plan.id,
          to: to.id,
          ...(lob ? { lob: lob.id } : {}),
        });

        const structured = {
          from: { plan: from.plan.id, label: from.label, add_ons: from.addOns },
          to: { plan: to.id, label: to.label },
          line_of_business: lob?.id ?? null,
          category_filter: categoryFilter ?? null,
          gained_count: gained.length,
          gained_by_category: gainedByCategory,
          lost_features: lost.map((l) => ({ feature: l.feature, from: l.from })),
          app_url: link,
          warnings: [...warnings, ...dataset.warnings],
        };

        // Markdown brief
        const lines: string[] = [`# ${from.label} → ${to.label}`, ""];
        if (lob) lines.push(`**Line of business:** ${lob.label}`, "");
        if (categoryFilter) lines.push(`**Category filter:** ${categoryFilter}`, "");
        if (warnings.length) lines.push(...warnings.map((w) => `> ⚠️ ${w}`), "");

        if (gained.length === 0) {
          lines.push(
            categoryFilter
              ? `No features are gained in **${categoryFilter}** moving from ${from.label} to ${to.label}.`
              : `No features are gained moving from ${from.label} to ${to.label}. ` +
                  (to.rank <= from.plan.rank
                    ? "That is a lateral move or a downgrade — check the plan order."
                    : "Check whether the current plan already includes everything tracked here."),
          );
        } else {
          lines.push(`**${gained.length} features gained** across ${Object.keys(gainedByCategory).length} categories.`, "");

          for (const [cat, features] of Object.entries(gainedByCategory)) {
            lines.push(`## ${cat} (${features.length})`, "");
            for (const f of features) {
              const qualifier =
                f.to === true ? "" : ` _(${formatAvailability(f.to)})_`;
              const before = f.from === false ? "" : ` — currently: ${formatAvailability(f.from)}`;
              lines.push(`### ${f.feature}${qualifier}`);
              if (f.description) lines.push(f.description);
              if (before) lines.push(`_Today on ${from.label}${before}_`);
              if (f.pain_point) lines.push("", `**Pain point (${lob!.label}):** ${f.pain_point}`);
              lines.push("");
            }
          }
        }

        if (lost.length) {
          lines.push(
            `## ⚠️ Available today, not on ${to.label} (${lost.length})`,
            "",
            ...lost.map((l) => `- **${l.feature}** — currently ${formatAvailability(l.from)}`),
            "",
          );
        }

        lines.push(`[Open in the Plan Comparison Tool](${link})`, "", sourceFooter(dataset));

        return toolResult(lines.join("\n"), structured, response_format);
      } catch (error) {
        return errorResult(describeToolError(error));
      }
    },
  );

  // ---------------------------------------------------------------------
  // 3. Side-by-side matrix
  // ---------------------------------------------------------------------
  server.registerTool(
    "slackplan_comparison_matrix",
    {
      title: "Side-by-side Slack plan comparison table",
      description: `Build a feature-availability table across two or more Slack plans, like the "Plan Comparison Table" tab of the web app.

Args:
  - plans (string[], required, 2-6 entries): Plans to compare, e.g. ["free", "pro", "plus_v2"]. Accepts keys or names.
  - category (string, optional): Restrict to one category. Strongly recommended - the full table is 130+ rows.
  - features (string[], optional): Restrict to specific features by name (partial names are resolved).
  - only_differences (boolean, optional, default false): Hide rows where every selected plan has identical availability.
  - line_of_business (string, optional): Adds the pain point per feature for that team.
  - add_ons (object, optional): Map of plan key -> add-on keys owned on that plan, e.g. { "grid_v1": ["slack_ai"] }.
  - response_format ('markdown' | 'json'): Output format (default: 'markdown')

Returns JSON shaped as:
  {
    "plans": [{ "plan": string, "label": string, "add_ons": string[] }],
    "row_count": number,
    "rows_by_category": { "<category>": [ { "feature": string, "description": string?, "availability": { "<plan key>": bool|string }, "pain_point": string? } ] },
    "app_url": string
  }

Notes:
  - Availability values are true, false, or a qualifier string like "(Limited)" or "User-created Only".
  - In markdown, true renders as "Yes" and false as an em dash.
  - Use only_differences=true to cut a long table down to what actually separates the plans.

Examples:
  - Use when: "Show me security features across Business+ V2 and Enterprise+" -> plans=["plus_v2","grid_v2"], category="Security & Compliance"
  - Use when: "Compare Free, Pro and Business+ V2 on just the differences" -> plans=["free","pro","plus_v2"], only_differences=true
  - Don't use when: You want a narrative upgrade pitch (use slackplan_compare_upgrade).

Error handling:
  - Returns an error listing valid plan keys if one cannot be resolved.
  - Returns an error if fewer than 2 plans are supplied.`,
      inputSchema: {
        plans: z
          .array(z.string().min(1))
          .min(2, "Provide at least 2 plans to compare")
          .max(6, "At most 6 plans can be compared at once")
          .describe(`Plans to compare: ${planIdList}, or names like "Ent+".`),
        category: z.string().optional().describe("Optional category filter, e.g. 'Slackbot Functionality'."),
        features: z.array(z.string()).optional().describe("Optional explicit feature names to include."),
        only_differences: z.boolean().default(false).describe("Only show rows where the plans differ."),
        line_of_business: z.string().optional().describe(`Optional LOB for pain points: ${lobIdList}.`),
        add_ons: z
          .record(z.array(z.string()))
          .optional()
          .describe('Per-plan legacy add-ons, e.g. { "grid_v1": ["slack_ai"] }.'),
        response_format: responseFormatSchema,
      },
      annotations: READ_ONLY,
    },
    async ({ plans, category, features, only_differences, line_of_business, add_ons, response_format }) => {
      try {
        const dataset = await getDataset();
        const warnings: string[] = [];

        const resolved = plans.map((input) => {
          const plan = requirePlan(input);
          const requestedAddOns = add_ons?.[plan.id] ?? add_ons?.[input] ?? [];
          const { applied, ignored } = resolveAddOns(plan, requestedAddOns, dataset);
          warnings.push(...ignored.map(({ addOn, reason }) => `Ignored add-on "${addOn}" on ${plan.label}: ${reason}.`));
          return { plan, addOns: applied, label: resolvedPlanLabel(plan, applied, dataset) };
        });

        const lob = line_of_business ? requireLob(line_of_business) : undefined;

        let categoryFilter: string | undefined;
        if (category) {
          categoryFilter = resolveCategory(dataset, category);
          if (!categoryFilter) {
            return errorResult(
              `Unknown category "${category}". Valid categories: ${listCategories(dataset).join(", ")}.`,
            );
          }
        }

        let featureNames = Object.keys(dataset.featureData.featureAvailability);

        if (features?.length) {
          const picked: string[] = [];
          for (const name of features) {
            try {
              picked.push(requireFeature(dataset, name));
            } catch (error) {
              warnings.push(describeToolError(error));
            }
          }
          featureNames = picked;
        }

        if (categoryFilter) {
          featureNames = featureNames.filter((f) => categoryOf(dataset.categories, f) === categoryFilter);
        }

        const rows = featureNames
          .map((feature) => {
            const availability: Record<string, Availability> = {};
            for (const r of resolved) {
              availability[r.plan.id] = getFeatureAccess(dataset, feature, r.plan.id, r.addOns);
            }
            const description = dataset.featureData.featureDescriptions[feature];
            const painPoint = lob ? getPainPoint(dataset, feature, lob.id) : undefined;
            return {
              feature,
              category: categoryOf(dataset.categories, feature),
              ...(description ? { description } : {}),
              availability,
              ...(painPoint ? { pain_point: painPoint } : {}),
            };
          })
          .filter((row) => {
            if (!only_differences) return true;
            const values = resolved.map((r) => JSON.stringify(row.availability[r.plan.id]));
            return new Set(values).size > 1;
          });

        const grouped = groupByCategory(
          dataset,
          rows.map((r) => r.feature),
        );
        const rowByFeature = new Map(rows.map((r) => [r.feature, r]));

        const rowsByCategory: Record<string, typeof rows> = {};
        for (const [cat, featureList] of Object.entries(grouped)) {
          rowsByCategory[cat] = featureList.map((f) => rowByFeature.get(f)!);
        }

        const link = appLink({
          tab: "comparison-table",
          plans: resolved.map((r) => r.plan.id),
          ...(lob ? { lob: lob.id } : {}),
        });

        const structured = {
          plans: resolved.map((r) => ({ plan: r.plan.id, label: r.label, add_ons: r.addOns })),
          category_filter: categoryFilter ?? null,
          line_of_business: lob?.id ?? null,
          only_differences,
          row_count: rows.length,
          rows_by_category: rowsByCategory,
          app_url: link,
          warnings: [...warnings, ...dataset.warnings],
        };

        const headers = ["Feature", ...resolved.map((r) => r.label)];
        const lines: string[] = [`# Plan comparison: ${resolved.map((r) => r.label).join(" vs ")}`, ""];
        if (categoryFilter) lines.push(`**Category:** ${categoryFilter}`, "");
        if (only_differences) lines.push("_Showing only rows where the plans differ._", "");
        if (warnings.length) lines.push(...warnings.map((w) => `> ⚠️ ${w}`), "");

        if (rows.length === 0) {
          lines.push(
            only_differences
              ? "These plans have identical availability for every feature in scope."
              : "No features matched the filters supplied.",
          );
        } else {
          lines.push(`**${rows.length} features.**`, "");
          for (const [cat, catRows] of Object.entries(rowsByCategory)) {
            lines.push(`## ${cat}`, "");
            lines.push(
              markdownTable(
                headers,
                catRows.map((row) => [
                  row.feature,
                  ...resolved.map((r) => availabilityCell(row.availability[r.plan.id] ?? false)),
                ]),
              ),
              "",
            );
            if (lob) {
              const withPain = catRows.filter((r) => r.pain_point);
              if (withPain.length) {
                lines.push(`**${lob.label} pain points**`, "");
                lines.push(...withPain.map((r) => `- **${r.feature}** — ${r.pain_point}`), "");
              }
            }
          }
        }

        lines.push(`[Open in the Plan Comparison Tool](${link})`, "", sourceFooter(dataset));

        return toolResult(lines.join("\n"), structured, response_format);
      } catch (error) {
        return errorResult(describeToolError(error));
      }
    },
  );

  // ---------------------------------------------------------------------
  // 4. Single feature deep-dive
  // ---------------------------------------------------------------------
  server.registerTool(
    "slackplan_get_feature",
    {
      title: "Look up one feature across every Slack plan",
      description: `Get everything known about a single feature: its description, availability on every plan (including legacy add-on variants), and the pain points it solves per line of business.

Use this to answer "is X available on Y?" and "what's the lowest plan that has X?".

Args:
  - feature (string, required): Feature name. Partial and near matches are resolved, e.g. "enterprise search", "DLP", "canvas templates".
  - line_of_business (string, optional): Return only this team's pain point instead of all of them.
  - response_format ('markdown' | 'json'): Output format (default: 'markdown')

Returns JSON shaped as:
  {
    "feature": string,
    "category": string,
    "description": string | null,
    "availability": { "<plan key>": bool|string },
    "available_on": string[],        // plan keys where it is usable
    "lowest_plan": { "plan": string, "label": string, "availability": bool|string } | null,
    "add_on_variants": { "<plan key with add-on>": bool|string },
    "pain_points": { "<lob>": string },
    "app_url": string
  }

Notes:
  - "lowest_plan" is the cheapest plan in the standard hierarchy where the feature is usable, ignoring legacy add-on variants.
  - "add_on_variants" surfaces keys like "plus_v1_ai" or "grid_v1_ai", which is how a legacy customer with the Slack AI Add-on gets a feature their base plan lacks.

Examples:
  - Use when: "Does Business+ V2 have Enterprise Search?" -> feature="Enterprise Search"
  - Use when: "What's the cheapest plan with DLP?" -> feature="DLP"
  - Don't use when: You want many features at once (use slackplan_comparison_matrix).

Error handling:
  - If the name does not match, returns an error listing the closest feature names.`,
      inputSchema: {
        feature: z.string().min(2).describe("Feature name or a distinctive fragment of it."),
        line_of_business: z.string().optional().describe(`Optional LOB filter: ${lobIdList}.`),
        response_format: responseFormatSchema,
      },
      annotations: READ_ONLY,
    },
    async ({ feature, line_of_business, response_format }) => {
      try {
        const dataset = await getDataset();
        const name = requireFeature(dataset, feature);
        const lob = line_of_business ? requireLob(line_of_business) : undefined;

        const row = dataset.featureData.featureAvailability[name]!;
        const description = dataset.featureData.featureDescriptions[name];
        const category = categoryOf(dataset.categories, name);

        const baseAvailability: Record<string, Availability> = {};
        for (const plan of PLAN_DEFINITIONS) {
          baseAvailability[plan.id] = getFeatureAccess(dataset, name, plan.id, []);
        }

        const addOnVariants: Record<string, Availability> = {};
        for (const [key, value] of Object.entries(row)) {
          if (!PLAN_DEFINITIONS.some((p) => p.id === key)) addOnVariants[key] = value;
        }

        const availableOn = PLAN_DEFINITIONS.filter((p) => isAvailable(baseAvailability[p.id]!)).map((p) => p.id);
        const lowest = PLAN_DEFINITIONS.find((p) => isAvailable(baseAvailability[p.id]!));

        const allPainPoints = dataset.featureData.featurePainPoints[name] ?? {};
        const painPoints = lob
          ? allPainPoints[lob.id]
            ? { [lob.id]: allPainPoints[lob.id]! }
            : {}
          : allPainPoints;

        const link = appLink({ tab: "comparison-table", plans: PLAN_DEFINITIONS.map((p) => p.id) });

        const structured = {
          feature: name,
          category,
          description: description ?? null,
          availability: baseAvailability,
          available_on: availableOn,
          lowest_plan: lowest
            ? { plan: lowest.id, label: lowest.label, availability: baseAvailability[lowest.id]! }
            : null,
          add_on_variants: addOnVariants,
          pain_points: painPoints,
          app_url: link,
          warnings: dataset.warnings,
        };

        const lines: string[] = [`# ${name}`, "", `**Category:** ${category}`, ""];
        if (description) lines.push(description, "");

        lines.push(
          "## Availability",
          "",
          markdownTable(
            ["Plan", "Available"],
            PLAN_DEFINITIONS.map((p) => [p.label, availabilityCell(baseAvailability[p.id]!)]),
          ),
          "",
        );

        if (Object.keys(addOnVariants).length) {
          lines.push(
            "## With legacy add-ons",
            "",
            markdownTable(
              ["Plan key", "Available"],
              Object.entries(addOnVariants).map(([key, value]) => [`\`${key}\``, availabilityCell(value)]),
            ),
            "",
          );
        }

        lines.push(
          lowest
            ? `**Lowest plan with this feature:** ${lowest.label}${
                baseAvailability[lowest.id] === true ? "" : ` (${formatAvailability(baseAvailability[lowest.id]!)})`
              }`
            : "**Not available on any standard plan** — check the add-on variants above.",
          "",
        );

        if (Object.keys(painPoints).length) {
          lines.push("## Pain points solved", "");
          for (const [lobId, text] of Object.entries(painPoints)) {
            lines.push(`**${lobLabel(lobId)}** — ${text}`, "");
          }
        } else if (lob) {
          lines.push(`_No ${lob.label} pain point is recorded for this feature._`, "");
        }

        lines.push(sourceFooter(dataset));

        return toolResult(lines.join("\n"), structured, response_format);
      } catch (error) {
        return errorResult(describeToolError(error));
      }
    },
  );

  // ---------------------------------------------------------------------
  // 5. Feature search
  // ---------------------------------------------------------------------
  server.registerTool(
    "slackplan_search_features",
    {
      title: "Search Slack features by name or description",
      description: `Find tracked features by keyword, searching feature names and descriptions. Use this to discover exact feature names before calling the other tools, or to answer "what do we have around X?".

Args:
  - query (string, required, 2-200 chars): Keyword or phrase, e.g. "export", "audit", "salesforce", "AI summaries".
  - category (string, optional): Restrict results to one category.
  - available_on (string, optional): Only return features usable on this plan.
  - limit (number, optional, 1-100, default 20): Maximum results.
  - offset (number, optional, default 0): Results to skip, for paging.
  - response_format ('markdown' | 'json'): Output format (default: 'markdown')

Returns JSON shaped as:
  {
    "query": string,
    "total": number,
    "count": number,
    "offset": number,
    "has_more": boolean,
    "next_offset": number?,
    "results": [ { "feature": string, "category": string, "description": string?, "availability": { "<plan key>": bool|string } } ]
  }

Examples:
  - Use when: "What export-related features are there?" -> query="export"
  - Use when: "Which Slackbot features does Enterprise+ have?" -> query="slackbot", available_on="grid_v2"
  - Don't use when: You already know the exact feature name (use slackplan_get_feature).

Error handling:
  - Returns "No features match ..." with suggestions to broaden the query when nothing is found.`,
      inputSchema: {
        query: z.string().min(2).max(200).describe("Keyword or phrase to search for."),
        category: z.string().optional().describe("Optional category filter."),
        available_on: z.string().optional().describe(`Only features usable on this plan: ${planIdList}.`),
        limit: z.number().int().min(1).max(100).default(20).describe("Maximum results to return."),
        offset: z.number().int().min(0).default(0).describe("Results to skip, for paging."),
        response_format: responseFormatSchema,
      },
      annotations: READ_ONLY,
    },
    async ({ query, category, available_on, limit, offset, response_format }) => {
      try {
        const dataset = await getDataset();

        let categoryFilter: string | undefined;
        if (category) {
          categoryFilter = resolveCategory(dataset, category);
          if (!categoryFilter) {
            return errorResult(
              `Unknown category "${category}". Valid categories: ${listCategories(dataset).join(", ")}.`,
            );
          }
        }

        const planFilter = available_on ? requirePlan(available_on) : undefined;

        let matches = searchFeatures(dataset, query, 500);
        if (categoryFilter) matches = matches.filter((m) => m.category === categoryFilter);
        if (planFilter) {
          matches = matches.filter((m) => isAvailable(getFeatureAccess(dataset, m.feature, planFilter.id, [])));
        }

        const total = matches.length;
        const page = matches.slice(offset, offset + limit);
        const hasMore = total > offset + page.length;

        const results = page.map((m) => {
          const availability: Record<string, Availability> = {};
          for (const plan of PLAN_DEFINITIONS) {
            availability[plan.id] = getFeatureAccess(dataset, m.feature, plan.id, []);
          }
          return {
            feature: m.feature,
            category: m.category,
            ...(m.description ? { description: m.description } : {}),
            availability,
          };
        });

        const structured = {
          query,
          category_filter: categoryFilter ?? null,
          available_on: planFilter?.id ?? null,
          total,
          count: results.length,
          offset,
          has_more: hasMore,
          ...(hasMore ? { next_offset: offset + results.length } : {}),
          results,
          warnings: dataset.warnings,
        };

        const lines: string[] = [`# Feature search: "${query}"`, ""];

        if (total === 0) {
          lines.push(
            `No features match "${query}"` +
              (categoryFilter ? ` in ${categoryFilter}` : "") +
              (planFilter ? ` available on ${planFilter.label}` : "") +
              ".",
            "",
            "Try a broader keyword, or call `slackplan_list_plans` to see the category list.",
          );
        } else {
          lines.push(`Found ${total} matching features (showing ${results.length} from offset ${offset}).`, "");
          lines.push(
            markdownTable(
              ["Feature", "Category", ...PLAN_DEFINITIONS.map((p) => p.label)],
              results.map((r) => [
                r.feature,
                r.category,
                ...PLAN_DEFINITIONS.map((p) => availabilityCell(r.availability[p.id] ?? false)),
              ]),
            ),
            "",
          );
          if (hasMore) lines.push(`_More results available — call again with offset=${offset + results.length}._`, "");
        }

        lines.push(sourceFooter(dataset));

        return toolResult(lines.join("\n"), structured, response_format);
      } catch (error) {
        return errorResult(describeToolError(error));
      }
    },
  );

  // ---------------------------------------------------------------------
  // 6. LOB pain points
  // ---------------------------------------------------------------------
  server.registerTool(
    "slackplan_get_pain_points",
    {
      title: "Get line-of-business pain points for features",
      description: `Return the customer pain points that features solve for a specific line of business. This is the "why should this team care" language used on calls.

Scope it in one of three ways: by explicit feature list, by category, or by an upgrade path (features gained moving between two plans).

Args:
  - line_of_business (string, required): One of ${lobIdList}.
  - features (string[], optional): Specific features to explain.
  - category (string, optional): All features in a category.
  - from_plan (string, optional): With to_plan, scope to features gained in that upgrade.
  - to_plan (string, optional): With from_plan, scope to features gained in that upgrade.
  - from_add_ons (string[], optional): Legacy add-ons on the current plan, e.g. ["slack_ai"].
  - limit (number, optional, 1-100, default 30): Maximum features to return.
  - response_format ('markdown' | 'json'): Output format (default: 'markdown')

Returns JSON shaped as:
  {
    "line_of_business": string,
    "scope": string,
    "count": number,
    "pain_points": [ { "feature": string, "category": string, "pain_point": string, "description": string? } ],
    "features_without_pain_points": string[]
  }

Notes:
  - Not every feature has a pain point recorded for every LOB. Features with nothing recorded are listed separately rather than silently dropped, so gaps in the data are visible.
  - If no scope is given, returns every feature that has a pain point for this LOB, up to the limit.

Examples:
  - Use when: "Why would a Legal team care about moving to Enterprise+?" -> line_of_business="legal", from_plan="plus_v2", to_plan="grid_v2"
  - Use when: "Give me the IT pain points for security features" -> line_of_business="it", category="Security & Compliance"

Error handling:
  - Returns an error naming valid LOB values when the line of business cannot be resolved.`,
      inputSchema: {
        line_of_business: z.string().min(1).describe(`Line of business: ${lobIdList}.`),
        features: z.array(z.string()).optional().describe("Optional explicit feature names."),
        category: z.string().optional().describe("Optional category to scope to."),
        from_plan: z.string().optional().describe("With to_plan, scope to an upgrade path."),
        to_plan: z.string().optional().describe("With from_plan, scope to an upgrade path."),
        from_add_ons: z.array(z.string()).default([]).describe("Legacy add-ons on the current plan."),
        limit: z.number().int().min(1).max(100).default(30).describe("Maximum features to return."),
        response_format: responseFormatSchema,
      },
      annotations: READ_ONLY,
    },
    async ({ line_of_business, features, category, from_plan, to_plan, from_add_ons, limit, response_format }) => {
      try {
        const dataset = await getDataset();
        const lob = requireLob(line_of_business);
        const warnings: string[] = [];

        let scope = "all features with recorded pain points";
        let candidates: string[];

        if (from_plan && to_plan) {
          const from = resolvePlanWithAddOns(dataset, from_plan, from_add_ons);
          warnings.push(...from.warnings);
          const to = requirePlan(to_plan);
          candidates = getUpgradeFeatures(dataset, from.plan.id, to.id, from.addOns).map((g) => g.feature);
          scope = `features gained moving ${from.label} → ${to.label}`;
        } else if (features?.length) {
          candidates = [];
          for (const name of features) {
            try {
              candidates.push(requireFeature(dataset, name));
            } catch (error) {
              warnings.push(describeToolError(error));
            }
          }
          scope = `${candidates.length} specified features`;
        } else if (category) {
          const resolvedCategory = resolveCategory(dataset, category);
          if (!resolvedCategory) {
            return errorResult(
              `Unknown category "${category}". Valid categories: ${listCategories(dataset).join(", ")}.`,
            );
          }
          candidates = Object.keys(dataset.featureData.featureAvailability).filter(
            (f) => categoryOf(dataset.categories, f) === resolvedCategory,
          );
          scope = `category "${resolvedCategory}"`;
        } else {
          candidates = Object.keys(dataset.featureData.featurePainPoints);
        }

        const withPain: Array<{ feature: string; category: string; pain_point: string; description?: string }> = [];
        const without: string[] = [];

        for (const feature of candidates) {
          const painPoint = getPainPoint(dataset, feature, lob.id);
          if (painPoint) {
            const description = dataset.featureData.featureDescriptions[feature];
            withPain.push({
              feature,
              category: categoryOf(dataset.categories, feature),
              pain_point: painPoint,
              ...(description ? { description } : {}),
            });
          } else {
            without.push(feature);
          }
        }

        const page = withPain.slice(0, limit);

        const structured = {
          line_of_business: lob.id,
          line_of_business_label: lob.label,
          scope,
          total: withPain.length,
          count: page.length,
          pain_points: page,
          features_without_pain_points: without,
          warnings: [...warnings, ...dataset.warnings],
        };

        const lines: string[] = [`# ${lob.label} pain points`, "", `**Scope:** ${scope}`, ""];
        if (warnings.length) lines.push(...warnings.map((w) => `> ⚠️ ${w}`), "");

        if (page.length === 0) {
          lines.push(`No ${lob.label} pain points are recorded for the features in scope.`);
          if (without.length) {
            lines.push(
              "",
              `Features checked without a recorded ${lob.label} pain point: ${without.slice(0, 20).join(", ")}${
                without.length > 20 ? `, and ${without.length - 20} more` : ""
              }.`,
            );
          }
        } else {
          lines.push(`**${withPain.length} features** have a ${lob.label} pain point recorded (showing ${page.length}).`, "");
          const grouped = groupByCategory(
            dataset,
            page.map((p) => p.feature),
          );
          const byFeature = new Map(page.map((p) => [p.feature, p]));
          for (const [cat, featureList] of Object.entries(grouped)) {
            lines.push(`## ${cat}`, "");
            for (const f of featureList) {
              lines.push(`### ${f}`, byFeature.get(f)!.pain_point, "");
            }
          }
          if (without.length) {
            lines.push(
              `_${without.length} features in scope have no ${lob.label} pain point recorded._`,
              "",
            );
          }
        }

        lines.push(sourceFooter(dataset));

        return toolResult(lines.join("\n"), structured, response_format);
      } catch (error) {
        return errorResult(describeToolError(error));
      }
    },
  );

  // ---------------------------------------------------------------------
  // 7. Freshness
  // ---------------------------------------------------------------------
  server.registerTool(
    "slackplan_data_freshness",
    {
      title: "When was the plan comparison data last updated?",
      description: `Report when the Slack plan feature data was last changed, where this server read it from, and how much data it covers.

Answers the question people repeatedly ask about the tool: "how current is this, and can I trust it in front of a customer?"

Args:
  - force_refresh (boolean, optional, default false): Bypass the cache and re-read from GitHub.
  - response_format ('markdown' | 'json'): Output format (default: 'markdown')

Returns JSON shaped as:
  {
    "source": "github-raw" | "site-json" | "bundled-snapshot",
    "fetched_at": string,              // ISO timestamp of this server's read
    "last_commit": { "sha": string, "short_sha": string, "date": string, "message": string, "author": string, "url": string } | null,
    "days_since_update": number | null,
    "counts": { "features": number, "descriptions": number, "pain_points": number, "categories": number },
    "warnings": string[],
    "app_url": string
  }

Notes:
  - "last_commit" is the most recent commit touching src/data/features.ts on the tracked branch, via the GitHub API. It is null if the API is unreachable or rate-limited (60 requests/hour unauthenticated; set GITHUB_TOKEN to raise it).
  - The tool is maintained by hand and is not an official Slack pricing source. Verify anything customer-facing against the P&P matrix.

Examples:
  - Use when: "How fresh is this plan data?" or "When was this last updated?"
  - Use when: An answer looked wrong and you want to check whether the server is serving a stale fallback.`,
      inputSchema: {
        force_refresh: z.boolean().default(false).describe("Bypass the cache and re-read from GitHub."),
        response_format: responseFormatSchema,
      },
      annotations: { ...READ_ONLY, idempotentHint: false },
    },
    async ({ force_refresh, response_format }) => {
      try {
        const dataset = await getDataset({ forceRefresh: force_refresh });
        const commit = await getLastUpdatedCommit();

        const daysSince = commit?.date
          ? Math.floor((Date.now() - new Date(commit.date).getTime()) / 86_400_000)
          : null;

        const counts = {
          features: Object.keys(dataset.featureData.featureAvailability).length,
          descriptions: Object.keys(dataset.featureData.featureDescriptions).length,
          pain_points: Object.keys(dataset.featureData.featurePainPoints).length,
          categories: Object.keys(dataset.categories).length,
        };

        const structured = {
          source: dataset.source,
          fetched_at: dataset.fetchedAt,
          last_commit: commit
            ? {
                sha: commit.sha,
                short_sha: commit.shortSha,
                date: commit.date,
                message: commit.message,
                author: commit.author,
                url: commit.url,
              }
            : null,
          days_since_update: daysSince,
          counts,
          warnings: dataset.warnings,
          app_url: APP_URL,
        };

        const lines: string[] = [
          "# Plan comparison data freshness",
          "",
          markdownTable(
            ["", ""],
            [
              ["Data source", dataset.source],
              ["Read at", dataset.fetchedAt],
              ["Last data change", commit ? `${commit.date} (${daysSince} days ago)` : "unknown — GitHub API unavailable"],
              ["Last commit", commit ? `\`${commit.shortSha}\` ${commit.message} — ${commit.author}` : "—"],
              ["Features tracked", String(counts.features)],
              ["Descriptions", String(counts.descriptions)],
              ["Features with pain points", String(counts.pain_points)],
              ["Categories", String(counts.categories)],
            ],
          ),
          "",
        ];

        if (commit?.url) lines.push(`[View the commit](${commit.url})`, "");
        if (dataset.warnings.length) lines.push(...dataset.warnings.map((w) => `> ⚠️ ${w}`), "");

        lines.push(
          "> This tool is maintained by hand from the GA changelog, #slack-cs-release-readiness and the P&P matrix.",
          "> It is not an official Slack pricing source — verify customer-facing claims.",
          "",
          `[Open the Plan Comparison Tool](${APP_URL})`,
        );

        return toolResult(lines.join("\n"), structured, response_format);
      } catch (error) {
        return errorResult(describeToolError(error));
      }
    },
  );
}
