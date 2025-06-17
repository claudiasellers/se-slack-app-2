// Feature data structure
export const featureData = {
    featureAvailability: {
      "Multiple Workspaces": { free: false, pro: false, plus: false, grid: true },
      "Canvas": { free: false, pro: true, plus: true, grid: true },
      "Custom Canvas Templates": { free: false, pro: false, plus: false, grid: true },
      "Slack Sales Templates": { free: false, pro: false, plus: false, grid: true },
      "Clips": { free: true, pro: true, plus: true, grid: true },
      "Guests": { free: false, pro: true, plus: true, grid: true },
      "Slack Connect (Shared Channels)": { free: false, pro: true, plus: true, grid: true },
      "Sponsored Connections - Slack Connect": { free: false, pro: false, plus: false, grid: true },
      "Per-Org Customization - Slack Connect": {free: false, pro: "(Limited)", plus: true, grid: "(+ Enhanced visibility)"},
      "Multi-Workspace Channels": { free: false, pro: false, plus: false, grid: true },
      "Channel Posting Permissions": {free: "(#general channel only)", pro: "(#general channel only)", plus: true, grid: true},
      "Workflow Builder": { free: false, pro: true, plus: true, grid: true },
      "Message Activity": { free: false, pro: true, plus: true, grid: true },
      "Slack Catch Up": { free: true, pro: true, plus: true, grid: true },
      "Out of Office Responder": { free: false, pro: false, plus: false, grid: true },
      "Lists": { free: false, pro: true, plus: true, grid: true },
      "Slack Channel Templates": { free: false, pro: true, plus: true, grid: true },
      "Granular Admin Roles": { free: false, pro: false, plus: false, grid: true },
      "Central Channel Dashboard": { free: false, pro: false, plus: true, grid: true },
      "Admin API": { free: false, pro: false, plus: false, grid: true },
      "Analytics API (Members)": { free: false, pro: false, plus: false, grid: true },
      "Analytics API (Conversations)": { free: false, pro: false, plus: true, grid: true },
      "App Analytics": { free: false, pro: false, plus: false, grid: true },
      "Custom Retention Policies (Workspace)": { free: false, pro: true, plus: true, grid: true },
      "Custom Retention Policies (Org-Wide)": { free: false, pro: false, plus: false, grid: true },
      "Lock Guest Names": { free: true, pro: true, plus: true, grid: true },
      "Google OAuth 2.0": { free: false, pro: true, plus: true, grid: false },
      "SAML SSO": { free: "Enabled by connecting Slack to Salesforce.", pro: "Enabled by connecting Slack to Salesforce.", plus: true, grid: true },
      "Multi-SAML SSO": { free: false, pro: false, plus: false, grid: true },
      "SCIM API Provisioning": { free: "Enabled by connecting Slack to Salesforce.", pro: "Enabled by connecting Slack to Salesforce.", plus: true, grid: true },
      "SCIM API Provisioning (Guest Provisioning)": { free: false, pro: false, plus: false, grid: true },
      "Atlas": { free: false, pro: false, plus: false, grid: true },
      "Custom User Groups": { free: false, pro: true, plus: true, grid: true },
      "IDP Groups": { free: false, pro: false, plus: false, grid: true },
      "Session Duration": { free: true, pro: true, plus: true, grid: true },
      "Session Management": { free: false, pro: false, plus: false, grid: true },
      "Domain Claiming (create workspace)": { free: false, pro: false, plus: false, grid: true },
      "MDM (Mobile Device Management)": { free: false, pro: false, plus: false, grid: true },
      "MAM (Mobile Application Management)": { free: false, pro: false, plus: false, grid: true },
      "EMM (Enterprise Mobility Management)": { free: false, pro: false, plus: false, grid: true },
      "Native Device Management: Block Jailbroken Devices": { free: true, pro: true, plus: true, grid: true },
      "Native Device Management: Block File Download / Copy / Paste": { free: true, pro: true, plus: true, grid: true },
      "EKM (Enterprise Key Management)": { free: false, pro: false, plus: false, grid: "(Add-on)" },
      "Block File Downloads/Copying (Desktop)": { free: false, pro: false, plus: false, grid: true },
      "Legal Holds": { free: false, pro: false, plus: false, grid: true },
      "Information Barriers": { free: false, pro: false, plus: false, grid: true },
      "DLP (Data Loss Prevention)": { free: false, pro: false, plus: false, grid: true },
      "Native DLP (Slack Connect Only)": { free: false, pro: false, plus: false, grid: true },
      "Audit Logs API": { free: false, pro: false, plus: false, grid: true },
      "Audit Logs (Native Dashboard)": { free: false, pro: false, plus: false, grid: true },
      "Discovery/DLP API": { free: false, pro: false, plus: false, grid: true },
      "Exports (Public Data)": { free: false, pro: true, plus: true, grid: true },
      "Exports (Full Data)": { free: false, pro: false, plus: true, grid: true },
      "Exports (Single User Exports)": { free: false, pro: false, plus: false, grid: true },
      "Exports (Salesforce Channels)": { free: true, pro: true, plus: true, grid: true },
      "Custom Terms of Service": { free: false, pro: false, plus: false, grid: true },
      "Approve Workspaces": { free: false, pro: false, plus: true, grid: true },
      "Data Residency (IDR)": { free: false, pro: false, plus: true, grid: true },
      "Customer Support Tier": {free: "Standard support", pro: "24/7 support", plus: "24/7 support (4-hour first response)", grid: "24/7 priority support (4-hour first response)"},
      "Integrations": {free: false, pro: true, plus: true, grid: true},
      "Thread & Channel Summaries": {free: false, pro: true, plus: true, grid: true},
      "File Summaries": {free: false, pro: false, plus: true, grid: true},
      "Recaps": {free: false, pro: false, plus: true, grid: true},
      "Huddles Notes":{free: false, pro: true, plus: true, grid: true},
      "Slack AI Search": {free: false, pro: false, plus: true, grid: true},
      "Enterprise Search": {free: false, pro: false, plus: false, grid: true},
      "3rd Party Agent Apps" : {free: false, pro: true, plus: true, grid: true},
      "AI Workflow Builder": {free: false, pro: false, plus: true, grid: true},
      "AI Steps in Workflow Builder": {free: false, pro: false, plus: true, grid: true},
      "AI Action Items": {free: false, pro: false, plus: false, grid: true},
      "Salesforce Channels": {free: "Users See 90 Days Only", pro: true, plus: true, grid: true},
      "Record Unfurls":{free: true, pro: true, plus: true, grid: true},
      "Record Search": {free: true, pro: true, plus: true, grid: true},
      "Record View & Edit": {free: true, pro: true, plus: true, grid: true},
      "Related List Views": {free: true, pro: true, plus: true, grid: true}, 
      "Connect multiple Salesforce orgs": {free: false, pro: true, plus: true, grid: true},
      "Salesforce standalone List Views": {free: false, pro: false, plus: true, grid: true},
      "Salesforce workflow automation (Event triggers)": {free: false, pro: false, plus: true, grid: true},
      "Sales Home": {free: false, pro: false, plus: true, grid: true}
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
      "Slack Catch Up": "Swipe through unread conversations on Mobile.",
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
      "Session Duration": "Set a cadence to automatically log users out on desktop and web browser.",
      "Session Management": "Granular logout controls that apply to mobile or desktop.",
      "Domain Claiming (join workspace)": "Prevent joining or creating workspaces using a claimed and verified domain.",
      "Domain Claiming (create workspace)": "Prevent Free workspaces from being created that are linked to a claimed corporate email domain.",
      "MDM (Mobile Device Management)": "Apply extra security controls at the device level. Managed via AppConfig vendor apps.",
      "MAM (Mobile Application Management)": "Apply security controls directly to the Slack app.",
      "Native Mobile Controls": "Security controls applied directly from Slack (requires no third-party tools).",
      "EKM (Enterprise Key Management)": "Manage your own encryption keys (requires Amazon KMS).",
      "Block File Downloads/Copying (Desktop)": "Block downloads on desktop and restrict based on an IP address range.",
      "Legal Holds": "Preserve users data for litigation purposes (even if its deleted via Retention Settings).",
      "Information Barriers": "Prevent groups of users from communicating via DMs.",
      "DLP (Data Loss Prevention)": "Automatically scan and detect/remove unapproved data.",
      "Native DLP (Slack Connect Only)": "Natively set basic DLP policies via an admin dashboard in Slack.",
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
      "Customer Support Tier":
      "Enterprise+ customers may be supported by a dedicated Account Executive and Success Guide.",
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
      "Record View & Edit": "Users can view and update Salesforce records directly within Slack without switching platforms [1 · Help Center]. Users can edit records if they have the appropriate permissions in Salesforce - their Slack access mirrors their Salesforce permissions",
      "Related List Views": "Displays related Salesforce records (e.g., opportunities linked to an account) as tabs directly within Slack channels.", 
      "Connect multiple Salesforce orgs": "The ability to link more than one Salesforce organization to a single Slack workspace.",
      "Salesforce standalone List Views": "Allows users to access their personal Salesforce list views (e.g., 'My Opportunities') and edit data directly within Slack. Data is bi-directionally synced.",
      "Salesforce workflow automation (Event triggers)": "Automatically starts a Slack workflow when a specific event occurs in Salesforce (e.g. an Opportunity Stage changing). Workflows can combine both Slack and Salesforce actions and are fully compatible with custom objects and fields in Salesforce.",
      "Sales Home": "A single view to track and update your pipeline, performance, and sales alerts to stay on top of your (or your teams) deals.",
      "Multiple Workspaces": "Allows a company to create and centrally manage a network of interconnected workspaces.",
      "Native Device Management: Block Jailbroken Devices": "Automatically blocks access from jailbroken (iOS) or rooted (Android) devices to protect corporate data.",
      "Native Device Management: Block File Download / Copy / Paste": "Prevents data leakage by disabling file downloads and restricting copy/paste from managed apps to personal ones.",
      "AI Action Items":"Intelligent nudges that help you stay on top of your tasks by automatically identifying when someone expects you to take action."
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
      Canvas: {
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
      Clips: {
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
      Guests: {
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
        sales:
          "Communicating and collaborating with external partners, prospects, or customers relies on slow, siloed email threads.",
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
        marketing:
          "Campaign launch announcements or official communications get buried in channel chatter, reducing visibility.",
        operations:
          "Critical operational updates or incident communications require dedicated channels that can be difficult to keep focused without strict controls.",
      },
      "Message Activity": {
        it: "Lack of visibility into whether important IT announcements or security updates posted in Slack have been seen by relevant employees.",
        engineering: "Difficult to know if engineers have seen a critical update about a service outage or a required security patch, leading to uncertainty and follow-up.",
      },
      "Slack Catch Up": {
        it: "Employees miss important updates when catching up on mobile due to overwhelming unread messages, potentially impacting response times for IT requests.",
        engineering: "On-call engineers may miss critical alerts on mobile because they are mixed in with dozens of other unread messages from other channels.",
      },
      "Out of Office Responder": {
        hr: "Employees returning from leave face a backlog of messages, and colleagues lack visibility into absences, causing communication delays.",
        it: "Communication delays and frustration due to colleagues being unaware of a user's absence and not knowing when to expect a response.",
        engineering: "Code reviews get blocked and deployments are delayed because a required reviewer is on vacation, and the team was unaware of their absence.",
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
      },
      "IDP Groups": {
        it: "Keeping Slack channel memberships and workspace access synchronized with dynamic groups defined in the corporate identity provider (IDP) requires manual effort.",
        engineering: "Automatically adding new engineers to the correct team channels (`#backend-eng`, `#frontend-guild`) based on their department in Okta or Azure AD is impossible without IDP group sync.",
      },
      "Session Duration": {
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
      "Block File Downloads/Copying (Desktop)": {
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
      "Native DLP (Slack Connect Only)": {
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
      Integrations: {
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
        engineering: "Without access to third-party AI assistants, engineers have to build or manage internal bots manually—slowing down adoption of helpful AI tools and creating friction when teams want to experiment with new assistants for support, ticketing, or workflow augmentation."
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
        engineering: "Engineers might want to automatically summarize bug threads, incident chatter, or release updates from public channels as part of a Slack workflow—but can't without Slack AI being a step in workflow builder."
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
      "AI Action Items": {
        it: "Informal requests for help made in channels, like 'can someone look into this bug?', aren't formal tickets and often get scrolled past and forgotten.",
        engineering: "Action items from incident post-mortems or design reviews that are mentioned in-channel are not formally tracked and can easily be forgotten, leading to repeat incidents or unresolved design debt.",
        marketing: "During campaign brainstorms, verbal agreements such as 'can you send over the final copy?' are easily lost in the flow of conversation, leading to missed deadlines.",
        sales:"Managers often assign tasks in DMs, like 'follow up with that lead,' but these requests aren't automatically tracked and can easily slip through the cracks.",
        customer_support: "When collaborating on a ticket, one agent might ask another to 'check a customer's purchase history,' but this informal request can be missed if the second agent gets pulled into another issue.",
        operations:"Critical requests made in project channels, like 'can you update the budget spreadsheet?', often get missed by busy project managers, leading to project delays."
      }
    }
  }