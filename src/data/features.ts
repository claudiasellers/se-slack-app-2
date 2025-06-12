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
      "SAML SSO": { free: "+SFDC Only", pro: "+SFDC Only", plus: true, grid: true },
      "Multi-SAML SSO": { free: false, pro: false, plus: false, grid: true },
      "SCIM API Provisioning": { free: "+SFDC Only", pro: "+SFDC Only", plus: true, grid: true },
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
      "99.99% Guaranteed Uptime SLA": { free: false, pro: false, plus: true, grid: true },
      "Integrations": {free: false, pro: true, plus: true, grid: true},
      "Thread & Channel Summaries": {free: false, pro: true, plus: true, grid: true},
      "File Summaries": {free: false, pro: false, plus: true, grid: true},
      "Recaps": {free: false, pro: false, plus: true, grid: true},
      "Huddles Notes":{free: false, pro: true, plus: true, grid: true},
      "Slack AI Search": {free: false, pro: false, plus: true, grid: true},
      "Enterprise Search": {free: false, pro: false, plus: false, grid: true},
      "3rd Party Agent Apps" : {free: false, pro: true, plus: true, grid: true},
      //"AI Language Translations": {free: false, pro: false, plus: true, grid: true},
      //"AI Writing Assistance": {free: false, pro: false, plus: true, grid: true},
      "AI Workflow Builder": {free: false, pro: false, plus: true, grid: true},
      "AI Steps in Workflow Builder": {free: false, pro: false, plus: true, grid: true},
      //"Action Items / To-Dos": {free: false, pro: false, plus: false, grid: true},
      "Salesforce Channels": {free: "Users See 90 Days Only", pro: true, plus: true, grid: true},
      "Record Unfurls":{free: true, pro: true, plus: true, grid: true},
      "Record Search": {free: true, pro: true, plus: true, grid: true},
      "Record View & Edit": {free: true, pro: true, plus: true, grid: true},
      "Related List Views": {free: true, pro: true, plus: true, grid: true}, 
      "Connect multiple Salesforce orgs": {free: false, pro: true, plus: true, grid: true},
      "Salesforce standalone List Views": {free: false, pro: false, plus: true, grid: true},
      "Salesforce workflow automation (“Event triggers”)": {free: false, pro: false, plus: true, grid: true},
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
      "Channel Posting Permissions":
        "Limit who can post in channels (e.g., lock down a channel to create an 'announcement channel').",
      "Workflow Builder": "No code/low code tool to automate common processes.",
      "Message Activity": "View the engagement stats of individual messages.",
      "Slack Catch Up": "Swipe through unread conversations on Mobile.",
      "Out of Office Responder": "Automatically send an out-of-office response when someone messages you.",
      "Lists": "Track structured information in a table format.",
      "Slack Channel Templates": "Slack Solutions—a full channel-based solution with lists, canvases, and workflows.",
      "Granular Admin Roles": "Create admin users with specific admin permissions.",
      "Central Channel Dashboard": "View and edit all channels from one dashboard.",
      "Admin API": "Automate admin processes.",
      "Analytics API (Members)":
        "Connect data from the Analytics Dashboard into a third-party BI tool to create custom analytics dashboards.",
      "Analytics API (Conversations)": "View engagement metrics related to installed apps.",
      "App Analytics": "View engagement metrics related to installed apps.",
      "Custom Retention Policies (Workspace)":
        "Set preferences for how long messages/files should be retained on a workspace.",
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
      "Report to Slack for EU Users":
        "Allows users to report prohibited content to Slack for review (EU Digital Services Act compliance).",
      "Lock Threads": "Prevent additional messages from being sent in a thread.",
      "Customer Support Tier":
        "Enterprise+ customers may be supported by a dedicated Account Executive and Success Guide.",
      "99.99% Guaranteed Uptime SLA": "Customers are entitled to SLA billing credits if downtime occurs.",
      "Thread & Channel Summaries": "Generates a textual summary of a message thread or channel.",
      "File Summaries": "Creates a summary of a file's content directly in Slack.",
      "Recaps": "Provides a personalized digest of unread messages and key conversations",
      "Huddles Notes":"Automatically transcribes and summarizes audio from Huddles to capture key details.",
      "Slack AI Search": "Get answers to natural language questions based on the content of messages and files in Slack."
      "Enterprise Search": "Includes content from connected third-party apps in your Slack search results."
      "3rd Party Agent Apps" : "Add and use third-party AI assistants through the Slack Marketplace."
      //"AI Language Translations": {free: false, pro: false, plus: true, grid: true},
      //"AI Writing Assistance": {free: false, pro: false, plus: true, grid: true},
      "AI Workflow Builder": "Creates multi-step workflows from a natural language description.",
      "AI Steps in Workflow Builder": "Users can add AI-powered steps within workflows, such as the 'Summarize Channel' step which can automatically generate channel summaries",
      //"Action Items / To-Dos": {free: false, pro: false, plus: false, grid: true},
      "Salesforce Channels": "Dedicated Slack channel that syncs with a specific Salesforce record (e.g. Account or Opportunity)."
      "Record Unfurls":"Rich previews of Salesforce records that automatically display when a record is shared or linked in Slack channels, showing key record information like the record name, object type, and additional fields based on admin configuration ",
      "Record Search": "Allows users to search for and find Salesforce records directly within Slack.  By default, users can search across six standard Salesforce objects: Account, Case, Contact, Lead, Opportunity, and Task. (Custom objects may be configurable by a Salesforce System Administrator). ",
      "Record View & Edit": "Users can view and update Salesforce records directly within Slack without switching platforms [1 · Help Center]. Users can edit records if they have the appropriate permissions in Salesforce - their Slack access mirrors their Salesforce permissions",
      "Related List Views": "Displays related Salesforce records (e.g., opportunities linked to an account) as tabs directly within Slack channels.", 
      "Connect multiple Salesforce orgs": "The ability to link more than one Salesforce organization to a single Slack workspace.",
      "Salesforce standalone List Views": "Allows users to access their personal Salesforce list views (e.g., 'My Opportunities') and edit data directly within Slack. Data is bi-directionally synced.",
      "Salesforce workflow automation (“Event triggers”)": "Automatically starts a Slack workflow when a specific event occurs in Salesforce (e.g. an Opportunity Stage changing). Workflows can combine both Slack and Salesforce actions and are fully compatible with custom objects and fields in Salesforce.",
      "Sales Home": "A single view to track and update your pipeline, performance, and sales alerts to stay on top of your (or your teams) deals.",
      "Multiple Workspaces": "Allows a company to create and centrally manage a network of interconnected workspaces."

    },
    featurePainPoints: {
      "Slack AI": {
        it: "Difficulty accessing siloed information or 'tribal knowledge' buried in message history, hindering IT support and knowledge sharing.",
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
      },
      "Per-Org Customization - Slack Connect": {
        it: "Lack of granular control over Slack Connect settings on a per-partner basis limits ability to enforce specific security or data sharing policies.",
      },
      "Multi-Workspace Channels": {
        it: "Information sharing and collaboration between different internal departments or teams using separate workspaces requires manual cross-posting or disconnected communication.",
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
        hr: "Company-wide announcements or policy updates in general channels are easily missed or diluted by unrelated replies.",
        marketing:
          "Campaign launch announcements or official communications get buried in channel chatter, reducing visibility.",
        operations:
          "Critical operational updates or incident communications require dedicated channels that can be difficult to keep focused without strict controls.",
      },
      "Message Activity": {
        it: "Lack of visibility into whether important IT announcements or security updates posted in Slack have been seen by relevant employees.",
      },
      "Slack Catch Up": {
        it: "Employees miss important updates when catching up on mobile due to overwhelming unread messages, potentially impacting response times for IT requests.",
      },
      "Out of Office Responder": {
        hr: "Employees returning from leave face a backlog of messages, and colleagues lack visibility into absences, causing communication delays.",
        it: "Communication delays and frustration due to colleagues being unaware of a user's absence and not knowing when to expect a response.",
      },
      Lists: {
        it: "Tracking IT assets, project tasks, or compliance items within Slack relies on unstructured messages or external spreadsheets.",
        sales:
          "Managing lists of target accounts, deal stages, or follow-up tasks within Slack is difficult without a structured format.",
        hr: "Tracking onboarding checklists, interview candidates, or employee directory information within Slack requires manual processes or external tools.",
        marketing:
          "Managing campaign tasks, event attendees, or content calendars within Slack lacks structure and clear ownership.",
        customer_support:
          "Tracking customer support tickets, feature requests, or account health metrics within Slack is cumbersome without a dedicated list format.",
        operations:
          "Managing project deliverables, inventory, or team tasks within Slack requires switching to external tools or using unstructured formats.",
      },
      "Slack Channel Templates": {
        it: "Setting up consistent channels for recurring IT processes (e.g., incident response, project kickoff) is manual and prone to variation.",
        hr: "Creating standard channels for new hire onboarding, team projects, or employee resource groups requires manual setup each time.",
        sales:
          "Setting up consistent channels for new deals, account teams, or regional collaboration requires repetitive manual effort.",
        operations:
          "Launching new projects or initiatives requires manually creating channels and setting up associated resources (workflows, canvases) repeatedly.",
      },
      "Granular Admin Roles": {
        it: "Granting broad administrative privileges increases security risk; lack of specific roles makes it hard to delegate routine admin tasks safely.",
        operations:
          "Inability to delegate specific administrative tasks (e.g., channel management for a department) to non-IT staff securely.",
      },
      "Central Channel Dashboard": {
        it: "Managing channel lifecycle (creation, archiving, permissions) across numerous channels is cumbersome without a centralized view.",
      },
      "Admin API": {
        it: "Manual execution of routine administrative tasks (user provisioning, workspace settings) is time-consuming and doesn't scale.",
      },
      "Analytics API (Members)": {
        it: "Difficulty programmatically analyzing user adoption, activity trends, or identifying inactive accounts across the organization.",
      },
      "Analytics API (Conversations)": {
        it: "Inability to programmatically analyze communication patterns, channel engagement, or information flow within Slack for optimization or governance.",
      },
      "App Analytics": {
        it: "Lack of visibility into which third-party apps are being used, by whom, and how frequently, making app governance and ROI assessment difficult.",
      },
      "Custom Retention Policies (Workspace)": {
        it: "Default message and file retention may not meet specific compliance or internal governance requirements for individual workspaces.",
      },
      "Custom Retention Policies (Org-Wide)": {
        it: "Ensuring consistent data retention policies across all workspaces in a large organization is difficult to manage and enforce manually.",
      },
      "Lock Guest Names": {
        it: "External guests changing their display names can cause confusion and potential security risks (impersonation).",
      },
      "Google OAuth 2.0": {
        it: "Managing separate Slack logins increases user friction and security risks compared to using existing Google Workspace credentials.",
      },
      "SAML SSO": {
        it: "Managing user access and passwords separately for Slack increases security overhead and risk compared to leveraging the central corporate identity provider (e.g., Okta, Azure AD).",
      },
      "Multi-SAML SSO": {
        it: "Organizations with multiple identity providers (e.g., due to M&A) face complexity managing separate Slack authentications for different user populations.",
      },
      "SCIM API Provisioning": {
        it: "Manually provisioning, updating, and de-provisioning user accounts in Slack based on changes in the identity provider (IDP) is slow, error-prone, and creates security gaps.",
      },
      "SCIM API Provisioning (Guest Provisioning)": {
        it: "Manually inviting and managing guest accounts at scale is inefficient and lacks synchronization with central identity systems.",
      },
      Atlas: {
        it: "Lack of rich user profiles and org chart visibility within Slack makes it hard for employees to understand roles, reporting structures, and find the right contacts.",
        hr: "Difficult for employees (especially new hires) to navigate the organization, find colleagues by expertise or department, and understand team structures within Slack.",
      },
      "Custom User Groups": {
        it: "Manually adding relevant users to channels or mentioning large teams is inefficient and prone to missing people.",
      },
      "IDP Groups": {
        it: "Keeping Slack channel memberships and workspace access synchronized with dynamic groups defined in the corporate identity provider (IDP) requires manual effort.",
      },
      "Session Duration": {
        it: "Users remaining logged into Slack indefinitely on shared or public computers poses a security risk.",
      },
      "Session Management": {
        it: "Inability to remotely log users out of Slack sessions on potentially compromised or lost devices creates a security vulnerability.",
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
      },
      "Block File Downloads/Copying (Desktop)": {
        it: "Sensitive information shared in Slack can be easily exfiltrated via file downloads or copying text on desktop clients without specific controls.",
      },
      "Legal Holds": {
        it: "Meeting legal obligations to preserve specific user data for litigation or investigations is difficult if data can be deleted by retention policies or users.",
      },
      "Information Barriers": {
        it: "Risk of regulatory non-compliance or conflicts of interest if specific groups of users (e.g., finance and sales during sensitive periods) can freely communicate via DMs.",
      },
      "DLP (Data Loss Prevention)": {
        it: "Sensitive data (like PII, financial info, secrets) accidentally or intentionally shared in Slack may go undetected, leading to data breaches or compliance violations.",
      },
      "Native DLP (Slack Connect Only)": {
        it: "Lack of basic controls to detect and prevent sensitive data sharing in Slack Connect channels without implementing a full third-party DLP solution.",
      },
      "Audit Logs API": {
        it: "Difficulty integrating Slack user activity logs with external SIEM or security monitoring tools for proactive threat detection and compliance reporting.",
      },
      "Audit Logs (Native Dashboard)": {
        it: "Investigating security incidents or policy violations requires exporting and manually searching logs, delaying response times.",
      },
      "Discovery/DLP API": {
        it: "Inability for eDiscovery or third-party DLP tools to access and scan Slack messages and files hinders compliance and data security efforts.",
      },
      "Exports (Public Data)": {
        it: "Meeting basic compliance or archival needs requiring export of public channel data is not possible on lower tiers.",
      },
      "Exports (Full Data)": {
        it: "Inability to export complete Slack history (including private channels, DMs) prevents meeting stringent regulatory or legal data preservation requirements.",
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
      "99.99% Guaranteed Uptime SLA": {
        it: "Service disruptions can impact business continuity with no contractual recourse for financial credits on lower tiers.",
      },
      Integrations: {
        it: "Inefficiencies and potential data inconsistencies due to lack of interoperability between critical business systems (e.g., ticketing, monitoring, code repos) and the collaboration platform.",
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
      },
    },
  }