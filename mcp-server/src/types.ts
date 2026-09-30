/**
 * Core domain types for the Slack Plan Comparison data set.
 */

/**
 * A feature's availability on a given plan key.
 *  - true   -> fully available
 *  - false  -> not available
 *  - string -> available with a qualifier, e.g. "User-created Only", "(Add-on)"
 */
export type Availability = boolean | string;

/** feature name -> plan key -> availability */
export type FeatureAvailability = Record<string, Record<string, Availability>>;

/** feature name -> prose description */
export type FeatureDescriptions = Record<string, string>;

/** feature name -> line of business -> the pain point this feature solves */
export type FeaturePainPoints = Record<string, Record<string, string>>;

export interface FeatureData {
  featureAvailability: FeatureAvailability;
  featureDescriptions: FeatureDescriptions;
  featurePainPoints: FeaturePainPoints;
}

export interface LegacyAddOn {
  label: string;
  applicablePlans: readonly string[];
  planKeySuffix: string;
}

export type LegacyAddOns = Record<string, LegacyAddOn>;

/** category name -> feature names belonging to it */
export type CategoryMap = Record<string, string[]>;

/** Where a successfully loaded dataset came from. */
export type DataSource = "github-raw" | "site-json" | "bundled-snapshot";

export interface Dataset {
  featureData: FeatureData;
  legacyAddOns: LegacyAddOns;
  categories: CategoryMap;
  /** Which upstream actually served this data. */
  source: DataSource;
  /** When this process fetched it. */
  fetchedAt: string;
  /** Non-fatal problems encountered while loading (e.g. a fallback was used). */
  warnings: string[];
}

export interface CommitInfo {
  sha: string;
  shortSha: string;
  date: string;
  message: string;
  author: string;
  url: string;
}

export interface PlanDefinition {
  /** Plan key as used in the data, e.g. "plus_v2". */
  id: string;
  /** Human label as shown in the web app, e.g. "Business+ V2". */
  label: string;
  /** Grouping shown in the app's dropdown, e.g. "Business+". */
  group?: string;
  /** Position in the upgrade hierarchy (low -> high). */
  rank: number;
  /** Add-on keys that can be layered onto this plan. */
  availableAddOns: string[];
  /** Common aliases people use in conversation. */
  aliases: string[];
}

export interface ResolvedPlan {
  plan: PlanDefinition;
  addOns: string[];
  /** Display label including any add-ons, e.g. "Business+ V1 + Slack AI Add-on". */
  label: string;
}

export interface FeatureRow {
  feature: string;
  category: string;
  description?: string;
  /** plan label -> availability, in the order the caller asked for. */
  availability: Record<string, Availability>;
}

export interface GainedFeature {
  feature: string;
  category: string;
  description?: string;
  from: Availability;
  to: Availability;
  /** Present only when a line of business was supplied. */
  painPoint?: string;
}
