/**
 * Parity and behaviour tests.
 *
 * The most important thing this server can get wrong is disagreeing with the
 * web app about what a customer gains. So rather than assert hand-written
 * expectations, this transcribes the app's own getFeatureAccess /
 * getUpgradeFeatures / categorizeFeatures from PlanComparisonTool.tsx and
 * compares the two implementations across every feature, plan and add-on
 * combination.
 *
 * Run with: npm test   (builds first, then runs against dist/)
 */

import assert from "node:assert/strict";

import {
  SNAPSHOT_CATEGORIES as categories,
  SNAPSHOT_FEATURE_DATA as featureData,
  SNAPSHOT_LEGACY_ADD_ONS as legacyAddOns,
} from "../dist/data/snapshot.js";
import {
  PLAN_DEFINITIONS,
  getFeatureAccess,
  getLostFeatures,
  getUpgradeFeatures,
  requirePlan,
  resolveAddOns,
  resolvePlanName,
} from "../dist/core/plans.js";
import { groupByCategory } from "../dist/core/categories.js";
import { requireFeature } from "../dist/core/search.js";
import { getPainPoint, requireLob } from "../dist/core/lob.js";

const dataset = {
  featureData,
  legacyAddOns,
  categories,
  source: "bundled-snapshot",
  fetchedAt: new Date().toISOString(),
  warnings: [],
};

let checks = 0;
let fails = 0;
const fail = (message) => {
  console.log("  FAIL:", message);
  fails++;
};

// --- Reference implementation, transcribed from PlanComparisonTool.tsx ------

const appGetFeatureAccess = (feature, plan, addOns) => {
  const featureAvail = featureData.featureAvailability[feature];
  if (!featureAvail) return false;
  for (const addOnKey of addOns) {
    const addOn = legacyAddOns[addOnKey];
    if (addOn && addOn.applicablePlans.includes(plan)) {
      const addOnPlanKey = `${plan}${addOn.planKeySuffix}`;
      if (addOnPlanKey in featureAvail) return featureAvail[addOnPlanKey];
    }
  }
  return featureAvail[plan] ?? false;
};

const appGetUpgradeFeatures = (current, future, currentAddOns = []) => {
  const added = [];
  for (const feature in featureData.featureAvailability) {
    const currentAccess = appGetFeatureAccess(feature, current, currentAddOns);
    const futureAccess = appGetFeatureAccess(feature, future, []);
    if (currentAccess !== futureAccess && futureAccess) added.push(feature);
  }
  return added;
};

const appCategorize = (features) => {
  const out = {};
  for (const category in categories) {
    const matches = features.filter((f) => categories[category].includes(f));
    if (matches.length > 0) out[category] = matches;
  }
  const other = features.filter((f) => {
    for (const category in categories) {
      if (category !== "Other Features" && categories[category].includes(f)) return false;
    }
    return true;
  });
  if (other.length > 0) out["Other Features"] = other;
  return out;
};

// --- 1. getFeatureAccess parity -------------------------------------------

const PLANS = PLAN_DEFINITIONS.map((p) => p.id);
const ADD_ON_SETS = [[], ["slack_ai"]];

for (const feature of Object.keys(featureData.featureAvailability)) {
  for (const plan of PLANS) {
    for (const addOns of ADD_ON_SETS) {
      checks++;
      const mine = getFeatureAccess(dataset, feature, plan, addOns);
      const theirs = appGetFeatureAccess(feature, plan, addOns);
      if (mine !== theirs) {
        fail(`access ${feature}/${plan}/[${addOns}] mine=${JSON.stringify(mine)} app=${JSON.stringify(theirs)}`);
      }
    }
  }
}
console.log(`1. getFeatureAccess parity: ${checks} feature/plan/add-on combos`);

// --- 2. getUpgradeFeatures parity -----------------------------------------

let pairChecks = 0;
for (const from of PLANS) {
  for (const to of PLANS) {
    for (const addOns of ADD_ON_SETS) {
      pairChecks++;
      const mine = getUpgradeFeatures(dataset, from, to, addOns)
        .map((g) => g.feature)
        .sort();
      const theirs = appGetUpgradeFeatures(from, to, addOns).sort();
      if (JSON.stringify(mine) !== JSON.stringify(theirs)) {
        fail(`upgrade ${from} -> ${to} [${addOns}]: ${mine.length} vs app ${theirs.length}`);
      }
    }
  }
}
console.log(`2. getUpgradeFeatures parity: ${pairChecks} plan-pair comparisons`);

