# Slack Plan Comparison MCP Server

An MCP server for the [Slack Plan Comparison Tool](https://claudiasellers.github.io/se-slack-app-2/). It gives Claude (and any other MCP client) the same plan and feature data the web app uses, so you can ask questions in conversation instead of clicking through the UI:

> "What does a Business+ V2 customer gain moving to Enterprise+, and why would their IT team care?"

> "They're on Grid V1 with the Slack AI add-on — what's actually new in Enterprise+ for them?"

> "Cheapest plan with DLP?"

It reads its data **live from GitHub**, so anything you change in `src/data/features.ts` is reflected without redeploying the server.

---

## Tools

| Tool | What it answers |
|---|---|
| `slackplan_compare_upgrade` | What a customer gains moving from plan X to plan Y, grouped by category, optionally framed as LOB pain points. The main one. |
| `slackplan_comparison_matrix` | Side-by-side availability across 2–6 plans, with an `only_differences` mode. |
| `slackplan_get_feature` | Everything about one feature: availability on every plan, lowest plan that has it, add-on variants, pain points. |
| `slackplan_search_features` | Keyword search over feature names and descriptions. |
| `slackplan_get_pain_points` | LOB pain points, scoped by feature list, category, or upgrade path. |
| `slackplan_list_plans` | The vocabulary: plan keys, add-ons, LOBs, categories. |
| `slackplan_data_freshness` | When the data last changed, and which source this server is serving. |

All tools are read-only and support `response_format: "markdown"` (default) or `"json"`.

### Things it handles that are easy to get wrong

- **Legacy add-ons.** A Grid V1 customer who already bought the Slack AI Add-on gains **10** features moving to Enterprise+, not 51. Pass `from_add_ons: ["slack_ai"]` and the comparison stops overselling AI features they already have.
- **Qualified availability.** Availability isn't only yes/no — `"(Limited)"`, `"User-created Only"`, `"(Add-on)"`, `"Only 10"` are all real values and are preserved rather than flattened to a boolean.
- **Downgrades and quirks.** Google OAuth 2.0 exists on Pro/Business+ but not on Grid, so it shows up under "available today, not on the target plan."
- **`legal` as a line of business.** It has pain points in the data but isn't in the web app's dropdown, so the server can answer questions the site can't.

### Parity with the web app

The comparison logic is a direct port of `getFeatureAccess` / `getUpgradeFeatures` / `categorizeFeatures` from `PlanComparisonTool.tsx`. `npm test` transcribes the app's versions independently and diffs the two across **every** feature × plan × add-on combination (1,584 of them) and all 72 plan pairs. If the server and the site ever disagree, the test fails.

---

## Running it

```bash
cd mcp-server
npm install
npm run build
npm test          # verifies parity with the web app
```

### Local (stdio) — Claude Desktop / Claude Code

`npm run build` first, then add to your MCP client config:

```json
{
  "mcpServers": {
    "slack-plan-comparison": {
      "command": "node",
      "args": ["/absolute/path/to/se-slack-app-2/mcp-server/dist/index.js"]
    }
  }
}
```

For Claude Code, from the repo root:

```bash
claude mcp add slack-plan-comparison -- node "$PWD/mcp-server/dist/index.js"
```

Poke at it directly with the inspector:

```bash
npm run inspect
```

### Hosted (streamable HTTP) — Heroku

```bash
cd mcp-server
heroku create your-app-name
heroku config:set SLACKPLAN_AUTH_TOKEN="$(openssl rand -hex 32)"
git subtree push --prefix mcp-server heroku main
```

The `Procfile` runs `node dist/http.js`; `npm install` triggers `prepare`, which builds. Endpoints:

- `POST /mcp` — the MCP endpoint
- `GET /healthz` — status, data source, feature count
- `GET /` — plain-text summary

Clients connect to `https://your-app-name.herokuapp.com/mcp`.

**Set `SLACKPLAN_AUTH_TOKEN` before exposing it publicly.** Without it the endpoint is open to anyone who finds the URL. With it, clients must send `Authorization: Bearer <token>`.

---

## Configuration

Everything is optional — see `.env.example` for the full list. The ones that matter:

| Variable | Default | Purpose |
|---|---|---|
| `SLACKPLAN_DATA_MODE` | `remote` | `bundled` disables all network reads and serves the compiled snapshot. |
| `SLACKPLAN_BRANCH` | `main` | Branch to read feature data from. |
| `SLACKPLAN_CACHE_TTL_MS` | `600000` | How long data stays warm before re-checking GitHub. |
| `GITHUB_TOKEN` | — | Raises the GitHub API rate limit for freshness lookups (60/hr unauthenticated). |
| `SLACKPLAN_AUTH_TOKEN` | — | HTTP only. Requires a bearer token on every request. |

---

## How data loading works

On each cache miss the server tries, in order:

1. **`raw.githubusercontent.com`** — reads `src/data/features.ts` and the category map from `PlanComparisonTool.tsx`, strips the TypeScript annotations and evaluates the object literals. This is the live path.
2. **`features.json`** published next to the site, if you ever add a build step that emits one.
3. **The bundled snapshot** in `src/data/snapshot.ts`.

A failed refresh never drops a good cached copy — it keeps serving the last good data and attaches a warning. Every tool response ends with a line naming the source it used, so a stale or fallback answer is always visible rather than silent.

`slackplan_data_freshness` additionally hits the GitHub commits API for the last commit that touched `features.ts`, which is the direct answer to *"when did you last update this?"*

### A note on evaluating remote code

Loading path 1 evaluates an object literal fetched from your repo. That means whoever can push to `claudiasellers/se-slack-app-2` can run code in this server's process — the same trust boundary as the published site itself. The fetch is pinned to one HTTPS repo path, the parser rejects anything containing imports or `require`, and the result is shape-validated before use. If you'd rather not take that trade, run with `SLACKPLAN_DATA_MODE=bundled` and refresh via `npm run snapshot`.

### Refreshing the offline snapshot

```bash
npm run build && npm run snapshot
```

Reads the parent repo's source files and regenerates `src/data/snapshot.ts`. Worth doing after big feature-data changes so the fallback doesn't drift.

---

## Known gap: deep links

Tool responses include links back to the web app with query parameters (`?tab=…&from=…&to=…&lob=…`). **The app doesn't read those parameters yet**, so today the links open the tool with its defaults rather than pre-selecting the comparison. The parameters are there so the links start working the moment `PlanComparisonTool.tsx` reads them — roughly 20 lines of `useSearchParams`-style initialisation on the existing `useState` calls.

---

## Maintenance

When you add features to `features.ts`, the server picks them up automatically — no change here. Things that *do* need a change:

- **New plan or plan key** → add it to `PLAN_DEFINITIONS` in `src/core/plans.ts` (id, label, rank, aliases).
- **New line of business** → add it to `LOB_DEFINITIONS` in `src/core/lob.ts`.
- **New legacy add-on** → nothing needed; add-ons are read from `legacyAddOns` in `features.ts`.
- **New category** → nothing needed; read live from the component.
- **`features.ts` gains an import** → the parser will refuse to evaluate it and fall back, with a warning saying exactly this. At that point, publish a `features.json` build artifact instead.

Run `npm test` after any change to `src/core/`.

---

This data is maintained by hand from the GA changelog, `#slack-cs-release-readiness` and the P&P matrix. It is an internal enablement aid, not an official Slack pricing source — verify anything customer-facing.
