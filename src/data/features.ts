// Define available legacy add-ons
// Maps add-on key to its display label and which base plans it applies to
export const legacyAddOns: Record<string, { label: string; applicablePlans: readonly string[]; planKeySuffix: string }> = {
  slack_ai: {
    label: "Slack AI Add-on",
    applicablePlans: ["pro", "plus_v1", "grid_v1"], // Plans that could have purchased this add-on
    planKeySuffix: "_ai" // When this add-on is selected, append this to the plan key (e.g., plus_v1 -> plus_v1_ai)
  },
  // Future: slack_elevate can be added here with its own suffix
};

// Feature data structure
export const featureData = {
  featureAvailability: {
    "Multiple Workspaces": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "Canvas": { free: false, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "Custom Canvas Templates": { free: false, pro: "User-created Only", plus_v1: "User-created Only", plus_v2: "User-created Only", grid_v1: "User + Admin Created", grid_v2: "User + Admin Created" },
    "Slack Sales Templates": { free: false, pro: false, plus_v1: false, plus_v2: true, grid_v1: true, grid_v2: true },
    "Clips": { free: true, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "Guests": { free: false, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "Slack Connect (Shared Channels)": { free: false, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "Sponsored Connections - Slack Connect": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "Per-Org Customization - Slack Connect": {free: false, pro: "(Limited)", plus_v1: true, plus_v2: true, grid_v1: "(+ Enhanced visibility)", grid_v2: "(+ Enhanced visibility)"},
    "Multi-Workspace Channels": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "Channel Posting Permissions": {free: "(#general channel only)", pro: "(#general channel only)", plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true},
    "Workflow Builder": { free: false, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "Message Activity": { free: false, pro: false, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "Slack Mobile Catch Up": { free: true, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "Out of Office Responder": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "Lists": { free: false, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "Slack Channel Templates": { free: false, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "Granular Admin Roles": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "Central Channel Dashboard": { free: false, pro: false, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "Admin API": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "Analytics API (Members)": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "Analytics API (Conversations)": { free: false, pro: false, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "App Analytics": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "Custom Retention Policies (Workspace)": { free: false, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "Custom Retention Policies (Org-Wide)": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "Lock Guest Names": { free: true, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "Google OAuth 2.0": { free: false, pro: true, plus_v1: true, plus_v2: true, grid_v1: false, grid_v2: false },
    "SAML SSO": { free: "Enabled by connecting Slack to Salesforce.", pro: "Enabled by connecting Slack to Salesforce.", plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "Multi-SAML SSO": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "SCIM API Provisioning": { free: "Enabled by connecting Slack to Salesforce.", pro: "Enabled by connecting Slack to Salesforce.", plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "SCIM API Provisioning (Guest Provisioning)": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "Atlas": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "Custom User Groups": { free: false, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "IDP Groups": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "Session Duration - Desktop + Mobile": { free: true, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "Session Management": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "Domain Claiming (create workspace)": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "MDM (Mobile Device Management)": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "MAM (Mobile Application Management)": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "EMM (Enterprise Mobility Management)": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "Native Device Management: Block Jailbroken Devices": { free: true, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "Native Device Management: Block Copy / Paste (Mobile)": { free: true, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "EKM (Enterprise Key Management)": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: "(Add-on)", grid_v2: "(Add-on)" },
    "Block File Downloads (Desktop + Mobile)": { free: true, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "Legal Holds": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "Information Barriers": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "DLP (Data Loss Prevention)": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "Native DLP": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "Audit Logs API": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "Audit Logs (Native Dashboard)": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "Discovery/DLP API": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "Exports (Public Data)": { free: false, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "Exports (Full Data)": { free: false, pro: false, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "Exports (Single User Exports)": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "Exports (Salesforce Channels)": { free: true, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "Custom Terms of Service": { free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: true, grid_v2: true },
    "Approve Workspaces": { free: false, pro: false, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "Data Residency (IDR)": { free: false, pro: false, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "Guaranteed Uptime and Fast Customer Support": { free: false, pro: false, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true },
    "Integrations": {free: "Only 10", pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true},
    "Thread & Channel Summaries": {free: false, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true},
    "File Summaries": {free: false, pro: false, plus_v1: false, plus_v1_ai: true, plus_v2: true, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "Recaps": {free: false, pro: false, plus_v1: false, plus_v1_ai: true, plus_v2: true, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "Huddles Notes":{free: false, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true},
    "Slack AI Search": {free: false, pro: false, plus_v1: false, plus_v1_ai: true, plus_v2: true, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "Enterprise Search": {free: false, pro: false, plus_v1: false, plus_v2: false, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "3rd Party Agent Apps" : {free: false, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true},
    "AI Workflow Builder": {free: false, pro: false, plus_v1: false, plus_v1_ai: true, plus_v2: true, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "AI Steps in Workflow Builder": {free: false, pro: false, plus_v1: false, plus_v1_ai: true, plus_v2: true, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "Catchup Summaries on Mobile": {free: false, pro: false, plus_v1: false, plus_v1_ai: true, plus_v2: true, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "AI Language Translations": {free: false, pro: false, plus_v1: false, plus_v1_ai: true, plus_v2: true, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "Conditional Workflows": { free: false, pro: false, plus_v1: false, plus_v2: true, grid_v1: true, grid_v2: true },
    "Salesforce Channels": {free: "Users See 90 Days Only", pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true},
    "Record Unfurls":{free: true, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true},
    "Record Search": {free: true, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true},
    "Record View & Edit": {free: true, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true},
    "Related List Views": {free: true, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true}, 
    "Connect multiple Salesforce orgs": {free: false, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true},
    "Salesforce standalone List Views": {free: false, pro: false, plus_v1: false, plus_v2: true, grid_v1: false, grid_v2: true},
    "Salesforce workflow automation (Event triggers)": {free: false, pro: false, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true},
    "Salesforce workflow automation (Scheduled triggers)": {free: false, pro: false, plus_v1: false, plus_v2: true, grid_v1: false, grid_v2: true},
    "Sales Home": {free: false, pro: false, plus_v1: false, plus_v2: true, grid_v1: false, grid_v2: true},
    "Salesforce Channel AI Summary Tab": { free: false, pro: false, plus_v1: false, plus_v2: true, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "AI Admin analytics dashboard": {free: false, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true},
    "AI Explain": {free: false, pro: false, plus_v1: false, plus_v1_ai: true, plus_v2: true, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "Canvas AI": {free: false, pro: false, plus_v1: false, plus_v1_ai: true, plus_v2: true, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "Salesforce workflow automation (send to Salesforce app step)": {free: false, pro: false, plus_v1: false, plus_v2: true, grid_v1: false, grid_v2: true},
    "Message Limit": {free: false, pro: false, pro_ai: false, plus_v1: false, plus_v1_ai: true, plus_v2: true, grid_v1: false, grid_v1_ai: false, grid_v2: false},
    "Full Access: Unlimited Messages": {free: false, pro: false, pro_ai: false, plus_v1: false, plus_v1_ai: "Message Limit", plus_v2: "Message Limit", grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "Slack search (including canvases)": {free: false, pro: false, pro_ai: false, plus_v1: false, plus_v1_ai: true, plus_v2: true, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "Multiple searches at once": {free: false, pro: false, pro_ai: false, plus_v1: false, plus_v1_ai: true, plus_v2: true, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "Desktop & mobile parity": {free: false, pro: false, pro_ai: false, plus_v1: false, plus_v1_ai: true, plus_v2: true, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "File uploads & calendar entity read": {free: false, pro: false, pro_ai: false, plus_v1: false, plus_v1_ai: true, plus_v2: false, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "Create & update canvases": {free: false, pro: false, pro_ai: false, plus_v1: false, plus_v1_ai: true, plus_v2: true, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "3P entity read (GDrive, OneDrive, Box, etc)": {free: false, pro: false, pro_ai: false, plus_v1: false, plus_v1_ai: false, plus_v2: false, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "Enterprise search w/ 3P read only connectors (OneDrive, Box, GDrive)": {free: false, pro: false, pro_ai: false, plus_v1: false, plus_v1_ai: false, plus_v2: false, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "Full-org kill switch": {free: false, pro: false, pro_ai: false, plus_v1: false, plus_v1_ai: true, plus_v2: true, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "Custom group access": {free: false, pro: false, pro_ai: false, plus_v1: false, plus_v1_ai: true, plus_v2: true, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "Full Data Export": {free: false, pro: false, pro_ai: false, plus_v1: false, plus_v1_ai: true, plus_v2: true, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "Filtered & single user export": {free: false, pro: false, pro_ai: false, plus_v1: false, plus_v1_ai: false, plus_v2: false, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "Slackbot DLP": {free: false, pro: false, pro_ai: false, plus_v1: false, plus_v1_ai: false, plus_v2: false, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "EKM compatibility": {free: false, pro: false, pro_ai: false, plus_v1: false, plus_v1_ai: false, plus_v2: false, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "Slackbot Audit logs": {free: false, pro: false, pro_ai: false, plus_v1: false, plus_v1_ai: false, plus_v2: false, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "Channel Expert Agent": {free: false, pro: false, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true},
    "Real-Time Search API": {free: false, pro: true, plus_v1: true, plus_v2: true, grid_v1: true, grid_v2: true},
    "Slackbot Skills": {free: false, pro: false, pro_ai: false, plus_v1: false, plus_v1_ai: true, plus_v2: true, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "Slackbot Scheduled Automations": {free: false, pro: false, plus_v1: false, plus_v1_ai: true, plus_v2: true, grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "Emails - search, draft, and send": {free: false, pro: false, pro_ai: false, plus_v1: false, plus_v1_ai: "Q2", plus_v2: "Q2", grid_v1: false, grid_v1_ai: true, grid_v2: true},
    "Slackbot Salesforce Search": {free: "In Sample", pro: "In Sample", pro_ai: "In Sample", plus_v1: "In Sample", plus_v1_ai: true, plus_v2: true, grid_v1: "In Sample", grid_v1_ai: true, grid_v2: true},
    "Restrict AI access to certain channels, canvases, and lists": {free: false, pro: false, pro_ai: false, plus_v1: false, plus_v1_ai: false, plus_v2: false, grid_v1: false, grid_v1_ai: false, grid_v2: true },
    "Enterprise Search in Slackbot": {free: false, pro: false, pro_ai: false, plus_v1: false, plus_v1_ai: false, plus_v2: false, grid_v1: false, grid_v1_ai: true, grid_v2: true }



  },
  featureDescriptions: {
    Workspace: "",
    "Integrations": "Apps/integrations, custom apps, App Directory apps.",
    "Huddles": "Real-time audio or video conversations within Slack channels or direct messages",
    "Canvas": "A collaborative doc, right inside Slack.",
    "Custom Canvas Templates": "Allows teams to create and share standardized templates for canvases, facilitating consistent documentation and workflows across the organization",
    "Slack Sales Templates": "Salesforce-integrated canvases that can include editable Salesforce records.",
    "Clips": "Record audio/video clips and upload directly.",
    "Guests": "Single-Channel Guests, Multi-Channel Guests.",
    "Slack Connect (Shared Channels)": "Secure slack channels between separate workspaces to collaborate with external partners.",
    "Sponsored Connections - Slack Connect": "Host Slack Connect channels with Free workspaces.",
    "Per-Org Customization - Slack Connect": "Some Slack Connect settings can be customized on a per-org basis.",
    "Slack Connect Workspaces": "A special workspace for external connections. Currently in Pilot.",
    "Multi-Workspace Channels": "Channels shared internally between workspaces in a Grid Org.",
    "Channel Posting Permissions": "Limit who can post in channels (e.g., lock down a channel to create an 'announcement channel').",
    "Workflow Builder": "No code/low code tool to automate common processes.",
    "Message Activity": "View the engagement stats of individual messages.",
    "Slack Mobile Catch Up": "Swipe through unread conversations on Mobile.",
    "Out of Office Responder": "Automatically send an out-of-office response when someone messages you.",
    "Lists": "Track structured information in a table format.",
    "Slack Channel Templates": "Slack Solutions—a full channel-based solution with lists, canvases, and workflows.",
    "Granular Admin Roles": "Create admin users with specific admin permissions.",
    "Central Channel Dashboard": "View and edit all channels from one dashboard.",
    "Admin API": "Automate admin processes.",
    "Analytics API (Members)": "Connect data from the Analytics Dashboard into a third-party BI tool to create custom analytics dashboards.",
    "Analytics API (Conversations)": "View engagement metrics related to installed apps.",
    "App Analytics": "View engagement metrics related to installed apps.",
    "Custom Retention Policies (Workspace)": "Set preferences for how long messages/files should be retained on a workspace.",
    "Custom Retention Policies (Org-Wide)": "Set specific retention settings on workspaces within a Grid Org.",
    "Lock Guest Names": "Restrict guests from changing their display names.",
    "Google OAuth 2.0": "Basic version of SSO (commonly used on the Pro plan).",
    "SAML SSO": "Advanced SSO (used with Okta, Azure, etc.).",
    "Multi-SAML SSO": "Connect multiple different SSO Providers into the same Grid Org.",
    "SCIM API Provisioning": "Automate user management processes (create, update, and deactivate users).",
    "SCIM API Provisioning (Guest Provisioning)": "Provision Multi-Channel Guests via SCIM.",
    "Atlas": "Enhanced profile fields and an org chart user directory.",
    "Custom User Groups": "Workspace-level groups to sync users to channels.",
    "IDP Groups": "Org-level groups to sync users to workspaces and channels.",
    "Session Duration - Desktop + Mobile": "Set a cadence to automatically log users out on desktop, web browser, and mobile.",
    "Session Management": "Granular logout controls that apply to mobile or desktop.",
    "Domain Claiming (join workspace)": "Prevent joining or creating workspaces using a claimed and verified domain.",
    "Domain Claiming (create workspace)": "Prevent Free workspaces from being created that are linked to a claimed corporate email domain.",
    "MDM (Mobile Device Management)": "Apply extra security controls at the device level. Managed via AppConfig vendor apps.",
    "MAM (Mobile Application Management)": "Apply security controls directly to the Slack app.",
    "Native Mobile Controls": "Security controls applied directly from Slack (requires no third-party tools).",
    "EKM (Enterprise Key Management)": "Manage your own encryption keys (requires Amazon KMS).",
    "Block File Downloads (Desktop + Mobile)": "Block downloads on desktop and restrict based on an IP address range.",
    "Legal Holds": "Preserve users data for litigation purposes (even if its deleted via Retention Settings).",
    "Information Barriers": "Prevent groups of users from communicating via DMs.",
    "DLP (Data Loss Prevention)": "Automatically scan and detect/remove unapproved data.",
    "Native DLP": "Natively set basic DLP policies via an admin dashboard in Slack.",
    "Audit Logs API": "Proactively track user actions to detect potential security threats.",
    "Audit Logs (Native Dashboard)": "Track user actions directly in a Slack admin dashboard.",
    "Discovery/DLP API": "Connect all Slack data to an eDiscovery tool or DLP tool.",
    "Exports (Public Data)": "Public channels only (JSON format).",
    "Exports (Full Data)": "Includes private channels and DMs (JSON format).",
    "Exports (Single User Exports)": "Data related to a specific user (JSON or TXT file).",
    "Custom Terms of Service": "Add specific verbiage and corporate terms for users to accept before using Slack.",
    "Approve Workspaces": "Configure a corporate network/VPN to only allow access to specific workspace URLs.",
    "Data Residency (IDR)": "Change where data is physically hosted (default: United States).",
    "Flag Messages": "End users can flag messages for review by admins.",
    "Report to Slack for EU Users": "Allows users to report prohibited content to Slack for review (EU Digital Services Act compliance).",
    "Lock Threads": "Prevent additional messages from being sent in a thread.",
    "Thread & Channel Summaries": "Generates a textual summary of a message thread or channel.",
    "File Summaries": "Creates a summary of a file's content directly in Slack.",
    "Recaps": "Provides a personalized digest of unread messages and key conversations",
    "Huddles Notes":"Automatically transcribes and summarizes audio from Huddles to capture key details.",
    "Slack AI Search": "Get answers to natural language questions based on the content of messages and files in Slack.",
    "Enterprise Search": "Includes content from connected third-party apps in your Slack search results.",
    "3rd Party Agent Apps" : "Add and use third-party AI assistants through the Slack Marketplace.",
    "AI Workflow Builder": "Creates multi-step workflows from a natural language description.",
    "AI Steps in Workflow Builder": "Users can add AI-powered steps within workflows, such as the 'Summarize Public Channels' step which can automatically generate channel summaries",
    "Salesforce Channels": "Dedicated Slack channel that syncs with a specific Salesforce record (e.g. Account or Opportunity).",
    "Record Unfurls":"Rich previews of Salesforce records that automatically display when a record is shared or linked in Slack channels, showing key record information like the record name, object type, and additional fields based on admin configuration ",
    "Record Search": "Allows users to search for and find Salesforce records directly within Slack.  By default, users can search across six standard Salesforce objects: Account, Case, Contact, Lead, Opportunity, and Task. (Custom objects may be configurable by a Salesforce System Administrator). ",
    "Record View & Edit": "Users can view and update Salesforce records directly within Slack without switching platforms. Users can edit records if they have the appropriate permissions in Salesforce - their Slack access mirrors their Salesforce permissions",
    "Related List Views": "Displays related Salesforce records (e.g., opportunities linked to an account) as tabs directly within Slack channels.", 
    "Connect multiple Salesforce orgs": "The ability to link more than one Salesforce organization to a single Slack workspace.",
    "Salesforce standalone List Views": "Allows users to access their personal Salesforce list views (e.g., 'My Opportunities') and edit data directly within Slack. Data is bi-directionally synced.",
    "Salesforce workflow automation (Event triggers)": "Automatically starts a Slack workflow when a specific event occurs in Salesforce (e.g. an Opportunity Stage changing). Workflows can combine both Slack and Salesforce actions and are fully compatible with custom objects and fields in Salesforce.",
    "Sales Home": "A single view to track and update your pipeline, performance, and sales alerts to stay on top of your (or your teams) deals.",
    "Multiple Workspaces": "Allows a company to create and centrally manage a network of interconnected workspaces.",
    "Native Device Management: Block Jailbroken Devices": "Automatically blocks access from jailbroken (iOS) or rooted (Android) devices to protect corporate data.",
    "Native Device Management: Block Copy / Paste (Mobile)": "Prevents data leakage by disabling file downloads and restricting copy/paste from managed apps to personal ones.",
    "Salesforce Channel AI Summary Tab": "Provides an AI-generated summary of conversations from both the current Salesforce channel and its related Salesforce channels.",
    "Salesforce workflow automation (Scheduled triggers)": "Allows you to create scheduled Slack notifications that can summarize specific records or out-of-date records in Salesforce.",
    "Catchup Summaries on Mobile": "Allows users to get AI-powered summaries of unread messages in their Slack catch-up cards",
    "AI Language Translations": "Allows users to translate messages into their language of choice, breaking down language barriers for global collaboration",
    "EMM (Enterprise Mobility Management)": "Integrates with a companies existing EMM to enforce mobile security policies like blocking access from unmanaged devices and requiring use of a managed EMM app.",
    "Guaranteed Uptime and Fast Customer Support": "See https://slack.com/terms/service-level-agreement for details.",
    "Conditional Workflows": "Create dynamic, responsive workflows that adapt to different situations. Use custom rules based on button selections, form answers, or other inputs to route information and automate complex processes without writing code.",
    "AI Admin analytics dashboard": "Admin analytics dashboard that helps customers who purchase Slack AI to understand adoption of Slack AI and overall usage and activity patterns (daily/weekly/monthly active users, feature adoption rates, etc.)",
    "AI Explain": "Allows users to get AI-generated explanations of complex messages, technical jargon, acronyms, or dense language in Slack.",
    "Canvas AI": "Canvas AI can create and edit content by drawing from conversations and files that users have access to in Slack, helping them turn Slack conversations into polished, structured documents in seconds.",
    "Salesforce workflow automation (send to Salesforce app step)": "Send automated, Salesforce-triggered messages directly to a user’s private Salesforce app in Slack. By moving notifications out of noisy public channels and into a personal workspace, you transition from a 'public broadcast' that gets ignored to a 'personal task' that drives immediate action.",
    "Message Limit": "Users can access Slackbot, but are limited to 15 messages per user per week. If they hit the limit, they have to wait until the next week to send more messages.",
    "Full Access: Unlimited Messages": "Users can send unlimited messages to Slackbot with no restrictions.",
    "Slack search (including canvases)": "Slackbot can search through all your Slack messages, files, and canvases to find relevant information when answering questions.",
    "Multiple searches at once": "Slackbot can run several parallel searches simultaneously to gather comprehensive information quickly rather than searching sequentially.",
    "Desktop & mobile parity": "Slackbot offers the same full functionality and experience across both desktop and mobile Slack apps.",
    "File uploads & calendar entity read": "Slackbot can read content from uploaded files (PDFs, images, documents) and access calendar event details (Google Calendar and Outlook) to provide context-aware answers.",
    "Create & update canvases": "Slackbot can generate new canvases or modify existing ones to organize information, create documentation, or save conversation summaries.",
    "3P entity read (GDrive, OneDrive, Box, etc)": "Slackbot can read and extract content from third-party files shared in Slack (like Google Docs, OneDrive documents, Box files) when you share a direct link with it.",
    "Enterprise search w/ 3P read only connectors (OneDrive, Box, GDrive)": "Slackbot can search across connected third-party Enterprise Search connectors to find information that lives outside Slack.",
    "Full-org kill switch": "Admins can instantly disable Slackbot for the entire organization if needed for security or compliance reasons.",
    "Custom group access": "Admins can control which specific user groups or individuals have access to Slackbot rather than enabling it org-wide.",
    "Full Data Export": "All Slackbot conversations (treated as DM conversations) can be included in Slack's full data export functionality for compliance and archival purposes.",
    "Filtered & single user export": "Enables data exports for specific users or filtered criteria rather than requiring a full organization export.",    
    "Slackbot DLP": "DLP policies can be applied to Slackbot. All user prompts are scanned before inference, blocked/tombstoned prompts generate user-visible explanations, and all DLP actions are tracked in the DLP Admin and Audit Log dashboards.",
    "EKM compatibility": "Slackbot works with EKM. Slackbot conversations are treated as DM conversations for EKM purposes and are encrypted with the customer key. All canvases created by Slackbot are owned by the user and encrypted with the customer key.",
    "Slackbot Audit logs": "Detailed audit logs track all Slackbot usage, including prompts, responses, what data was accessed, timestamps, user attribution, and metadata. Slackbot fully integrated with Audit Log API and Discovery API for security and compliance.",
    "Channel Expert Agent": "Channel Expert Agent is an AI-powered agent for Slack channels that helps answer frequently asked questions and provides instant, intelligent support directly within Slack channels. It's Slack's first out-of-the-box Agentforce agent designed specifically for help and FAQ-style Slack channels.",
    "Real-Time Search API": "If the customer is building an external app, this API lets external apps securely search Slack content on-demand without storing data outside of Slack.",
    "Exports (Salesforce Channels)": "All Salesforce channels can be included in Slack's full data export functionality for compliance and archival purposes.",
    "Slackbot Scheduled Automations": "Automated actions Slackbot can run on a recurring or one-time schedule. triggered by time, event-based tasks (i.e. when a reaction is added or a message is posted), or webhook triggers for external systems.",
    "Slackbot Skills": "User-defined AI playbooks that combine instructions and tools into a single command. Instead of giving Slackbot one-off prompts, you trigger a skill to have Slackbot execute a saved playbook.",
    "Slackbot Salesforce Search": "Allows Slackbot to search and retrieve data directly from Salesforce records. Instead of switching apps, you can query opportunities, accounts, or contacts using natural language and get the specific details surfaced immediately in your chat.",
    "Emails - search, draft, and send": "Search, draft, and send emails directly within Slack using your Gmail or Outlook account. Use Slackbot to summarize your inbox, generate drafts based on channel discussions, and send them instantly without switching apps.",
    "Restrict AI access to certain channels, canvases, and lists": "Allows admins to prevent Slack AI from accessing specific channels, canvases, or lists. Once restricted, the content in those locations is ignored by AI search, summaries, recaps, etc to ensure sensitive data remains private.",
    "Enterprise Search in Slackbot": "Allows Slackbot to pull answers from your entire company tech stack. Instead of searching just Slack, Slackbot queries connected apps like Google Drive, Salesforce, and GitHub to give you a single, unified answer based on all your company's data."


  },
  featurePainPoints: {
    "Slack AI": {
      it: "Difficulty accessing siloed information or 'tribal knowledge' buried in message history, hindering IT support and knowledge sharing.",
      engineering: "Engineers spend significant time searching for technical documentation, past incident discussions, or code snippets scattered across numerous channels, slowing down development and problem-solving.",
      sales:
        "Time wasted searching scattered channels/threads for deal updates, context, Q&A, or risk signals, hindering quick call prep, accurate forecasting, and effective coaching.",
      customer_support:
        "Difficulty getting context quickly for escalations, QBR prep, or handoffs due to time spent reading extensive message histories or siloed information.",
      operations:
        "Leaders struggle to stay informed on cross-functional initiatives or find specific decisions/context buried in numerous channels and threads.",
      marketing:
        "Difficulty coordinating cross-functional projects and aligning teams without scheduling excessive meetings due to information overload in threads.",
      hr: "New hires spend excessive time trying to find onboarding information, team context, or past decisions scattered across channels and documents.",
    },
    "Workflow Builder": {
      it: "Manual effort and time spent on repetitive IT tasks like user onboarding, app provisioning, and access requests.",
      engineering: "Repetitive engineering processes like creating a new dev environment, running tests, or deploying a build are done manually, introducing delays and potential for human error.",
      hr: "Manual, repetitive processes for employee onboarding, requests, or common HR tasks consume significant time and lack consistency.",
      sales:
        "Manual steps in sales processes (e.g., deal stage updates, follow-up reminders) reduce rep selling time and increase risk of errors or delays.",
      customer_support:
        "Manual processes for handoffs, tracking customer milestones, or routing escalations lead to delays, inconsistencies, and difficulty managing SLAs.",
      operations:
        "Repetitive operational tasks require manual effort, leading to delays and potential inconsistencies in cross-functional processes.",
      finance:
        "Manual processes for approvals (e.g., expense reports, purchase orders) are slow and lack easy tracking within the primary communication tool.",
    },
    "Canvas": {
      it: "Reliance on external document tools for shared knowledge creates information silos and adds tool complexity for IT documentation.",
      engineering: "Technical designs, project plans, and incident post-mortems are stored in various external docs, disconnected from the real-time conversations and code repositories where the work happens.",
      hr: "Employee handbooks, policies, and guides stored externally are hard to find and maintain, leading to outdated information.",
      marketing:
        "Campaign briefs, plans, and performance results are scattered across different documents, hindering team visibility and alignment.",
      sales:
        "Account plans, deal notes, and prep materials stored outside Slack are disconnected from real-time conversations and workflows.",
      customer_support:
        "Key customer information, runbooks, or project plans are stored externally, making it hard to access context directly within collaboration channels.",
      operations:
        "Project plans, team documentation, and meeting notes are fragmented across various tools, making cross-functional visibility difficult.",
    },
    "Custom Canvas Templates": {
      it: "Lack of standardized templates for IT documentation (e.g., incident reports, project briefs) leads to inconsistency and inefficiency.",
      engineering: "Inconsistent formats for technical specs, design docs, or incident reviews make it difficult to ensure quality, review efficiently, and onboard new engineers.",
      sales:
        "Inconsistent formats for deal reviews, QBR prep, or account planning make it hard to compare information and ensure thoroughness.",
      customer_support:
        "Lack of standardized templates for QBRs, implementation plans, or support processes leads to inconsistent customer experiences.",
      operations:
        "Lack of standardized formats for reporting and documentation (e.g., operational reviews, project updates) leads to inconsistent updates and difficulty tracking execution.",
      hr: "Inconsistent formats for onboarding plans, performance reviews, or policy documents create confusion and administrative overhead.",
    },
    "Slack Sales Templates": {
      sales:
        "Manual effort required to pull Salesforce data into account plans or deal reviews leads to errors and out-of-date information.",
    },
    "Clips": {
      it: "Misunderstandings arise from text-only updates for complex IT issues; scheduling sync meetings for simple explanations is inefficient.",
      engineering: "Explaining complex code, walking through a PR, or demoing a feature asynchronously is difficult with just text, often forcing a synchronous meeting for a simple walkthrough.",
      sales:
        "Coordinating time zones for quick demos or stakeholder updates is challenging; long text explanations lack personal touch.",
      hr: "Delivering training or policy updates requires scheduled sessions or long documents that are hard to digest asynchronously.",
      customer_support:
        "Explaining complex support steps or providing detailed async updates via text is time-consuming and prone to confusion.",
      operations:
        "Providing status updates or feedback asynchronously across teams often requires scheduling meetings or writing lengthy text messages.",
    },
    "Guests": {
      it: "Collaborating securely with external vendors, partners, or contractors requires provisioning full accounts or using less secure methods like email.",
      engineering: "Working with external contractors or open-source contributors on a project requires granting them broad access or relying on insecure communication channels outside of where the internal team collaborates.",
      marketing:
        "Working with external agencies or contractors on campaigns requires granting broad access or relying on inefficient email threads.",
      sales:
        "Communicating with prospects or external stakeholders during complex deal cycles often involves insecure or disjointed email chains.",
      customer_support:
        "Collaborating with customers or third-party partners on specific support issues or projects requires secure, focused communication channels.",
      operations:
        "Managing projects involving external partners necessitates secure and controlled access to relevant conversations and files.",
    },
    "Slack Connect (Shared Channels)": {
      it: "Collaboration with external organizations via email is slow, insecure, and lacks transparency, increasing IT overhead for communication governance.",
      engineering: "Coordinating with a 3rd party vendor on an API integration or a security audit over email is slow, and important technical details get lost in long threads.",
      sales:"Communicating and collaborating with external partners, prospects, or customers relies on slow, siloed email threads.",
      hr: "Coordinating with external recruiters, benefits providers, or consultants involves fragmented email communication.",
      marketing:
        "Managing campaigns with external agencies or partners through email leads to delays and lost context.",
      customer_support:
        "Resolving complex customer issues involving third parties requires cumbersome email forwarding and lacks a unified communication trail.",
      operations:
        "Cross-company projects suffer from communication delays and information silos when relying solely on email with external partners.",
    },
    "Sponsored Connections - Slack Connect": {
      it: "Inability to centrally manage and secure collaboration channels with partners or vendors who are using the free version of Slack.",
      sales: "Without sponsored connections, teams can't can't use Slack Connect channels with non-Slack partners and customers, forcing them to rely on email or fragmented tools.",
      engineering: "Cannot collaborate effectively with smaller open-source projects or individual contractors who use the free version of Slack, forcing communication into less secure or efficient channels.",
    },
    "Per-Org Customization - Slack Connect": {
      it: "Lack of granular control over Slack Connect settings on a per-partner basis limits ability to enforce specific security or data sharing policies.",
      engineering: "When working with multiple vendors, the inability to set specific data sharing or app usage rules for each connection increases the risk of accidental data leaks or policy violations.",
    },
    "Multi-Workspace Channels": {
      it: "Information sharing and collaboration between different internal departments or teams using separate workspaces requires manual cross-posting or disconnected communication.",
      engineering: "Engineering teams in different product groups but separate workspaces (e.g., platform vs. application) can't easily collaborate on shared libraries or cross-cutting initiatives.",
      sales:
        "Sales teams segmented by region or function lack visibility into relevant activities or discussions happening in other sales workspaces.",
      operations:
        "Cross-functional initiatives are hindered by communication silos when teams operate in separate workspaces.",
      customer_support:
        "Support and Success teams in different workspaces struggle to share context or collaborate effectively on customer issues spanning multiple areas.",
      marketing:
        "Marketing teams in different workspaces lack visibility into related campaigns or initiatives managed by other groups.",
    },
    "Channel Posting Permissions": {
      it: "Important announcements in key channels get lost in conversational noise, and controlling message flow relies on manual moderation.",
      engineering: "Critical deployment alerts or production incident updates in a channel get buried by questions and chatter, making it hard to track the source of truth.",
      hr: "Company-wide announcements or policy updates in general channels are easily missed or diluted by unrelated replies.",
      sales:"Without channel posting permissions, sales leaders can't restrict who posts—so update channels get cluttered fast, making it impossible to maintain a single source of truth for things like comp changes, product rollouts, or team goals.",
      marketing:
        "Campaign launch announcements or official communications get buried in channel chatter, reducing visibility.",
      operations:
        "Critical operational updates or incident communications require dedicated channels that can be difficult to keep focused without strict controls.",
    },
    "Message Activity": {
      it: "Lack of visibility into whether important IT announcements or security updates posted in Slack have been seen by relevant employees.",
      engineering: "Difficult to know if engineers have seen a critical update about a service outage or a required security patch, leading to uncertainty and follow-up.",
    },
    "Slack Mobile Catch Up": {
      it: "Employees miss important updates when catching up on mobile due to overwhelming unread messages, potentially impacting response times for IT requests.",
      engineering: "On-call engineers may miss critical alerts on mobile because they are mixed in with dozens of other unread messages from other channels.",
    },
    "Out of Office Responder": {
      hr: "Employees returning from leave face a backlog of messages, and colleagues lack visibility into absences, causing communication delays.",
      it: "Communication delays and frustration due to colleagues being unaware of a user's absence and not knowing when to expect a response.",
      engineering: "Code reviews get blocked and deployments are delayed because a required reviewer is on vacation, and the team was unaware of their absence.",
      sales: "Prospects and customers experience 'radio silence' during critical deal stages when a rep is away, leading to frustration and potential deal slippage because colleagues don't realize they need to step in.",
      operations: "Cross-functional project momentum stalls when key stakeholders go OOO without a visible notification, leaving teams to wait on decisions that could have been delegated."
    },
    "Lists": {
      it: "Tracking IT assets, project tasks, or compliance items within Slack relies on unstructured messages or external spreadsheets.",
      engineering: "Tracking bugs, feature requests from other teams, or action items from a post-mortem within Slack is chaotic and requires switching to an external project management tool.",
      sales:
        "Managing lists of target accounts, deal stages, or follow-up tasks within Slack is difficult without a structured format.",
      hr: "Tracking onboarding checklists, interview candidates, or employee directory information within Slack requires manual processes or external tools.",
      marketing:
        "Managing campaign tasks, event attendees, or content calendars within Slack lacks structure and clear ownership.",
      customer_support:
        "Tracking customer support tickets, feature requests, or account health metrics is cumbersome without a dedicated list format.",
      operations:
        "Managing project deliverables, inventory, or team tasks within Slack requires switching to external tools or using unstructured formats.",
    },
    "Slack Channel Templates": {
      it: "Setting up consistent channels for recurring IT processes (e.g., incident response, project kickoff) is manual and prone to variation.",
      engineering: "Creating new channels for every incident, with the right people, pinned runbooks, and integrations, is a manual, error-prone process that wastes time during a crisis.",
      hr: "Creating standard channels for new hire onboarding, team projects, or employee resource groups requires manual setup each time.",
      sales:
        "Setting up consistent channels for new deals, account teams, or regional collaboration requires repetitive manual effort.",
      operations:
        "Launching new projects or initiatives requires manually creating channels and setting up associated resources (workflows, canvases) repeatedly.",
    },
    "Granular Admin Roles": {
      it: "Granting broad administrative privileges increases security risk; lack of specific roles makes it hard to delegate routine admin tasks safely.",
      engineering: "Unable to safely delegate permissions to engineering leads to manage their team's user groups or specific channel settings without making them full admins.",
      operations:
        "Inability to delegate specific administrative tasks (e.g., channel management for a department) to non-IT staff securely.",
    },
    "Central Channel Dashboard": {
      it: "Managing channel lifecycle (creation, archiving, permissions) across numerous channels is cumbersome without a centralized view.",
      engineering: "Cleaning up old project channels, managing permissions for private code repositories channels, and ensuring consistent naming conventions is a manual and difficult task without a central dashboard.",
    },
    "Admin API": {
      it: "Manual execution of routine administrative tasks (user provisioning, workspace settings) is time-consuming and doesn't scale.",
      engineering: "Engineers struggle to build tools around Slack that help manage users, channels, and workspaces at scale across an organization because Slack's standard APIs lack the power to automate organization-level operations or programmatically enforce standards.",
    },
    "Analytics API (Members)": {
      it: "Difficulty programmatically analyzing user adoption, activity trends, or identifying inactive accounts across the organization."      },
    "Analytics API (Conversations)": {
      it: "Inability to programmatically analyze communication patterns, channel engagement, or information flow within Slack for optimization or governance."      },
    "App Analytics": {
      it: "Lack of visibility into which third-party apps are being used, by whom, and how frequently, making app governance and ROI assessment difficult.",
      engineering: "Difficult to assess the ROI and usage of expensive developer tools integrated into Slack (e.g., PagerDuty, Jira, GitHub) to justify costs or drive adoption.",
    },
    "Custom Retention Policies (Workspace)": {
      it: "Default message and file retention may not meet specific compliance or internal governance requirements for individual workspaces.",
      engineering: "Need to delete messages in ephemeral channels (e.g., for testing deployments) after a short period, but keep technical discussions in other channels indefinitely for knowledge retention.",
    },
    "Custom Retention Policies (Org-Wide)": {
      it: "Ensuring consistent data retention policies across all workspaces in a large organization is difficult to manage and enforce manually.",
      engineering: "Applying a consistent data retention policy across multiple engineering workspaces (e.g., dev, staging, prod) is a manual and error-prone task.",
    },
    "Lock Guest Names": {
      it: "External guests changing their display names can cause confusion and potential security risks (impersonation).",
      engineering: "Contractors changing their display names can cause confusion and make it difficult to manage permissions for private channels or code repositories.",
    },
    "Google OAuth 2.0": {
      it: "Managing separate Slack logins increases user friction and security risks compared to using existing Google Workspace credentials.",
    },
    "SAML SSO": {
      it: "Managing user access and passwords separately for Slack increases security overhead and risk compared to leveraging the central corporate identity provider (e.g., Okta, Azure AD).",
      engineering: "Engineers having separate credentials for Slack increases the risk of security breaches and adds friction to the login process, especially when access to sensitive channels is required.",
    },
    "Multi-SAML SSO": {
      it: "Organizations with multiple identity providers (e.g., due to M&A) face complexity managing separate Slack authentications for different user populations.",
    },
    "SCIM API Provisioning": {
      it: "Manually provisioning, updating, and de-provisioning user accounts in Slack based on changes in the identity provider (IDP) is slow, error-prone, and creates security gaps.",
      engineering: "When an engineer leaves the company, manually de-provisioning their access to dozens of private channels and integrations is slow and risks leaving security holes.",
    },
    "SCIM API Provisioning (Guest Provisioning)": {
      it: "Manually inviting and managing guest accounts at scale is inefficient and lacks synchronization with central identity systems.",
    },
    "Custom User Groups": {
      it: "Manually adding relevant users to channels or mentioning large teams is inefficient and prone to missing people.",
      sales: "Sales leaders struggle to ensure that every Account Executive is in the right regional, pod, or territory channel, leading to 'information gaps' where reps miss critical deal updates or competitive intel simply because they weren't manually added to a new channel."
    },
    "IDP Groups": {
      it: "Keeping Slack channel memberships and workspace access synchronized with dynamic groups defined in the corporate identity provider (IDP) requires manual effort.",
      sales: "Without IDP groups, new sales reps aren't auto-added to the right set of channels—so they waste time figuring out where to go for deal support, team updates, and onboarding, leading to missed info and slower ramp-up.",
    },
    "Session Duration - Desktop + Mobile": {
      it: "Users remaining logged into Slack indefinitely on shared or public computers poses a security risk.",
    },
    "Session Management": {
      it: "Inability to remotely log users out of Slack sessions on potentially compromised or lost devices creates a security vulnerability.",
      engineering: "If an engineer's laptop is lost or stolen, the inability to remotely log them out of Slack could expose private code, API keys, and other sensitive technical information.",
    },
    "Domain Claiming (create workspace)": {
      it: "Employees creating unauthorized Slack workspaces using corporate email addresses leads to data sprawl, security risks, and lack of IT oversight ('shadow IT').",
    },
    "MDM (Mobile Device Management)": {
      it: "Lack of control over Slack mobile app usage on corporate-managed devices increases risk of data leakage or non-compliance.",
    },
    "MAM (Mobile Application Management)": {
      it: "Inability to apply specific security policies directly to the Slack mobile app (independent of device management) limits data protection options.",
    },
    "Native Mobile Controls": {
      it: "Implementing mobile security controls for Slack requires configuring and managing third-party MDM/MAM solutions, adding complexity.",
    },
    "EKM (Enterprise Key Management)": {
      it: "Organizations with stringent compliance requirements cannot meet obligations if they don't directly control the encryption keys for their Slack data.",
      engineering: "Cannot meet strict regulatory or customer requirements to control the encryption keys for data that includes sensitive source code or infrastructure details shared in Slack.",
    },
    "Block File Downloads (Desktop + Mobile)": {
      it: "Sensitive information shared in Slack can be easily exfiltrated via file downloads or copying text on desktop clients without specific controls.",
      engineering: "Sensitive information like API keys, code snippets, or internal documentation can be easily downloaded or copied, increasing the risk of data exfiltration.",
    },
    "Legal Holds": {
      it: "Meeting legal obligations to preserve specific user data for litigation or investigations is difficult if data can be deleted by retention policies or users.",
      engineering: "In the event of an intellectual property dispute, it is difficult to preserve all relevant conversations from engineers about a specific project if they can be deleted.",
    },
    "Information Barriers": {
      it: "Risk of regulatory non-compliance or conflicts of interest if specific groups of users (e.g., finance and sales during sensitive periods) can freely communicate via DMs.",
      engineering: "During a sensitive project with an ethical wall, preventing communication between the project team and the rest of the engineering org is critical but difficult to enforce.",
    },
    "DLP (Data Loss Prevention)": {
      it: "Sensitive data (like PII, financial info, secrets) accidentally or intentionally shared in Slack may go undetected, leading to data breaches or compliance violations.",
      engineering: "An engineer accidentally pasting an AWS secret key or a blob of customer PII into a public channel could go undetected, leading to a major security incident.",
    },
    "Native DLP": {
      it: "Lack of basic controls to detect and prevent sensitive data sharing in Slack Connect channels without implementing a full third-party DLP solution.",
      engineering: "No native way to prevent engineers from accidentally sharing internal source code or other IP in a Slack Connect channel with an external partner.",
    },
    "Audit Logs API": {
      it: "Difficulty integrating Slack user activity logs with external SIEM or security monitoring tools for proactive threat detection and compliance reporting.",
      engineering: "Inability to feed Slack audit logs into a SIEM makes it difficult to correlate suspicious activity (e.g., a user added to a sensitive channel) with other security events.",
    },
    "Audit Logs (Native Dashboard)": {
      it: "Investigating security incidents or policy violations requires exporting and manually searching logs, delaying response times.",
      engineering: "When investigating who added a guest to a private channel or changed channel permissions, manually searching through logs is slow and inefficient.",
    },
    "Discovery/DLP API": {
      it: "Inability for eDiscovery or third-party DLP tools to access and scan Slack messages and files hinders compliance and data security efforts.",
      engineering: "Security teams cannot use their existing DLP tools to scan for sensitive code or secrets inside Slack, creating a significant blind spot.",
    },
    "Exports (Public Data)": {
      it: "Meeting basic compliance or archival needs requiring export of public channel data is not possible on lower tiers.",
    },
    "Exports (Full Data)": {
      it: "Inability to export complete Slack history (including private channels, DMs) prevents meeting stringent regulatory or legal data preservation requirements.",
      engineering: "Unable to create a full backup or archive of all engineering discussions, including private channels and DMs, for compliance or knowledge management purposes.",
    },
    "Exports (Single User Exports)": {
      it: "Responding to Subject Access Requests (SARs) or internal investigations requiring data export for a specific user is difficult or impossible.",
    },
    "Custom Terms of Service": {
      it: "Ensuring users agree to specific corporate policies or compliance terms before accessing Slack is not enforceable through the platform.",
    },
    "Approve Workspaces": {
      it: "Users on managed networks might access unapproved or personal Slack workspaces, bypassing corporate security and governance controls.",
    },
    "Data Residency (IDR)": {
      it: "Cannot meet specific data sovereignty requirements if Slack data is not stored in a designated geographic region.",
    },
    "Customer Support Tier": {
      it: "Standard support response times may not be sufficient for resolving critical Slack issues impacting business operations.",
    },
    "Integrations": {
      it: "Inefficiencies and potential data inconsistencies due to lack of interoperability between critical business systems (e.g., ticketing, monitoring, code repos) and the collaboration platform.",
      engineering: "Engineers waste time switching contexts between Slack, Jira, GitHub, and CI/CD tools; notifications are scattered, and actions like updating a ticket or re-running a build require leaving the conversation.",
      sales:
        "Reps waste time context-switching and manually updating systems (CRM, etc.); critical information remains siloed across different platforms (SFDC, Drive, GitHub), hindering quick access and data hygiene.",
      hr: "HR systems (HRIS, ATS, etc.) are disconnected from Slack, requiring manual data entry and hindering streamlined workflows for onboarding or employee support.",
      marketing:
        "Marketing tools (automation, analytics, project management) operate separately from Slack, creating information silos and workflow friction.",
      customer_support:
        "Support ticketing systems, knowledge bases, and CRM are disconnected from Slack, requiring agents to constantly switch tools and manually copy information.",
      operations:
        "Core operational systems (project management, ERP, logistics) are not integrated with Slack, leading to communication delays and manual status updates.",
    },
    "Multiple Workspaces": {
      it: "Difficulty managing security, compliance, information silos, and potential sprawl across multiple, disconnected Slack workspaces within the organization.",
      engineering: "Managing different Slack workspaces for development, production, and corporate creates information silos and makes cross-workspace collaboration on incidents difficult.",
      sales: "Enterprise sales teams lack a professional, white-labeled environment for high-touch prospects; without a dedicated customer workspace, collaborating with external stakeholders feels 'cluttered' alongside internal channels and risks the accidental sharing of sensitive internal intel."

    },
    "Thread & Channel Summaries": {
      it: "On-call engineers joining a critical incident mid-stream waste valuable time reading the entire channel history to get context.",
      engineering: "On-call engineers joining a critical incident mid-stream waste valuable time reading the entire channel history to get context.",
      marketing: "Team members miss key decisions on a campaign launch because catching up on noisy channels takes too long.",
      sales:"Reps returning from PTO have to manually read through long deal channel histories, delaying their ability to re-engage with customers.",
      customer_support: "When a support case is escalated, the next agent has to read the entire internal discussion, which delays customer response time.",
      operations:"Extracting key decisions and blockers from project channels for a weekly status report is a manual and time-consuming process."
    },
    "File Summaries": {
      it: "Reviewing lengthy vendor security documentation or compliance reports to find specific clauses is a tedious, manual process.",
      engineering: "Parsing long log files or technical documentation to find the root cause of a bug is a manual and time-consuming process.",
      marketing: "Getting the key takeaways from creative briefs or lengthy market research reports takes too much time away from creative work.",
      sales:"Reviewing dense RFPs or legal contracts consumes significant time that could be spent actively selling.",
      customer_support: "Understanding a customer's issue from a long, attached log file or technical document requires significant time to parse.",
      operations:"Extracting key data points from project plans or SOWs shared as PDFs is manual and error-prone."
    },
    "Recaps": {
      it: "Critical system alerts or security update notifications get lost in the noise of everyday channel traffic, delaying response to important issues.",
      engineering: "Important code review requests or deployment updates get buried in busy channels, delaying the development lifecycle.",
      marketing: "Keeping track of feedback and approvals across multiple campaign channels is difficult, leading to missed deadlines.",
      sales:"Important updates on active deals get buried in busy channels, leading to missed follow-ups or reps acting on outdated information.",
      customer_support: "Managers struggle to keep a pulse on urgent tickets and escalations happening across the team without manually checking every channel.",
      operations:"Team members find it hard to prioritize which of their 50+ unread messages across various project channels need immediate attention."
    },
    "Huddles Notes": {
      it: "Key decisions from impromptu incident response or troubleshooting huddles are often not documented, leading to confusion later.",
      engineering: "Key decisions and action items from impromptu troubleshooting huddles are not documented, leading to confusion and repeated work.",
      marketing: "Creative brainstorming sessions over huddles result in great ideas that are lost because no one was assigned to take detailed notes.",
      sales:"Action items from internal deal strategy calls are often forgotten or not documented, leading to dropped balls.",
      customer_support: "Knowledge shared during a quick huddle between a senior and junior agent to solve a customer issue isn't captured for future training.",
      operations:"Spontaneous project check-ins via huddles lead to verbal agreements on next steps that are never formally tracked, causing misalignment."
    },
    "Slack AI Search": {
      it: "Finding the solution to a past incident is difficult unless you know the exact error code or keywords used in the original conversation.",
      engineering: "Finding the root cause of a past incident or the rationale for a technical decision is difficult unless you know the exact keywords to search for.",
      marketing: "Locating the final approved version of a creative asset or the context behind a past decision is nearly impossible without remembering who said what and in which channel.",
      sales:"Finding specific customer feedback or competitive intel is difficult and time-consuming, relying on knowing the exact keywords to search for.",
      customer_support: "Locating a past conversation where a similar customer issue was solved requires scrolling through endless channels or guessing at search terms.",
      operations:"Finding the rationale behind a past project decision requires tracking down the original participants, as a simple keyword search doesn't understand the context."
    },
    "Enterprise Search": {
      it: "Troubleshooting an issue requires searching for error logs in one system, ticket history in another, and developer conversations in Slack, wasting valuable time.",
      engineering: "Troubleshooting an issue requires searching for error logs in one system, ticket history in another, and developer conversations in Slack, wasting valuable time.",
      marketing: "Campaign assets, performance data, and team discussions are stored in different places, making a holistic review difficult and time-consuming.",
      sales:"Information about a single customer is scattered across the CRM, support desk, and cloud storage, forcing reps to search in many different places.",
      customer_support: "Resolving a ticket requires looking up customer details in Salesforce, ticket history in Zendesk, and internal discussions in Slack separately.",
      operations:"Creating a project status report means manually pulling documents from SharePoint, task updates from Asana, and team discussions from Slack."
    },
    "3rd Party Agent Apps": {
      engineering: "Without access to third-party AI assistants, engineers have to build or manage internal bots manually—slowing down adoption of helpful AI tools and creating friction when teams want to experiment with new assistants for support, ticketing, or workflow augmentation.",
      sales: "Sales teams often need specialized tools (like Gong, Clari, or custom research agents) to qualify leads, but switching between multiple browser tabs and Slack causes them to miss critical real-time signals.",
      customer_support: "Support agents often need specialized tools (like Zendesk, Jira, or custom support agents) to resolve complex issues, but switching between multiple browser tabs and Slack causes them to miss critical real-time signals.",
      marketing: "Marketing teams struggle to keep up with campaign performance data across multiple platforms; having specialized agents in Slack would allow them to query data without leaving their collaboration hub."
      },
    "AI Workflow Builder": {
      it: "Simple automation requests from other departments get backlogged because they require an IT developer to build them in a complex tool.",
      engineering: "Can't easily create workflows from natural language instructions",
      marketing: "Creating a workflow to manage creative approvals is too complicated for most marketers, so the process remains a manual series of DMs and channel posts.",
      sales:"Building automations to handle repetitive sales tasks, like creating follow-up reminders, is often too complex and requires technical resources.",
      customer_support: "Automating the process of creating a follow-up ticket after a customer call requires technical skills that support agents don't have.",
      operations:"Team leads who want to automate simple processes, like a weekly project update request, can't do so without help from a technical team."
    },
    "AI Steps in Workflow Builder": {
      engineering: "Engineers might want to automatically summarize bug threads, incident chatter, or release updates from public channels as part of a Slack workflow—but can't without Slack AI being a step in workflow builder.",
      sales: "Sales leaders and AEs lose visibility into deal progress because manually writing 'recap' messages after every meeting or milestone is a chore that reps often skip to stay focused on selling.",
      it: "IT teams struggle to keep stakeholders informed on long-running technical projects because providing regular, manual status summaries is time-consuming and often falls to the bottom of the priority list.",
      customer_support: "Escalating complex issues to engineering is delayed because support agents have to manually synthesize hours of troubleshooting chatter into a concise summary for the technical team.",
      operations: "Cross-functional projects suffer from 'information debt' where new stakeholders joining a project can't quickly get a high-level summary of the work completed to date."

    },
    "Salesforce Channels": {
      marketing: "Marketing provides support for major deals, but lacks a single place to coordinate with the sales team on account-specific messaging and assets.",
      sales:"Conversations, files, and decisions about a single deal are scattered across multiple DMs and channels, making it easy for things to get lost.",
      customer_support: "When a major customer logs a support ticket, there's no easy way for the support team to loop in the sales team for context on the open deal.",
    },
    "Connect multiple Salesforce orgs": {
      it: "Supporting a company with multiple Salesforce orgs requires building and maintaining separate, costly, and complex integrations for each one.",
      marketing: "A global marketing team can't get a unified view of campaigns because customer data is siloed in separate regional Salesforce instances.",
      sales:"After a merger, sales reps can't easily see or collaborate on customer accounts that exist in the other Salesforce org, leading to missed opportunities.",
      customer_support: "A global support team has to log in to different Salesforce orgs to get a full picture of a customer's history, delaying support.",
      operations:"Consolidating reporting is a massive manual effort because data has to be exported and combined from multiple, separate Salesforce orgs."
    },
    "Salesforce standalone List Views": {
      it: "Building custom integrations or dashboards to display Salesforce data in other tools is a common request from the sales team that consumes developer resources.",
      marketing: "The marketing team has no easy, real-time way to track the status of marketing-qualified leads (MQLs) once they are assigned to sales reps.",
      sales:"To manage their pipeline, reps must constantly switch between Slack where they communicate and Salesforce where their data lives, breaking their workflow.",
      customer_support: "Support reps who need to see a list of their assigned high-priority tickets have to leave Slack and log into Salesforce, adding friction to their day.",
      operations:"Getting sales reps to keep their pipeline data up-to-date in Salesforce is a constant challenge because it requires them to work outside of their primary tool."
    },
    "Sales Home": {
      marketing: "Marketing creates dashboards to track MQL-to-SQL conversion, but sales reps rarely look at them because they live outside their daily workflow.",
      sales:"Reps have to jump between Salesforce reports and various Slack channels to get a full picture of their pipeline health and daily priorities.",
      customer_support: "There's no single place for a support manager to see a combined view of their team's case load from Salesforce alongside related internal conversations.",
      operations:"Sales leadership struggles to give reps a single source of truth for their performance, leading to reps working out of spreadsheets and out-of-date reports."
    },
    "Atlas": {
      it: "Lack of rich user profiles and org chart visibility within Slack makes it hard for employees to understand roles, reporting structures, and find the right contacts.",
      hr: "Difficult for employees (especially new hires) to navigate the organization, find colleagues by expertise or department, and understand team structures within Slack.",
      marketing: "Planning a cross-functional campaign is slowed down by the difficulty of identifying the right stakeholders and decision-makers in other departments.",
      sales:"When trying to get a complex deal approved, sales reps waste time asking around to identify the right approvers in finance or legal.",
      customer_support: "When escalating a complex issue, support agents struggle to quickly identify the right subject matter expert or engineer in another department, delaying resolution.",
      operations:"Maintaining and distributing an up-to-date organizational chart is a manual process, resulting in outdated documents and confusion about reporting structures."
    },
    "Salesforce workflow automation (Event triggers)": {
      it: "Requests for custom notifications from Salesforce to other systems often require complex, point-to-point integrations that are brittle and hard to maintain.",
      marketing: "The handoff of a new lead from marketing to sales is a manual process, often leading to delays before the first sales contact is made.",
      sales:"When a deal closes, the rep has to manually notify finance, legal, and onboarding, which is repetitive and can delay kicking off the post-sale process.",
      customer_support: "When a high-priority case is logged for a key account, there is no automatic way to alert the account's sales rep, leading to a blind-sided response.",
      operations:"Key business processes that span multiple departments, like deal desk approval, are slowed down by manual handoffs between systems."
    },
    "EMM (Enterprise Mobility Management)": {
      it: "Without EMM, IT can't prevent employees from accessing Slack on personal or jailbroken devices—making it easy for sensitive company data to be downloaded, screen-captured, or shared outside managed environments, increasing the risk of data leaks, compliance violations, and insider threats."
    },
    "Catchup Summaries on Mobile": {
      it: "When an on-call engineer is paged for a major incident, they lose critical minutes manually scrolling through alerts and chat history to understand the problem, directly increasing the system's downtime (MTTR).",
      sales: "Account Executives arriving at a client site often go in 'blind' because they didn't have time to scroll through 50+ messages on their phone to see the latest internal pivot or risk signal.",
      operations: "Decision-making is delayed when leaders traveling or in meetings can't quickly get the 'gist' of a conversation, forcing teams to wait hours for an approval or a simple 'yes/no'.",
      engineering: "On-call engineers are often overwhelmed by a flood of incident alerts and discussion threads on mobile; without a quick summary, they struggle to distinguish between a 'false alarm' and a critical system failure while away from their desks."
    },
    "AI Language Translations": {
      it: "The IT department's collective knowledge becomes siloed by geography; valuable documentation and internal expertise from one region are inaccessible to teams in another, forcing engineers to constantly reinvent the wheel and solve the same problems repeatedly.",
      sales: "Global sales teams struggle to collaborate on multinational deals when internal communication or customer feedback is shared in a language they don't speak fluently.",
      customer_support: "Providing consistent support to a global customer base is difficult when regional experts can't easily understand or contribute to tickets in different languages.",
      hr: "Communicating company-wide policy changes to a global workforce is prone to misunderstanding without instant, accurate translation of channel discussions.",
      engineering: "Global engineering teams lose speed and accuracy when technical documentation, PR comments, or incident updates are shared in a colleague's native language, leading to 'lost-in-translation' bugs or deployment errors.",
    },
    "Conditional Workflows": {
      it: "Manual, rigid workflows for IT requests (e.g., access grants, hardware requests) lack the flexibility to handle variations, leading to delays and manual intervention.",
      engineering: "Automated CI/CD or incident response workflows are too rigid and cannot dynamically adapt based on the type of change, severity of the incident, or user input, requiring manual overrides.",
      sales: "Sales approval processes (e.g., for discounts) are manual or follow a single rigid path, causing delays when exceptions or different routing rules are needed.",
      customer_support: "Ticket routing is static, sending all issues through the same path regardless of priority, region, or product area, leading to inefficient assignments and slower response times.",
      operations: "Business processes automated in Slack are not intelligent enough to adapt to different inputs, requiring people to manually manage exceptions and complex routing logic.",
      hr: "Workflows for employee requests (e.g., leave, HR questions) are linear and cannot be dynamically routed based on department, seniority, or request type, creating administrative bottlenecks."
    },
    "AI Admin analytics dashboard": {
      it: "Customers who purchase Slack AI are not able to understand adoption of Slack AI and overall usage and activity patterns (daily/weekly/monthly active users, feature adoption rates, etc.)",
      operations: "Without data on usage patterns, operations leaders can't determine which automated workflows are actually saving the most time across the organization."
    },
    "AI Explain": {
      it: "IT teams struggle to quickly understand and troubleshoot complex technical discussions, code snippets, or system alerts shared in channels, requiring time-consuming context switching to research unfamiliar terms or processes.",
      engineering: "Engineers waste time deciphering dense technical conversations, error logs, or architectural discussions from other teams, especially when joining mid-conversation or dealing with unfamiliar systems or frameworks.",
      sales: "Sales reps lose momentum when they encounter technical product discussions, competitor analyses, or industry jargon they don't understand, preventing them from effectively contributing to or learning from strategic conversations.",
      customer_support: "Support agents struggle to quickly understand complex customer issues, technical error messages, or escalated conversations from engineering, leading to delays in providing accurate responses or routing tickets appropriately.",
      operations: "Operations teams need immediate clarity on cross-functional discussions involving unfamiliar processes, business metrics, or technical implementations to make informed decisions without lengthy research or meetings.",
      hr: "HR professionals have difficulty understanding technical team discussions, industry-specific terminology, or complex project updates when making workforce planning decisions or addressing employee concerns about technical projects."
},
  "Canvas AI": {
    it: "IT teams manually create and update technical documentation, runbooks, and project specs in static formats that quickly become outdated, requiring hours of reformatting and reorganization when requirements change or new information emerges.",
    engineering: "Engineers spend excessive time writing design docs, technical specs, and project proposals from scratch, struggling to structure complex technical concepts clearly while ensuring all stakeholders can understand the content regardless of their technical background.",
    sales: "Sales teams manually compile prospect research, competitive battlecards, and proposal content by copying information from multiple sources, lacking an intelligent way to synthesize data into compelling, personalized presentations that address specific customer pain points.",
    customer_support: "Support teams create knowledge base articles, troubleshooting guides, and escalation documentation manually, struggling to maintain consistent formatting and ensure complex technical solutions are explained clearly for both agents and customers.",
    operations: "Operations teams spend hours creating process documentation, meeting summaries, and strategic planning documents by manually organizing scattered information from various conversations and sources into coherent, actionable formats.",
    hr: "HR professionals manually draft policy documents, onboarding materials, and performance review summaries, struggling to synthesize feedback from multiple stakeholders into well-structured, comprehensive documents that address diverse employee needs and scenarios."
},
"Salesforce workflow automation (send to Salesforce app step)": {
    sales: "Sales reps struggle to keep up with 'CRM hygiene' and administrative follow-ups across dozens of active deals, leading to missed milestones like expiring contracts, stale close dates, or incomplete discovery data. Because these reminders are often buried in emails or generic channels, reps lose track of critical deal-progression tasks that directly impact their ability to hit quota.",
    marketing: "Marketing teams often see high-quality leads 'die on the vine' because handoff notifications get buried in crowded Slack channels or ignored email inboxes. Without a direct, private nudge, the window for a timely follow-up closes before the rep even realizes a lead is ready.",
    customer_support: "Account managers and CSMs often lack real-time visibility into critical account health changes, such as a sudden drop in usage or a high-priority ticket. Without personalized alerts, they remain reactive rather than proactive, often discovering account risks only during scheduled reviews.",
    operations: "Sales Ops teams spend hours manually auditing pipelines and 'nagging' reps to fix data gaps to ensure forecast accuracy. They struggle with 'dirty data' because there is no automated, low-friction way to prompt reps for specific, missing information at the exact moment it's needed.",
    it: "Salesforce Admins and IT teams are constantly tasked with building complex custom notifications that often fail to reach the right person at the right time. They face a backlog of requests for 'better visibility' but lack a simple way to deliver actionable, private alerts that don't require users to leave their primary communication tool."
},
"Salesforce Channel AI Summary Tab": {
    sales: "Account Executives managing complex enterprise deals often lose track of critical conversations happening across multiple opportunity, product, and escalation channels. They waste 30+ minutes each morning manually catching up across 5-10 related channels to prepare for executive calls, often missing key objections or blockers that were surfaced in parallel threads, directly impacting their ability to address concerns and close deals on time. Sales leaders and account executives joining a mature deal channel also struggle to catch up on weeks of cross-functional history, leading to redundant questions and delayed decision-making.",
    operations: "Managers overseeing multiple regional sales channels find it impossible to stay informed on every deal's progress without spending hours reading through thousands of messages.",
    customer_support: "Support managers and escalation teams handling high-touch accounts lose valuable context when customer issues span multiple channels—primary account channel, case-specific threads, engineering escalation channels. Also, CSMs inheriting accounts or jumping into renewal conversations are completely blind to months of context spread across account channels, QBR channels, and product adoption discussions. They spend their first few weeks playing 'catch-up archaeology' instead of driving value, risking churn during critical transition periods because they can't quickly understand account history and sentiment. When a high-priority account has multiple active support cases across different channels, it's difficult for leadership to get a synthesized view of the overall account health."
  },
"Real-Time Search API": {
  engineering: "Developers must build and maintain costly custom search infrastructure or rely on stale indexed data, slowing down AI agent and app development with inaccurate or outdated results.",
  sales: "AI-powered sales tools lack real-time access to the latest deal context, customer conversations, and pipeline updates living in Slack, leading to incomplete insights and missed signals.",
  customer_support: "Third-party support platforms and AI agents can't surface the most current case context, escalation threads, or resolution history from Slack, resulting in slower response times and poor customer experiences.",
  operations: "Automated workflows and third-party AI tools are unable to query live Slack data for real-time status updates or cross-functional decisions, forcing manual lookups and creating bottlenecks.",
}, 
"3P entity read (GDrive, OneDrive, Box, etc)": {
    it: "Information remains siloed in cloud storage tools, forcing IT to manage fragmented knowledge bases that are difficult for employees to search globally.",
    engineering: "Technical specs and architecture diagrams in cloud drives are disconnected from daily chat, leading to outdated implementations.",
    sales: "Critical deal documents (contracts, pitch decks) live in separate folders, making it hard to find the latest versions during active negotiations.",
    marketing: "Brand guidelines and campaign assets are buried in deep folder structures, causing delays in asset retrieval for cross-functional launches.",
    finance: "Audit trails and expense policies are buried in cloud docs, leading to non-compliance because employees find it too hard to locate the correct procedures."
  },
  "Create & update canvases": {
    engineering: "Post-mortem summaries and incident timelines are tedious to compile manually from hundreds of thread messages, delaying the learning process.",
    operations: "Meeting notes and action items are often lost in the scroll of a channel, leading to poor follow-through on cross-functional initiatives.",
    customer_support: "Handoffs between support shifts are disorganized, as reps have to manually summarize complex ticket histories for the next person.",
    sales: "Account plans and deal room summaries are static or non-existent because reps don't have the time to manually synthesize channel noise into a structured document.",
    marketing: "Creative briefs get lost in long threads, leading to 'brief creep' and misalignment between stakeholders and the production team.",
    finance: "Monthly close checklists or budget review notes are buried in messages, making it hard to track status and ownership across the team."
  },
  "Custom group access": {
    it: "Inability to roll out AI tools selectively to vetted teams creates security concerns and prevents a controlled pilot phase.",
    operations: "Lack of granular control over tool access leads to unpredictable costs and potential misuse by departments that don't require the feature."
  },
  "Desktop & mobile parity": {
    sales: "Field reps on the go lose access to powerful automation tools when switching to mobile, hindering their ability to update deals between meetings.",
    operations: "On-site managers can't trigger the same workflows or access the same summaries as the office-based team, creating information gaps.",
    it: "Support for mobile users becomes difficult when the feature set is 'lite,' leading to increased tickets from frustrated remote employees.",
    customer_support: "On-call support leads can't properly manage escalations from their phone if they lack the full search and summary features available on desktop."
  },
  "EKM compatibility": {
    it: "Organizations with strict data sovereignty requirements cannot use AI features without the ability to manage their own encryption keys.",
    finance: "Regulated industries face compliance roadblocks when AI-generated content isn't covered by the same security standard as standard messages."
  },
  "Emails - search, draft, and send": {
    sales: "Constant context switching between Slack and email clients causes reps to lose focus and miss critical follow-up windows with prospects.",
    customer_support: "Communicating with external vendors who aren't in Slack requires leaving the collaboration environment, breaking the flow of work.",
    hr: "Drafting repetitive recruiting emails is time-consuming when you can't leverage the context of internal channel discussions.",
    marketing: "Coordinating with external agencies over email is disjointed; teams struggle to keep the internal Slack strategy aligned with the external email execution.",
    engineering: "Technical leads lose focus when they have to leave Slack to hunt through their inbox for a specific vendor's API documentation or to draft a technical update for an external partner, breaking their deep-work state."
  },
  "Enterprise search w/ 3P read only connectors (OneDrive, Box, GDrive)": {
    it: "Employees struggle with 'information sprawl,' leading to increased support tickets asking where specific resources are located.",
    sales: "Reps lose momentum in deals because they have to jump between multiple tabs to find a contract in Box and a lead in Salesforce.",
    engineering: "Searching for technical context is inefficient when bug reports are in Jira, docs are in GDrive, and the fix was discussed in Slack.",
    marketing: "Creative teams waste time searching across three different storage platforms just to find the latest version of a high-res asset.",
    finance: "Finance leads struggle to pull together a full picture of a vendor's history when contracts, invoices, and discussions are scattered across different apps."
  },
  "File uploads & calendar entity read": {
    sales: "Reps spend too much time manually checking calendars or digging through PDFs for specific contract terms instead of selling.",
    it: "Answering basic 'how-to' questions often requires IT to manually read through lengthy PDF manuals for employees.",
    hr: "Employees constantly ping HR for details found in PDF benefit guides because they cannot easily query the document for a specific answer.",
    customer_support: "Support agents waste time manually reading technical manuals or customer-provided PDFs to find a single troubleshooting step.",
    engineering: "Engineers waste time manually cross-referencing their sprint calendars and architecture PDFs just to answer basic questions about project timelines or system specs that the AI could answer instantly with the right context."
  },
  "Filtered & single user export": {
    it: "Legal discovery or internal investigations require massive, resource-heavy exports of the entire organization just to find data on one individual.",
    hr: "Handling sensitive personnel issues or compliance audits is difficult when data cannot be surgically exported for specific users."
  },
  "Full Access: Unlimited Messages": {
    it: "Artificial usage caps on productivity tools frustrate power users and lead to 'shadow AI' where employees use unapproved personal tools to get work done.",
    engineering: "Engineers working on complex problems hit message limits during critical troubleshooting sessions, halting their progress.",
    sales: "High-volume sales teams hit limits during peak end-of-quarter deal cycles, forcing them back into manual, slow-moving workflows.",
    customer_support: "Support agents dealing with high ticket volumes are penalized by caps, slowing down their ability to resolve customer issues at scale."
  },
  "Full Data Export": {
    it: "Compliance gaps occur when AI-driven conversations are excluded from the primary archival and data retention workflows.",
    finance: "During audits, it is difficult to reconstruct the full context of a decision if Slackbot DMs are siloed from the rest of the export data.",
    legal: "Corporate counsel cannot guarantee a full 'chain of custody' for evidence during litigation if AI interactions aren't included in global exports."
  },
  "Full-org kill switch": {
    it: "IT lacks the 'emergency brake' needed to instantly stop AI usage across the company if a security vulnerability or compliance issue is identified.",
    operations: "Risk management is difficult without a centralized way to immediately disable features org-wide during an active security incident."
  },
  "Message Limit": {
    it: "Low message caps prevent employees from actually integrating AI into their daily habits, resulting in low ROI on the software investment.",
    sales: "Reps who hit their limit mid-week are forced to return to manual data entry, slowing down their sales cycle."
  },
  "Multiple searches at once": {
    engineering: "Sequential searching for technical dependencies across various platforms is too slow during a production outage.",
    operations: "Leaders need to pull context from multiple cross-functional projects simultaneously; slow, one-by-one searching hinders rapid decision-making.",
    sales: "Prepping for a call requires pulling info from Salesforce, GDrive, and Slack; doing this one-by-one makes call prep a 20-minute chore instead of a 2-minute check."
  },
  "Slack search (including canvases)": {
    it: "Valuable troubleshooting data in canvases is often 'dark data' that isn't searchable, leading to duplicated efforts across the IT team.",
    engineering: "Critical architectural decisions made in a canvas are lost if they don't appear in standard global search results.",
    sales: "Important deal notes or account strategy stored in a canvas are useless if they don't surface when a rep searches for that account name.",
    marketing: "Campaign briefs stored in canvases are hard to find, leading to teams accidentally working off outdated versions of a strategy."
  },
  "Slackbot Audit logs": {
    it: "IT cannot monitor for potential data misuse or 'prompt injection' attempts without a detailed, attributable record of all AI interactions.",
    finance: "Compliance officers cannot verify that AI usage meets internal governance standards without timestamps and user attribution data."
  },
  "Slackbot DLP": {
    it: "The risk of employees inadvertently sharing PII or trade secrets with an AI model prevents the organization from adopting modern productivity tools.",
    hr: "Sensitive employee data could be entered into prompts, creating a privacy liability if it isn't automatically scanned and blocked."
  },
  "Slackbot Scheduled Automations": {
    operations: "Manual tracking of recurring project updates is inconsistent; teams need event-based triggers to ensure data flows without human intervention.",
    it: "System status checks and maintenance reminders are manually posted, taking time away from more complex infrastructure tasks.",
    sales: "Weekly pipeline roll-ups or 'stale deal' alerts are handled manually, leading to poor data hygiene and inaccurate end-of-month reporting.",
    marketing: "Campaign launch countdowns or recurring creative reviews require manual pings, which are easily forgotten during busy launch weeks.",
    engineering: "DevOps teams struggle with 'alert fatigue' and manual routine tasks; they need event-based triggers (like a specific emoji reaction) to automatically spin up incident channels, archive stale dev environments, or post recurring system health checks."
  },
  "Slackbot Skills": {
    engineering: "Engineers have to repeatedly type complex instructions for recurring tasks like 'summarize this incident' instead of using a one-click playbook.",
    hr: "Standardized processes like 'Onboard new hire' are executed inconsistently when they rely on manual prompts rather than a saved skill.",
    sales: "Reps waste time writing the same prompts for 'prepare me for this meeting' or 'summarize this thread for the CRM' every day.",
    customer_support: "Agents have to remember specific instructions for 'format this for Jira' or 'summarize for shift handoff' instead of clicking a single skill."
  },
  "Channel Expert Agent": {
    sales: "Sales reps spend hours waiting for responses in 'Ask-Product' or 'Ask-Legal' channels to get quick answers on technical specs or contract terms, causing deal momentum to stall while they wait for a human expert to become available.",
    it: "IT help desk staff are bogged down by 'how-to' questions that are already answered in pinned posts or documentation, leading to longer resolution times for critical issues.",
    customer_support: "High-volume 'help' channels are flooded with repetitive questions, causing support staff to burn out on basic queries instead of handling complex escalations.",
    hr: "HR teams spend excessive time answering the same questions about benefits, payroll, and holidays, especially during peak periods like open enrollment.",
    engineering: "Platform and DevOps teams are constantly interrupted in 'ask-eng' channels with basic setup questions that have been answered dozens of times before."
  },
  "Salesforce workflow automation (Scheduled triggers)": {
    sales: "Pipeline hygiene suffers because manual 'stale opportunity' checks are inconsistent, leading to inaccurate forecasting and reps pursuing deals that should have been closed or advanced weeks ago.",
    operations: "Sales leaders lack a consistent, high-level view of account health because they have to manually pull reports to see which key records haven't been updated, rather than receiving proactive summaries in-channel.",
    finance: "Billing and revenue teams face delays when sales reps forget to update critical contract fields in Salesforce, creating a manual follow-up burden to ensure month-end data is accurate.",
    marketing: "Lead conversion rates drop when 'mql' records sit unaddressed in Salesforce; without scheduled nudges in Slack, reps may overlook new leads during busy selling periods."
  },
  "Slackbot Salesforce Search": {
    sales: "Reps lose their flow and 'swivel-chair' between apps just to find a simple lead status or contract value, which adds up to hours of lost selling time every week.",
    operations: "Leadership struggles to get rapid answers during cross-functional meetings because they have to wait for someone to log in and navigate complex Salesforce reports just to find a single data point.",
    customer_support: "Support agents waste time manually searching for Case and Contact records in Salesforce to get context for a Slack escalation, delaying the total time to resolution for the customer."
  },
  "Restrict AI access to certain channels, canvases, and lists": {
    it: "Admins face 'all-or-nothing' security hurdles where they can't deploy productivity-boosting AI because they have no way to exclude high-risk channels (like executive leadership or security response) from AI.",
    hr: "Sensitive personnel discussions, payroll data, or private employee relations cases risk being surfaced in AI summaries or search results if the AI isn't explicitly barred from accessing HR-only channels.",
    finance: "Confidential financial planning, M&A discussions, or unreleased quarterly earnings data could be accidentally leaked via AI-generated recaps if finance-specific canvases and channels aren't restricted.",
    legal: "Attorneys and compliance officers can't block AI from sensitive channels to ensure that attorney-client privileged information or sensitive litigation strategy is completely shielded from AI processing.",
    engineering: "Proprietary source code or sensitive security credentials stored in private channels or canvases are at risk of exposure if the AI is allowed to summarize technical 'war rooms' containing sensitive data.",
    sales: "Sales leaders worry that 'shadow deals' or sensitive commission structures could be surfaced to unauthorized users through AI search if specific management channels aren't excluded from the AI's reach."
  },
  "Enterprise Search in Slackbot": {
    it: "Employees waste countless hours in 'digital friction,' manually checking five different apps to find one piece of information, which drives up internal support tickets for simple discovery questions.",
    engineering: "Engineers lose deep-work focus searching for a bug's history across GitHub, a feature's spec in GDrive, and the original customer complaint in Salesforce—leading to fragmented context and slower development cycles.",
    sales: "Reps struggle to prepare for calls because the 'complete picture' of a customer is scattered across different tools like Slack threads, Salesforce records, and Box folders, making it nearly impossible to find a single, unified answer quickly.",
    marketing: "Campaign launches are delayed when teams can't find the 'final-final' asset because the strategy is in a Canvas, the feedback is in Slack, and the actual file is buried in a 3rd-party cloud drive.",
    customer_support: "Resolution times suffer because agents have to manually piece together a customers technical environment from Jira and their contract status from Salesforce before they can even begin troubleshooting in Slack.",
    operations: "Leadership decision-making is slowed down by 'information sprawl'; instead of getting a direct answer based on all company data, they have to wait for manual reports to be compiled from various siloed tools.",
    hr: "New hires feel overwhelmed and unproductive because onboarding knowledge is spread across a dozen different platforms, with no single entry point to ask a question and get a comprehensive answer."
  }
  }
}