// --- 3. Categorization parity ---------------------------------------------

{
  const features = getUpgradeFeatures(dataset, "free", "grid_v2").map((g) => g.feature);
  const mine = groupByCategory(dataset, features);
  const theirs = appCategorize(features);
  assert.deepEqual(Object.keys(mine), Object.keys(theirs), "category ordering differs from the app");
  for (const key of Object.keys(theirs)) {
    assert.deepEqual(mine[key], theirs[key], `category "${key}" differs from the app`);
  }
  console.log(`3. categorization parity: ${Object.keys(mine).length} categories over ${features.length} features`);
}

// --- 4. Spot checks read directly from features.ts ------------------------

const spotChecks = [
  ["Canvas", "free", [], false],
  ["Canvas", "pro", [], true],
  ["Enterprise Search", "grid_v1", [], false],
  ["Enterprise Search", "grid_v1", ["slack_ai"], true], // add-on variant key wins
  ["Enterprise Search", "grid_v2", [], true],
  ["Enterprise Search", "plus_v2", [], false],
  ["Recaps", "plus_v1", [], false],
  ["Recaps", "plus_v1", ["slack_ai"], true],
  ["Recaps", "plus_v1", ["slack_elevate"], false], // unknown add-on ignored
  ["Google OAuth 2.0", "grid_v2", [], false], // genuinely absent on Grid
  ["Google OAuth 2.0", "pro", [], true],
  ["Per-Org Customization - Slack Connect", "pro", [], "(Limited)"],
  ["Custom Canvas Templates", "pro", [], "User-created Only"],
  ["Custom Canvas Templates", "grid_v2", [], "User + Admin Created"],
  ["EKM (Enterprise Key Management)", "grid_v2", [], "(Add-on)"],
  ["Integrations", "free", [], "Only 10"],
  ["Canvas AI", "pro", ["slack_ai"], false], // no pro_ai key -> falls back to base pro
];

for (const [feature, plan, addOns, expected] of spotChecks) {
  checks++;
  const got = getFeatureAccess(dataset, feature, plan, addOns);
  if (got !== expected) {
    fail(`spot ${feature}/${plan}/[${addOns}] got=${JSON.stringify(got)} want=${JSON.stringify(expected)}`);
  }
}
console.log(`4. spot checks: ${spotChecks.length} values verified against features.ts`);

// --- 5. Add-on validation --------------------------------------------------

{
  const pro = requirePlan("pro");
  assert.deepEqual(resolveAddOns(pro, ["slack_ai"], dataset).applied, ["slack_ai"]);

  const onPlusV2 = resolveAddOns(requirePlan("plus_v2"), ["slack_ai"], dataset);
  assert.equal(onPlusV2.applied.length, 0, "slack_ai must not apply to plus_v2");
  assert.match(onPlusV2.ignored[0].reason, /does not apply/);

  const unknown = resolveAddOns(pro, ["bogus"], dataset);
  assert.match(unknown.ignored[0].reason, /not a known add-on/);

  console.log("5. add-on validation: applicable, inapplicable and unknown all handled");
}

// --- 6. Plan name resolution ----------------------------------------------

const nameCases = [
  ["grid_v2", "grid_v2"],
  ["Enterprise+", "grid_v2"],
  ["ent+", "grid_v2"],
  ["ENT PLUS", "grid_v2"],
  ["e+", "grid_v2"],
  ["Business+ V2", "plus_v2"],
  ["biz+ v2", "plus_v2"],
  ["business plus", "plus_v2"],
  ["plus_v1", "plus_v1"],
  ["Grid V1", "grid_v1"],
  ["enterprise grid", "grid_v1"],
  ["free", "free"],
  ["Pro", "pro"],
];

for (const [input, want] of nameCases) {
  checks++;
  const got = resolvePlanName(input)?.id;
  if (got !== want) fail(`plan name "${input}" -> ${got}, want ${want}`);
}
assert.equal(resolvePlanName("nonsense"), undefined);
console.log(`6. plan name resolution: ${nameCases.length} aliases, unknown returns undefined`);

// --- 7. Feature lookup -----------------------------------------------------

