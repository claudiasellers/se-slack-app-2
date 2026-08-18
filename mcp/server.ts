// MCP server exposing the Slack plan-comparison data as read-only tools.
//
// All domain logic comes from src/lib/planLogic.ts — the same module the React
// app uses — so the tools can never drift from what the tool shows on screen.
//
// The two headline tools mirror the app's two tabs:
//   get_upgrade_brief  -> Tab 1 "New Feature List" (the upgrade delta)
//   compare_plans      -> Tab 2 "Plan Comparison Table"

import { McpServer } from "@modelcontextprotocol/server"
import * as z from "zod/v4"

import { legacyAddOns } from "../src/data/features"
import { featureCategories, linesOfBusiness, planGroups, planHierarchy, planOptions } from "../src/data/taxonomy"
import {
  allFeatures,
  categorizeFeatures,
  comparePlans,
  formatAvailability,
  getAllPainPoints,
  getDescription,
  getFeatureAccess,
  getLOBPainPoints,
  getPlanFeatures,
  getUpgradeFeatures,
  planLabel,
  resolvePlan,
} from "../src/lib/planLogic"

const PLAN_IDS = [...planHierarchy]
const LOB_IDS = linesOfBusiness.map((l) => l.value)
const ADDON_IDS = Object.keys(legacyAddOns)

const INSTRUCTIONS = `Authoritative data on what each Slack plan includes, which features a customer
gains by upgrading, and the business pain each feature solves per line of business (LOB).

Use get_upgrade_brief whenever you need the value story for a plan upgrade — it returns the
gained features grouped by category with descriptions and LOB-specific pain points in one call,
which is what you want when building a demo, pitch, or business case for an account.

Plan ids: ${PLAN_IDS.join(", ")} (grid_v2 is displayed as "Enterprise+"). Tools accept either the
id or the display label. LOBs: ${LOB_IDS.join(", ")}.

Legacy add-ons (${ADDON_IDS.join(", ")}) describe what a customer ALREADY owns on a legacy plan;
pass them as current_add_ons so the brief doesn't over-claim features they already have.`

// ---------- shared schema fragments ----------

const planInput = z
  .string()
  .describe(`Plan id (${PLAN_IDS.join(" | ")}) or display label, e.g. "grid_v2" or "Enterprise+"`)

const addOnsInput = z
  .array(z.enum(ADDON_IDS as [string, ...string[]]))
  .optional()
  .describe("Legacy add-ons the customer already owns on their CURRENT plan")

const lobInput = z
  .array(z.enum(LOB_IDS as [string, ...string[]]))
  .optional()
  .describe("Lines of business to pull pain points for. Omit for none.")

const planRef = z.object({ id: z.string(), label: z.string() })

/** Throw a readable error the model can act on, rather than silently defaulting. */
function mustResolvePlan(input: string, field: string): string {
  const id = resolvePlan(input)
  if (!id) {
    throw new Error(
      `Unknown plan "${input}" for ${field}. Valid ids: ${PLAN_IDS.join(", ")}. ` +
        `Valid labels: ${planOptions.map((p) => p.label).join(", ")}.`
    )
  }
  return id
}

const ref = (id: string) => ({ id, label: planLabel(id) })

/**
 * A feature may be listed under more than one category ("Atlas" is in both
 * Administration & Analytics and User Management), so the flattened payload can
 * be longer than the distinct feature list. We mirror the app exactly — dropping
 * the second listing would make a category-filtered answer silently incomplete —
 * and instead report BOTH numbers so they can never appear to contradict.
 */
const countEntries = (grouped: Record<string, string[]>): number =>
  Object.values(grouped).reduce((total, names) => total + names.length, 0)

const dupeNote = (distinct: number, entries: number): string =>
  entries > distinct ? " (" + entries + " entries; " + (entries - distinct) + " listed in two categories)" : ""

/**
 * Keep only add-ons that actually apply to the given plan, mirroring the app,
 * which prunes non-applicable add-ons when the plan changes. Reporting an
 * add-on as "applied" when it had no effect misleads the caller.
 */
const applicableAddOns = (addOns: string[], plan: string): string[] =>
  addOns.filter((id) => legacyAddOns[id]?.applicablePlans.includes(plan))

const CATEGORY_NAMES = Object.keys(featureCategories)

