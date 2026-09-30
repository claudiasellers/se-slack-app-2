/**
 * Plan registry, name resolution and availability lookup.
 *
 * The availability rules here mirror `getFeatureAccess` and
 * `getUpgradeFeatures` in PlanComparisonTool.tsx exactly, so the server and the
 * web app can never disagree about what a customer gains.
 */

import type { Availability, Dataset, PlanDefinition, ResolvedPlan } from "../types.js";

/** Upgrade order, lowest to highest. Matches `planHierarchy` in the app. */
export const PLAN_HIERARCHY = ["free", "pro", "plus_v1", "plus_v2", "grid_v1", "grid_v2"] as const;

export const PLAN_DEFINITIONS: PlanDefinition[] = [
  {
    id: "free",
    label: "Free",
    rank: 0,
    availableAddOns: [],
    aliases: ["free", "freemium", "starter"],
  },
  {
    id: "pro",
    label: "Pro",
    rank: 1,
    availableAddOns: ["slack_ai"],
    aliases: ["pro", "standard"],
  },
  {
    id: "plus_v1",
    label: "Business+ V1",
    group: "Business+",
    rank: 2,
    availableAddOns: ["slack_ai"],
    aliases: ["business+ v1", "business plus v1", "biz+ v1", "biz plus v1", "b+ v1", "plus v1", "business+ 1"],
  },
  {
    id: "plus_v2",
    label: "Business+ V2",
    group: "Business+",
    rank: 3,
    availableAddOns: [],
    aliases: ["business+ v2", "business plus v2", "biz+ v2", "biz plus v2", "b+ v2", "plus v2", "business+", "biz+", "business plus"],
  },
  {
    id: "grid_v1",
    label: "Grid V1",
    group: "Enterprise",
    rank: 4,
    availableAddOns: ["slack_ai"],
    aliases: ["grid v1", "enterprise grid", "grid", "egs", "enterprise grid v1", "legacy grid"],
  },
  {
    id: "grid_v2",
    label: "Enterprise+",
    group: "Enterprise",
    rank: 5,
    availableAddOns: [],
    aliases: ["enterprise+", "enterprise plus", "ent+", "ent plus", "e+", "grid v2", "enterprise"],
  },
];

const PLAN_BY_ID = new Map(PLAN_DEFINITIONS.map((p) => [p.id, p]));

export function getPlanById(id: string): PlanDefinition | undefined {
  return PLAN_BY_ID.get(id);
}

export function planLabel(id: string): string {
  return PLAN_BY_ID.get(id)?.label ?? id;
}

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/[_\s]+/g, " ").replace(/\s*\+\s*/g, "+");
}

/**
 * Resolve a plan the way a person would say it: "ent+", "Business Plus V2",
 * "grid_v1" all land on the right plan key.
 */
export function resolvePlanName(input: string): PlanDefinition | undefined {
  const raw = input.trim();
  if (PLAN_BY_ID.has(raw)) return PLAN_BY_ID.get(raw);

  const needle = normalize(raw);

  for (const plan of PLAN_DEFINITIONS) {
    if (normalize(plan.id) === needle || normalize(plan.label) === needle) return plan;
  }
  for (const plan of PLAN_DEFINITIONS) {
    if (plan.aliases.some((alias) => normalize(alias) === needle)) return plan;
  }
  return undefined;
}

export class UnknownPlanError extends Error {
  constructor(input: string) {
    const known = PLAN_DEFINITIONS.map((p) => `${p.id} (${p.label})`).join(", ");
    super(`Unknown plan "${input}". Valid plans are: ${known}.`);
    this.name = "UnknownPlanError";
  }
}

export function requirePlan(input: string): PlanDefinition {
  const plan = resolvePlanName(input);
  if (!plan) throw new UnknownPlanError(input);
  return plan;
}

/**
 * Validate add-ons against a plan, dropping any that do not apply and
 * reporting why, so callers can surface an explanation instead of silently
 * returning the wrong answer.
 */
