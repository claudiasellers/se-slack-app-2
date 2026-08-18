// Plan / LOB / category taxonomy.
//
// This is a verbatim extraction of the literals that previously lived inside
// PlanComparisonTool.tsx (planGroups, lobOptions, and the category table inside
// categorizeFeatures). It is kept free of React so both the app and the MCP
// server can share one source of truth.
//
// NOTE: intentionally byte-for-byte identical to the component's originals,
// including known quirks ("Atlas" in two categories, "Slackbot Web Search"
// listed twice). Fixing those would change rendered output and is deliberately
// out of scope here.

export type PlanOption = { value: string; label: string }
export type PlanGroup = { label: string; options: PlanOption[] }
export type PlanStructure = (PlanOption | PlanGroup)[]

export const planGroups: PlanStructure = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  {
    label: "Business+",
    options: [
      { value: "plus_v1", label: "Business+ V1" },
      { value: "plus_v2", label: "Business+ V2" },
    ],
  },
  {
    label: "Enterprise",
    options: [
      { value: "grid_v1", label: "Grid V1" },
      { value: "grid_v2", label: "Enterprise+" },
    ],
  },
]

export const planOptions: PlanOption[] = planGroups.flatMap((g) => ("options" in g ? g.options : g))

// Tier order, lowest to highest. Previously duplicated at two call sites.
export const planHierarchy: string[] = ["free", "pro", "plus_v1", "plus_v2", "grid_v1", "grid_v2"]

export const lobOptions: { value: string; label: string }[] = [
  { value: "", label: "Select Line of Business (Optional)" },
  { value: "it", label: "IT" },
  { value: "engineering", label: "Engineering" },
  { value: "sales", label: "Sales" },
  { value: "hr", label: "Human Resources" },
  { value: "marketing", label: "Marketing" },
  { value: "finance", label: "Finance" },
  { value: "customer_support", label: "Customer Support" },
  { value: "operations", label: "Operations" },
]

// Same list without the UI placeholder row, for non-UI consumers.
export const linesOfBusiness = lobOptions.filter((l) => l.value !== "")

// Category -> features. Insertion order is render order.
export const featureCategories: Record<string, string[]> = {
  "Collaboration Tools": [
    "Canvas",
    "Custom Canvas Templates",
    "Clips",
    "Multiple Workspaces",
    "Multi-Workspace Channels",
    "Lists",
    "Slack Channel Templates",
    "Workflow Builder",
    "Conditional Workflows",
    "Workflow Builder Collections (Lookups & Repeaters)",
    "Channel Posting Permissions",
  ],
  "Administration & Analytics": [
    "Granular Admin Roles",
    "Central Channel Dashboard",
    "Admin API",
    "Analytics API (Members)",
    "Analytics API (Conversations)",
    "App Analytics",
    "Atlas",
    "Message Activity",
    "Approve Workspaces",
    "Slackbot Analytics Dashboard",
    "App Access Controls",
    "Advanced Member Analytics",
  ],
  "Security & Compliance": [
    "Restrict AI access to certain channels, canvases, and lists",
    "Custom Retention Policies (Workspace)",
    "Custom Retention Policies (Org-Wide)",
    "SAML SSO",
    "Multi-SAML SSO",
    "Session Duration - Desktop + Mobile",
    "Session Management",
    "MDM (Mobile Device Management)",
    "MAM (Mobile Application Management)",
    "EMM (Enterprise Mobility Management)",
    "Native Device Management: Block Jailbroken Devices",
    "Native Device Management: Block Copy / Paste (Mobile)",
    "EKM (Enterprise Key Management)",
    "Block File Downloads (Desktop + Mobile)",
    "Legal Holds",
    "Information Barriers",
    "DLP (Data Loss Prevention)",
    "Native DLP",
    "Audit Logs API",
    "Audit Logs (Native Dashboard)",
    "Discovery/DLP API",
    "Data Residency (IDR)",
    "Custom Terms of Service",
    "Flag Content",
    "AI Content Safety Filters",
  ],
  "External Collaboration": [
    "Guests",
    "Slack Connect (Shared Channels)",
    "Sponsored Connections - Slack Connect",
    "Per-Org Customization - Slack Connect",
    "Lock Guest Names",
  ],
  "User Management": [
    "SCIM API Provisioning",
    "SCIM API Provisioning (Guest Provisioning)",
    "Atlas",
    "Custom User Groups",
    "IDP Groups",
    "Domain Claiming (create workspace)",
    "Google OAuth 2.0",
    "Organization Level User Groups",
  ],
  "Data & Exports": [
    "Exports (Public Data)",
    "Exports (Full Data)",
    "Exports (Single User Exports)",
    "Exports (Salesforce Channels)",
  ],
  "Support & Reliability": ["Guaranteed Uptime and Fast Customer Support"],
  "Slack AI": [
    "Thread & Channel Summaries",
    "File Summaries",
    "Recaps",
    "Huddles Notes",
    "Slack AI Search",
    "Enterprise Search",
    "3rd Party Agent Apps",
    "AI Workflow Builder",
    "AI Steps in Workflow Builder",
    "Catchup Summaries on Mobile",
    "AI Language Translations",
    "AI Admin analytics dashboard",
    "AI Explain",
    "Canvas AI",
    "Workflow Builder: 3rd-party knowledge sources for AI Generate Response",
  ],
  "Slackbot Functionality": [
    "Message Limit",
    "Full Access: Unlimited Messages",
    "Slack search (including canvases)",
    "Multiple searches at once",
    "Desktop & mobile parity",
    "File uploads & calendar entity read",
    "Create & update canvases",
    "3P entity read (GDrive, OneDrive, Box, etc)",
    "Enterprise search w/ 3P read only connectors (OneDrive, Box, GDrive)",
    "Slackbot Scheduled Automations",
    "Slackbot Skills",
    "Slackbot Salesforce search, create, and update",
    "Emails - search, draft, and send",
    "Enterprise Search in Slackbot",
    "Calendar events - search and create in Slackbot",
    "Slackbot native Slack actions",
    "Slackbot Web Search",
    "Slackbot: Upload Files to Salesforce",
    "Slackbot: Read Salesforce reports",
    "Slackbot MCP Client",
    "Slackbot Slide Creation",
    "Slackbot Web Search",
    "Slackbot Memory",
    "Slackbot Voice Dictation",
    "Slackbot Charts",
    "Slackbot Surfaces",
  ],
  "Slackbot Trust & Security": [
    "International Data Residency",
    "Full-org kill switch",
    "Custom group access",
    "Full Data Export",
    "Filtered & single user export",
    "Slackbot DLP",
    "EKM compatibility",
    "Slackbot Audit logs",
  ],
  "Salesforce Integration": [
    "Salesforce Channels",
    "Record Unfurls",
    "Record Search",
    "Record View & Edit",
    "Related List Views",
    "Connect multiple Salesforce orgs",
    "Salesforce standalone List Views",
    "Salesforce workflow automation (Event triggers)",
    "Salesforce workflow automation (Scheduled triggers)",
    "Salesforce workflow automation (send to Salesforce app step)",
    "Sales Home",
    "Slack Sales Templates",
    "Salesforce Channel AI Summary Tab",
    "Slackbot Salesforce MCP Servers",
  ],
  "Other Features": [],
}
