/**
 * Line-of-business handling. These are the LOBs the web app offers, and the
 * keys used inside `featurePainPoints`.
 */

import type { Dataset } from "../types.js";

export interface LobDefinition {
  id: string;
  label: string;
  aliases: string[];
  /**
   * False when the LOB exists in the pain-point data but is not offered in the
   * web app's dropdown. `legal` is the current example: it has pain points
   * recorded but no UI entry, so this server can answer questions the site
   * cannot.
   */
  inWebApp: boolean;
}

/** The eight lines of business offered by the web app's dropdown, plus data-only extras. */
export const LOB_DEFINITIONS: LobDefinition[] = [
  { id: "it", label: "IT", aliases: ["it", "information technology", "itops", "admin", "admins", "security ops"], inWebApp: true },
  { id: "engineering", label: "Engineering", aliases: ["engineering", "eng", "developers", "devs", "r&d", "product engineering"], inWebApp: true },
  { id: "sales", label: "Sales", aliases: ["sales", "revenue", "go to market", "gtm", "account executives", "aes"], inWebApp: true },
  { id: "hr", label: "Human Resources", aliases: ["hr", "human resources", "people", "people ops", "talent", "enablement"], inWebApp: true },
  { id: "marketing", label: "Marketing", aliases: ["marketing", "comms", "brand", "demand gen"], inWebApp: true },
  { id: "finance", label: "Finance", aliases: ["finance", "fin", "accounting", "procurement", "fp&a"], inWebApp: true },
  { id: "customer_support", label: "Customer Support", aliases: ["customer support", "support", "cs", "service", "customer service", "success"], inWebApp: true },
  { id: "operations", label: "Operations", aliases: ["operations", "ops", "business operations", "bizops", "program management"], inWebApp: true },
  // Present in featurePainPoints but not in the web app's dropdown.
  { id: "legal", label: "Legal & Compliance", aliases: ["legal", "compliance", "legal and compliance", "grc", "risk"], inWebApp: false },
];

const LOB_BY_ID = new Map(LOB_DEFINITIONS.map((l) => [l.id, l]));

export function lobLabel(id: string): string {
  return LOB_BY_ID.get(id)?.label ?? id;
}

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/[_\-\s]+/g, " ");
}

export function resolveLob(input: string): LobDefinition | undefined {
  const raw = input.trim();
  if (LOB_BY_ID.has(raw)) return LOB_BY_ID.get(raw);

  const needle = normalize(raw);
  for (const lob of LOB_DEFINITIONS) {
    if (normalize(lob.id) === needle || normalize(lob.label) === needle) return lob;
  }
  for (const lob of LOB_DEFINITIONS) {
    if (lob.aliases.some((alias) => normalize(alias) === needle)) return lob;
  }
  return undefined;
}

export class UnknownLobError extends Error {
  constructor(input: string) {
    super(
      `Unknown line of business "${input}". Valid values are: ` +
        LOB_DEFINITIONS.map((l) => `${l.id} (${l.label})`).join(", ") +
        ".",
    );
    this.name = "UnknownLobError";
  }
}

export function requireLob(input: string): LobDefinition {
  const lob = resolveLob(input);
  if (!lob) throw new UnknownLobError(input);
  return lob;
}

/** The pain point a feature solves for a line of business, if one is recorded. */
export function getPainPoint(dataset: Dataset, feature: string, lobId: string): string | undefined {
  return dataset.featureData.featurePainPoints[feature]?.[lobId];
}

/** Every LOB that has a recorded pain point for this feature. */
export function lobsWithPainPoints(dataset: Dataset, feature: string): string[] {
  return Object.keys(dataset.featureData.featurePainPoints[feature] ?? {});
}