const lookupCases = [
  ["Enterprise Search", "Enterprise Search"],
  ["enterprise search", "Enterprise Search"],
  ["DLP (Data Loss Prevention)", "DLP (Data Loss Prevention)"],
  ["legal holds", "Legal Holds"],
  ["audit logs api", "Audit Logs API"],
  ["canvas", "Canvas"],
  ["slackbot memory", "Slackbot Memory"],
];

for (const [query, want] of lookupCases) {
  checks++;
  let got;
  try {
    got = requireFeature(dataset, query);
  } catch (error) {
    got = `THREW: ${error.message}`;
  }
  if (got !== want) fail(`feature lookup "${query}" -> ${got}, want ${want}`);
}
assert.throws(() => requireFeature(dataset, "zzzz nonexistent qqq"), /No feature matches/);
console.log(`7. feature lookup: ${lookupCases.length} queries resolved, misses throw with suggestions`);

// --- 8. Lines of business, including the data-only "legal" ----------------

{
  assert.throws(() => requireLob("not a team"), /Unknown line of business/);
  assert.equal(requireLob("IT").id, "it");
  assert.equal(requireLob("legal").id, "legal");
  assert.equal(requireLob("compliance").id, "legal");
  assert.equal(requireLob("AEs").id, "sales");

  const legalPain = getPainPoint(dataset, "App Access Controls", "legal");
  assert.ok(legalPain && legalPain.length > 20, "expected a legal pain point for App Access Controls");

  const itPainCount = getUpgradeFeatures(dataset, "plus_v2", "grid_v2").filter((g) =>
    getPainPoint(dataset, g.feature, "it"),
  ).length;
  assert.ok(itPainCount > 10, `expected many IT pain points on plus_v2 -> grid_v2, got ${itPainCount}`);

  console.log(`8. LOB handling: "legal" reachable, ${itPainCount} IT pain points on Business+ V2 -> Enterprise+`);
}

// --- 9. Lost features ------------------------------------------------------

{
  const lost = getLostFeatures(dataset, "plus_v2", "grid_v2").map((l) => l.feature);
  assert.ok(lost.includes("Google OAuth 2.0"), `expected Google OAuth 2.0 in lost features, got ${JSON.stringify(lost)}`);
  console.log(`9. lost-feature detection, Business+ V2 -> Enterprise+: ${JSON.stringify(lost)}`);
}

// --- 10. Realistic scenarios ----------------------------------------------

{
  const scenarios = [
    ["free", "pro", []],
    ["pro", "plus_v2", []],
    ["plus_v2", "grid_v2", []],
    ["grid_v1", "grid_v2", []],
    ["grid_v1", "grid_v2", ["slack_ai"]],
    ["plus_v1", "plus_v2", []],
    ["plus_v1", "plus_v2", ["slack_ai"]],
  ];

  for (const [from, to, addOns] of scenarios) {
    const gained = getUpgradeFeatures(dataset, from, to, addOns);
    const cats = Object.keys(groupByCategory(dataset, gained.map((g) => g.feature)));
    console.log(
      `    ${from}${addOns.length ? ` +${addOns.join("+")}` : ""} -> ${to}: ` +
        `${gained.length} gained across ${cats.length} categories`,
    );
  }

  const withoutAddOn = getUpgradeFeatures(dataset, "grid_v1", "grid_v2", []).length;
  const withAddOn = getUpgradeFeatures(dataset, "grid_v1", "grid_v2", ["slack_ai"]).length;
  assert.ok(
    withAddOn < withoutAddOn,
    `the Slack AI add-on should shrink the Grid V1 -> Enterprise+ delta (${withAddOn} vs ${withoutAddOn})`,
  );
  console.log(`10. scenarios ran; Slack AI add-on shrinks the Grid V1 delta ${withoutAddOn} -> ${withAddOn}`);
}

// --- 11. Categorization is a partition ------------------------------------

{
  const all = Object.keys(featureData.featureAvailability);
  const flat = Object.values(groupByCategory(dataset, all)).flat();
  assert.equal(flat.length, all.length, "features were lost or duplicated during categorization");
  assert.equal(new Set(flat).size, all.length, "a feature appeared in more than one category");
  console.log(`11. categorization is a partition: ${all.length} features, no drops or duplicates`);
}

console.log("");
console.log(fails === 0 ? `ALL PASS — ${checks} assertions, ${pairChecks} plan-pair comparisons` : `${fails} FAILURES`);
process.exit(fails === 0 ? 0 : 1);