export function createServer(): McpServer {
  const server = new McpServer(
    { name: "slack-plans", version: "1.0.0" },
    { instructions: INSTRUCTIONS }
  )

  // ---------- discovery ----------

  server.registerTool(
    "list_plans",
    {
      description:
        "List every Slack plan: id, display label, and tier order (lowest to highest). Also lists the legacy add-ons and which plans they apply to.",
      inputSchema: z.object({}).strict(),
      outputSchema: z.object({
        plans: z.array(z.object({ id: z.string(), label: z.string(), tier: z.number() })),
        groups: z.array(z.object({ label: z.string(), plan_ids: z.array(z.string()) })),
        add_ons: z.array(
          z.object({ id: z.string(), label: z.string(), applicable_plans: z.array(z.string()) })
        ),
      }),
    },
    async () => {
      const out = {
        plans: PLAN_IDS.map((id, i) => ({ id, label: planLabel(id), tier: i })),
        groups: planGroups.map((g) =>
          "options" in g
            ? { label: g.label, plan_ids: g.options.map((o) => o.value) }
            : { label: g.label, plan_ids: [g.value] }
        ),
        add_ons: ADDON_IDS.map((id) => ({
          id,
          label: legacyAddOns[id].label,
          applicable_plans: [...legacyAddOns[id].applicablePlans],
        })),
      }
      const text =
        out.plans.map((p) => `${p.tier}. ${p.label} (${p.id})`).join("\n") +
        "\n\nAdd-ons: " +
        out.add_ons
          .map((a) => `${a.label} (${a.id}) — applies to ${a.applicable_plans.map(planLabel).join(", ")}`)
          .join("; ")
      return { content: [{ type: "text", text }], structuredContent: out }
    }
  )

  server.registerTool(
    "list_lines_of_business",
    {
      description: "List the lines of business that pain points can be requested for.",
      inputSchema: z.object({}).strict(),
      outputSchema: z.object({
        lines_of_business: z.array(z.object({ id: z.string(), label: z.string() })),
      }),
    },
    async () => {
      const out = { lines_of_business: linesOfBusiness.map((l) => ({ id: l.value, label: l.label })) }
      return {
        content: [{ type: "text", text: out.lines_of_business.map((l) => `${l.label} (${l.id})`).join("\n") }],
        structuredContent: out,
      }
    }
  )

  // ---------- TAB 1: the upgrade delta ----------

  server.registerTool(
    "get_upgrade_brief",
    {
      description:
        "THE UPGRADE VALUE STORY. Given a customer's current plan and a target plan, return every feature they gain, grouped by category, with each feature's description and the specific business pain it solves for the requested lines of business. Use this to build a demo, pitch, or business case. Mirrors the app's 'New Feature List' tab.",
      inputSchema: z.object({
        from_plan: planInput.describe("The customer's CURRENT plan"),
        to_plan: planInput.describe("The plan they would upgrade to"),
        current_add_ons: addOnsInput,
        lines_of_business: lobInput,
      }).strict(),
      outputSchema: z.object({
        from: planRef,
        to: planRef,
        add_ons_applied: z.array(z.string()),
        feature_count: z.number().describe("Distinct features gained"),
        entries_emitted: z.number().describe("Rows below; exceeds feature_count when a feature sits in two categories"),
        categories: z.array(
          z.object({
            category: z.string(),
            features: z.array(
              z.object({
                name: z.string(),
                description: z.string(),
                availability_note: z.string().optional(),
                pain_points: z.record(z.string(), z.string()),
              })
            ),
          })
        ),
      }),
    },
    async ({ from_plan, to_plan, current_add_ons, lines_of_business }) => {
      const from = mustResolvePlan(from_plan, "from_plan")
      const to = mustResolvePlan(to_plan, "to_plan")
      const addOns = applicableAddOns(current_add_ons ?? [], from)
      const lobs = lines_of_business ?? []

      const gained = getUpgradeFeatures(from, to, addOns)
      const grouped = categorizeFeatures(gained)

      const painByLob = Object.fromEntries(lobs.map((lob) => [lob, getLOBPainPoints(gained, lob)]))

      const categories = Object.entries(grouped).map(([category, features]) => ({
        category,
        features: features.map((name) => {
          const value = getFeatureAccess(name, to, [])
          const pain_points = Object.fromEntries(
            lobs.map((lob) => [lob, painByLob[lob][name]]).filter(([, v]) => Boolean(v))
          ) as Record<string, string>
          return {
            name,
            description: getDescription(name),
            ...(typeof value === "string" ? { availability_note: value } : {}),
            pain_points,
          }
        }),
      }))

      const out = {
        from: ref(from),
        to: ref(to),
        add_ons_applied: addOns,
        feature_count: gained.length,
        entries_emitted: countEntries(grouped),
        categories,
      }

      const lines: string[] = [
        `# ${out.from.label} -> ${out.to.label}`,
        `${gained.length} features gained${dupeNote(gained.length, out.entries_emitted)}${addOns.length ? ` (current add-ons: ${addOns.join(", ")})` : ""}`,
        "",
      ]
      for (const c of categories) {
        lines.push(`## ${c.category} (${c.features.length})`)
        for (const f of c.features) {
          lines.push(`- **${f.name}**${f.availability_note ? ` — _${f.availability_note}_` : ""}`)
          if (f.description) lines.push(`  ${f.description}`)
          for (const [lob, pain] of Object.entries(f.pain_points)) {
            lines.push(`  - *${lob} pain:* ${pain}`)
          }
        }
        lines.push("")
      }

      const text = gained.length
        ? lines.join("\n")
        : `${out.from.label} -> ${out.to.label}: no features gained.`
      return { content: [{ type: "text", text }], structuredContent: out }
    }
  )

  // ---------- TAB 2: the comparison table ----------

  server.registerTool(
    "compare_plans",
    {
      description:
        "Side-by-side comparison. Returns every feature present in the HIGHEST selected plan, with yes / no / caveat for each plan given. Mirrors the app's 'Plan Comparison Table' tab (add-ons are not applied there).",
      inputSchema: z.object({
        plans: z.array(planInput).min(2).describe("Two or more plans to compare"),
        category: z
          .string()
          .optional()
          .describe("Optional: restrict to one category, e.g. 'Security & Compliance'"),
        lines_of_business: lobInput,
      }).strict(),
      outputSchema: z.object({
        plans: z.array(planRef),
        highest_plan: z.string(),
        row_count: z.number().describe("Rows emitted below"),
        distinct_feature_count: z.number().describe("Distinct features; below row_count when one sits in two categories"),
        categories: z.array(
          z.object({
            category: z.string(),
            rows: z.array(
              z.object({
                feature: z.string(),
                description: z.string(),
                cells: z.record(z.string(), z.string()),
                pain_points: z.record(z.string(), z.string()),
              })
            ),
          })
        ),
      }),
    },
    async ({ plans, category, lines_of_business }) => {
      const lobs = lines_of_business ?? []
      const ids = plans.map((p, i) => mustResolvePlan(p, `plans[${i}]`))
      const ordered = PLAN_IDS.filter((p) => ids.includes(p))
      if (ordered.length < 2) {
        throw new Error(
          `compare_plans needs at least two DISTINCT plans; "${plans.join('", "')}" resolved to ${
            ordered.length ? `only ${planLabel(ordered[0])}` : "none"
          }. Note an id and its display label are the same plan.`
        )
      }
      if (category && !CATEGORY_NAMES.some((c) => c.toLowerCase() === category.toLowerCase())) {
        throw new Error(`Unknown category "${category}". Valid categories: ${CATEGORY_NAMES.join(", ")}.`)
      }
      const rows = comparePlans(ordered)
      const grouped = categorizeFeatures(rows.map((r) => r.feature))
      const byFeature = new Map(rows.map((r) => [r.feature, r]))
      const painByLob = Object.fromEntries(
        lobs.map((lob) => [lob, getLOBPainPoints(rows.map((r) => r.feature), lob)])
      )

      const categories = Object.entries(grouped)
        .filter(([c]) => !category || c.toLowerCase() === category.toLowerCase())
        .map(([c, features]) => ({
          category: c,
          rows: features.map((name) => {
            const row = byFeature.get(name)!
            return {
              feature: name,
              description: row.description,
              cells: Object.fromEntries(
                ordered.map((p) => [p, formatAvailability(row.cells[p])])
              ) as Record<string, string>,
              pain_points: Object.fromEntries(
                lobs.map((lob) => [lob, painByLob[lob][name]]).filter(([, v]) => Boolean(v))
              ) as Record<string, string>,
            }
          }),
        }))

      const out = {
        plans: ordered.map(ref),
        highest_plan: ordered[ordered.length - 1],
        row_count: categories.reduce((n, c) => n + c.rows.length, 0),
        distinct_feature_count: new Set(categories.flatMap((c) => c.rows.map((r) => r.feature))).size,
        categories,
      }

      const header = `| Feature | ${ordered.map(planLabel).join(" | ")} |`
      const sep = `| --- | ${ordered.map(() => "---").join(" | ")} |`
      const body = categories.flatMap((c) => [
        `| **${c.category}** | ${ordered.map(() => "").join(" | ")} |`,
        ...c.rows.map((r) => `| ${r.feature} | ${ordered.map((p) => r.cells[p]).join(" | ")} |`),
      ])

      const caption =
        `${out.distinct_feature_count} features across ${ordered.map(planLabel).join(", ")}` +
        dupeNote(out.distinct_feature_count, out.row_count)
      const painSection = lobs.length
        ? categories
            .flatMap((c) => c.rows)
            .filter((r) => Object.keys(r.pain_points).length)
            .flatMap((r) => [
              `**${r.feature}**`,
              ...Object.entries(r.pain_points).map(([lob, pain]) => `  - *${lob} pain:* ${pain}`),
            ])
        : []
      const text = out.row_count
        ? [caption, "", header, sep, ...body, ...(painSection.length ? ["", "### Pain points", ...painSection] : [])].join(
            "\n"
          )
        : `No ${category ?? ""} features found for ${ordered.map(planLabel).join(", ")}.`.replace("  ", " ")
      return { content: [{ type: "text", text }], structuredContent: out }
    }
  )

  // ---------- lookups ----------

  server.registerTool(
    "get_plan_features",
    {
      description:
        "Everything a single plan includes, grouped by category. Use when asked what a plan gives a customer outright, rather than what changes on upgrade.",
      inputSchema: z.object({
        plan: planInput,
        current_add_ons: addOnsInput,
        lines_of_business: lobInput,
      }).strict(),
      outputSchema: z.object({
        plan: planRef,
        feature_count: z.number().describe("Distinct features included"),
        entries_emitted: z.number().describe("Rows below; exceeds feature_count when a feature sits in two categories"),
        categories: z.array(
          z.object({
            category: z.string(),
            features: z.array(
              z.object({
                name: z.string(),
                description: z.string(),
                availability_note: z.string().optional(),
                pain_points: z.record(z.string(), z.string()),
              })
            ),
          })
        ),
      }),
    },
    async ({ plan, current_add_ons, lines_of_business }) => {
      const id = mustResolvePlan(plan, "plan")
      const addOns = applicableAddOns(current_add_ons ?? [], id)
      const lobs = lines_of_business ?? []
      const features = getPlanFeatures(id, addOns)
      const grouped = categorizeFeatures(features)
      const painByLob = Object.fromEntries(lobs.map((lob) => [lob, getLOBPainPoints(features, lob)]))

      const out = {
        plan: ref(id),
        feature_count: features.length,
        entries_emitted: countEntries(grouped),
        categories: Object.entries(grouped).map(([category, names]) => ({
          category,
          features: names.map((name) => {
            const value = getFeatureAccess(name, id, addOns)
            return {
              name,
              description: getDescription(name),
              ...(typeof value === "string" ? { availability_note: value } : {}),
              pain_points: Object.fromEntries(
                lobs.map((lob) => [lob, painByLob[lob][name]]).filter(([, v]) => Boolean(v))
              ) as Record<string, string>,
            }
          }),
        })),
      }

      const text = out.categories
        .map(
          (c) =>
            `## ${c.category} (${c.features.length})\n` +
            c.features
              .map((f) =>
                [
                  `- **${f.name}**${f.availability_note ? ` — _${f.availability_note}_` : ""}`,
                  ...(f.description ? [`  ${f.description}`] : []),
                  ...Object.entries(f.pain_points).map(([lob, pain]) => `  - *${lob} pain:* ${pain}`),
                ].join("\n")
              )
              .join("\n")
        )
        .join("\n\n")

      return {
        content: [
          {
            type: "text",
            text: `${out.plan.label}: ${features.length} features${dupeNote(features.length, out.entries_emitted)}\n\n${text}`,
          },
        ],
        structuredContent: out,
      }
    }
  )

  server.registerTool(
    "lookup_feature",
    {
      description:
        "Find features by name or description and show availability across every plan, plus all pain points. Use to answer 'does <plan> have <feature>?'",
      inputSchema: z.object({
        query: z
          .string()
          .refine((q) => q.trim().length > 0, "query must contain at least one non-whitespace character")
          .describe("Feature name or keyword, matched case-insensitively"),
        limit: z.number().int().min(1).max(25).optional().describe("Max matches (default 5)"),
      }).strict(),
      outputSchema: z.object({
        match_count: z.number().describe("Total features matching the query, before any limit"),
        returned: z.number().describe("How many are included below"),
        truncated: z.boolean().describe("True when match_count > returned"),
        matches: z.array(
          z.object({
            feature: z.string(),
            description: z.string(),
            availability: z.record(z.string(), z.string()),
            pain_points: z.record(z.string(), z.string()),
          })
        ),
      }),
    },
    async ({ query, limit }) => {
      const needle = query.trim().toLowerCase()
      const allMatches = allFeatures()
        .map((name) => {
          const inName = name.toLowerCase().includes(needle)
          const inDesc = getDescription(name).toLowerCase().includes(needle)
          const exact = name.toLowerCase() === needle
          return { name, score: exact ? 3 : inName ? 2 : inDesc ? 1 : 0 }
        })
        .filter((m) => m.score > 0)
        .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
      const scored = allMatches.slice(0, limit ?? 5)

      const out = {
        match_count: allMatches.length,
        returned: scored.length,
        truncated: allMatches.length > scored.length,
        matches: scored.map(({ name }) => ({
          feature: name,
          description: getDescription(name),
          availability: Object.fromEntries(
            PLAN_IDS.map((p) => [p, formatAvailability(getFeatureAccess(name, p))])
          ) as Record<string, string>,
          pain_points: getAllPainPoints(name),
        })),
      }

      const text = out.matches.length
        ? out.matches
            .map(
              (m) =>
                `**${m.feature}** — ${m.description}\n` +
                PLAN_IDS.map((p) => `  ${planLabel(p)}: ${m.availability[p]}`).join("\n") +
                (Object.keys(m.pain_points).length
                  ? "\n" +
                    Object.entries(m.pain_points)
                      .map(([lob, pain]) => `  - *${lob} pain:* ${pain}`)
                      .join("\n")
                  : "")
            )
            .join("\n\n") +
          (out.truncated ? `\n\n(showing ${out.returned} of ${out.match_count} matches; raise \`limit\` for more)` : "")
        : `No feature matched "${query}".`

      return { content: [{ type: "text", text }], structuredContent: out }
    }
  )

  server.registerTool(
    "get_pain_points",
    {
      description:
        "Pain points for one line of business, optionally scoped to the features gained in a specific upgrade. Use for narrative and discovery-question material.",
      inputSchema: z.object({
        line_of_business: z.enum(LOB_IDS as [string, ...string[]]),
        from_plan: planInput.min(1).optional().describe("Scope to an upgrade delta: current plan (requires to_plan)"),
        to_plan: planInput.min(1).optional().describe("Scope to an upgrade delta: target plan (requires from_plan)"),
        current_add_ons: addOnsInput,
      }).strict(),
      outputSchema: z.object({
        line_of_business: z.string(),
        scope: z.string(),
        add_ons_applied: z.array(z.string()),
        count: z.number(),
        pain_points: z.array(z.object({ feature: z.string(), pain: z.string() })),
      }),
    },
    async ({ line_of_business, from_plan, to_plan, current_add_ons }) => {
      if (Boolean(from_plan) !== Boolean(to_plan)) {
        throw new Error(
          "from_plan and to_plan must be supplied together to scope pain points to an upgrade; " +
            `got ${from_plan ? "only from_plan" : "only to_plan"}. Omit both for all features.`
        )
      }
      let addOns = current_add_ons ?? []
      let features = allFeatures()
      let scope = "all features"
      if (from_plan && to_plan) {
        const from = mustResolvePlan(from_plan, "from_plan")
        const to = mustResolvePlan(to_plan, "to_plan")
        addOns = applicableAddOns(addOns, from)
        features = getUpgradeFeatures(from, to, addOns)
        scope = `${planLabel(from)} -> ${planLabel(to)}`
      } else {
        addOns = []
      }
      const found = getLOBPainPoints(features, line_of_business)
      const out = {
        line_of_business,
        scope,
        add_ons_applied: addOns,
        count: Object.keys(found).length,
        pain_points: Object.entries(found).map(([feature, pain]) => ({ feature, pain })),
      }
      return {
        content: [
          {
            type: "text",
            text: out.pain_points.length
              ? `${out.count} ${line_of_business} pain points — ${scope}${
                  addOns.length ? ` (current add-ons: ${addOns.join(", ")})` : ""
                }\n\n` + out.pain_points.map((p) => `- **${p.feature}**: ${p.pain}`).join("\n")
              : `No ${line_of_business} pain points for ${scope}.`,
          },
        ],
        structuredContent: out,
      }
    }
  )

  return server
}