export function resolveAddOns(
  plan: PlanDefinition,
  requested: string[],
  dataset: Dataset,
): { applied: string[]; ignored: Array<{ addOn: string; reason: string }> } {
  const applied: string[] = [];
  const ignored: Array<{ addOn: string; reason: string }> = [];

  for (const key of requested) {
    const addOn = dataset.legacyAddOns[key];
    if (!addOn) {
      const known = Object.keys(dataset.legacyAddOns).join(", ") || "none";
      ignored.push({ addOn: key, reason: `not a known add-on (known add-ons: ${known})` });
      continue;
    }
    if (!addOn.applicablePlans.includes(plan.id)) {
      ignored.push({
        addOn: key,
        reason: `${addOn.label} does not apply to ${plan.label} (applies to: ${addOn.applicablePlans
          .map(planLabel)
          .join(", ")})`,
      });
      continue;
    }
    applied.push(key);
  }

  return { applied, ignored };
}

export function resolvedPlanLabel(plan: PlanDefinition, addOns: string[], dataset: Dataset): string {
  if (addOns.length === 0) return plan.label;
  const names = addOns.map((k) => dataset.legacyAddOns[k]?.label ?? k);
  return `${plan.label} + ${names.join(" + ")}`;
}

export function makeResolvedPlan(plan: PlanDefinition, addOns: string[], dataset: Dataset): ResolvedPlan {
  return { plan, addOns, label: resolvedPlanLabel(plan, addOns, dataset) };
}

/**
 * Availability of `feature` on `plan`, honouring legacy add-on plan keys.
 *
 * Mirrors `getFeatureAccess` in the app: if an add-on applies to this plan and
 * the feature defines a key for the add-on variant (e.g. `plus_v1_ai`), that
 * value wins; otherwise fall back to the base plan key, then to `false`.
 */
export function getFeatureAccess(
  dataset: Dataset,
  feature: string,
  planId: string,
  addOns: string[] = [],
): Availability {
  const row = dataset.featureData.featureAvailability[feature];
  if (!row) return false;

  for (const key of addOns) {
    const addOn = dataset.legacyAddOns[key];
    if (addOn && addOn.applicablePlans.includes(planId)) {
      const variantKey = `${planId}${addOn.planKeySuffix}`;
      if (variantKey in row) return row[variantKey] as Availability;
    }
  }

  return row[planId] ?? false;
}

/** True when the availability value means "the customer can use this". */
export function isAvailable(value: Availability): boolean {
  return value !== false;
}

/** Render an availability value for humans. */
export function formatAvailability(value: Availability): string {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return value;
}

/**
 * Features gained moving from one plan to another.
 *
 * Mirrors `getUpgradeFeatures`: a feature counts as gained when the target
 * plan offers it and that differs from what the current plan offers. Note the
 * app deliberately ignores legacy add-ons on the *target* plan, since new
 * plans bundle what the add-ons used to sell separately.
 */
export function getUpgradeFeatures(
  dataset: Dataset,
  fromPlanId: string,
  toPlanId: string,
  fromAddOns: string[] = [],
): Array<{ feature: string; from: Availability; to: Availability }> {
  const gained: Array<{ feature: string; from: Availability; to: Availability }> = [];

  for (const feature of Object.keys(dataset.featureData.featureAvailability)) {
    const from = getFeatureAccess(dataset, feature, fromPlanId, fromAddOns);
    const to = getFeatureAccess(dataset, feature, toPlanId, []);
    if (from !== to && isAvailable(to)) {
      gained.push({ feature, from, to });
    }
  }

  return gained;
}

/**
 * Features the customer would lose - present on the current plan but not the
 * target. Usually empty for a true upgrade; surfacing it catches downgrades
 * and the odd legacy quirk (Google OAuth on Grid, for one).
 */
export function getLostFeatures(
  dataset: Dataset,
  fromPlanId: string,
  toPlanId: string,
  fromAddOns: string[] = [],
): Array<{ feature: string; from: Availability; to: Availability }> {
  const lost: Array<{ feature: string; from: Availability; to: Availability }> = [];

  for (const feature of Object.keys(dataset.featureData.featureAvailability)) {
    const from = getFeatureAccess(dataset, feature, fromPlanId, fromAddOns);
    const to = getFeatureAccess(dataset, feature, toPlanId, []);
    if (isAvailable(from) && !isAvailable(to)) {
      lost.push({ feature, from, to });
    }
  }

  return lost;
}
