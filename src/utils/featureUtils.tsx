import React from "react"
import {
  FileText,
  MessageSquare,
  Users,
  Lock,
  Settings,
  Zap,
  List,
  BarChart,
  Clock,
  Bot,
  Workflow,
  Shield,
  Database,
  UserCheck,
  Cloud,
  Smartphone,
  LineChart
} from "lucide-react"

// Feature icon mapping - consistent colors per category
export const getFeatureIcon = (feature: string, category?: string): React.ReactNode => {
  // Get the appropriate color based on category
  const getIconColor = (cat?: string) => {
    switch (cat) {
      case "Collaboration Tools": return "text-[#36C5F0]" // blue
      case "Administration & Analytics": return "text-[#4A154B]" // purple
      case "Security & Compliance": return "text-[#E01E5A]" // red
      case "External Collaboration": return "text-[#2EB67D]" // green
      case "User Management": return "text-[#ECB22E]" // yellow
      case "Data & Exports": return "text-[#E01E5A]" // red
      case "Support & Reliability": return "text-[#36C5F0]" // blue
      case "Slack AI": return "text-[#ECB22E]" // yellow
      case "Salesforce Integration": return "text-[#36C5F0]" // blue
      case "Slackbot": return "text-[#E01E5A]" // red
      default: return "text-[#6B7280]" // neutral gray
    }
  }
  
  const iconColor = getIconColor(category)

  const iconMap: Record<string, React.ReactNode> = {
    // Collaboration Tools
    "Canvas": <FileText className={`h-5 w-5 ${iconColor}`} />,
    "Custom Canvas Templates": <FileText className={`h-5 w-5 ${iconColor}`} />,
    "Slack Sales Templates": <FileText className={`h-5 w-5 ${iconColor}`} />,
    "Clips": <MessageSquare className={`h-5 w-5 ${iconColor}`} />,
    "Multi-Workspace Channels": <MessageSquare className={`h-5 w-5 ${iconColor}`} />,
    "Workflow Builder": <Workflow className={`h-5 w-5 ${iconColor}`} />,
    "Conditional Workflows": <Workflow className={`h-5 w-5 ${iconColor}`} />,
    "Lists": <List className={`h-5 w-5 ${iconColor}`} />,
    "Slack Channel Templates": <FileText className={`h-5 w-5 ${iconColor}`} />,
    "Message Activity": <BarChart className={`h-5 w-5 ${iconColor}`} />,
    "Slack Catch Up": <MessageSquare className={`h-5 w-5 ${iconColor}`} />,
    "Out of Office Responder": <Clock className={`h-5 w-5 ${iconColor}`} />,

    // External Collaboration
    "Guests": <Users className={`h-5 w-5 ${iconColor}`} />,
    "Slack Connect (Shared Channels)": <Users className={`h-5 w-5 ${iconColor}`} />,
    "Sponsored Connections - Slack Connect": <Users className={`h-5 w-5 ${iconColor}`} />,
    "Per-Org Customization - Slack Connect": <Settings className={`h-5 w-5 ${iconColor}`} />,

    // Administration & Analytics
    "Granular Admin Roles": <Settings className={`h-5 w-5 ${iconColor}`} />,
    "Central Channel Dashboard": <BarChart className={`h-5 w-5 ${iconColor}`} />,
    "Admin API": <Settings className={`h-5 w-5 ${iconColor}`} />,
    "Analytics API (Members)": <BarChart className={`h-5 w-5 ${iconColor}`} />,
    "Analytics API (Conversations)": <BarChart className={`h-5 w-5 ${iconColor}`} />,
    "App Analytics": <BarChart className={`h-5 w-5 ${iconColor}`} />,
    "Approve Workspaces": <Settings className={`h-5 w-5 ${iconColor}`} />,

    // Security & Compliance
    "Channel Posting Permissions": <Lock className={`h-5 w-5 ${iconColor}`} />,
    "Lock Guest Names": <Lock className={`h-5 w-5 ${iconColor}`} />,
    "Google OAuth 2.0": <UserCheck className={`h-5 w-5 ${iconColor}`} />,
    "SAML SSO": <Shield className={`h-5 w-5 ${iconColor}`} />,
    "Multi-SAML SSO": <Shield className={`h-5 w-5 ${iconColor}`} />,
    "Domain Claiming (create workspace)": <Lock className={`h-5 w-5 ${iconColor}`} />,
    "MDM (Mobile Device Management)": <Shield className={`h-5 w-5 ${iconColor}`} />,
    "MAM (Mobile Application Management)": <Shield className={`h-5 w-5 ${iconColor}`} />,
    "EKM (Enterprise Key Management)": <Lock className={`h-5 w-5 ${iconColor}`} />,
    "Block File Downloads (Desktop + Mobile)": <Lock className={`h-5 w-5 ${iconColor}`} />,
    "Legal Holds": <Lock className={`h-5 w-5 ${iconColor}`} />,
    "Information Barriers": <Shield className={`h-5 w-5 ${iconColor}`} />,
    "DLP (Data Loss Prevention)": <Shield className={`h-5 w-5 ${iconColor}`} />,
    "Native DLP": <Shield className={`h-5 w-5 ${iconColor}`} />,
    "Discovery/DLP API": <Shield className={`h-5 w-5 ${iconColor}`} />,

    // User Management
    "SCIM API Provisioning": <Settings className={`h-5 w-5 ${iconColor}`} />,
    "SCIM API (Guest Provisioning)": <Settings className={`h-5 w-5 ${iconColor}`} />,
    "Atlas": <Users className={`h-5 w-5 ${iconColor}`} />,
    "Custom User Groups": <Users className={`h-5 w-5 ${iconColor}`} />,
    "IDP Groups": <Users className={`h-5 w-5 ${iconColor}`} />,
    "Session Duration - Desktop + Mobile": <Clock className={`h-5 w-5 ${iconColor}`} />,
    "Session Management": <Settings className={`h-5 w-5 ${iconColor}`} />,
    "Native Mobile Controls": <Settings className={`h-5 w-5 ${iconColor}`} />,

    // Data & Exports
    "Custom Retention Policies (Workspace)": <Database className={`h-5 w-5 ${iconColor}`} />,
    "Custom Retention Policies (Org-Wide)": <Database className={`h-5 w-5 ${iconColor}`} />,
    "Audit Logs API": <Database className={`h-5 w-5 ${iconColor}`} />,
    "Audit Logs (Native Dashboard)": <Database className={`h-5 w-5 ${iconColor}`} />,
    "Exports (Public Data)": <Database className={`h-5 w-5 ${iconColor}`} />,
    "Exports (Full Data)": <Database className={`h-5 w-5 ${iconColor}`} />,
    "Exports (Single User Exports)": <Database className={`h-5 w-5 ${iconColor}`} />,
    "Data Residency (IDR)": <Database className={`h-5 w-5 ${iconColor}`} />,

    // AI Features
    "Slack AI": <Bot className={`h-5 w-5 ${iconColor}`} />,
    "Thread & Channel Summaries": <Bot className={`h-5 w-5 ${iconColor}`} />,
    "Huddles Notes": <Bot className={`h-5 w-5 ${iconColor}`} />,
    "3rd Party Agent Apps": <Bot className={`h-5 w-5 ${iconColor}`} />,

    // Salesforce Integration
    "Salesforce Channels": <Cloud className={`h-5 w-5 ${iconColor}`} />,
    "Record Unfurls": <Cloud className={`h-5 w-5 ${iconColor}`} />,
    "Record Search": <Cloud className={`h-5 w-5 ${iconColor}`} />,
    "Record View & Edit": <Cloud className={`h-5 w-5 ${iconColor}`} />,
    "Related List Views": <Cloud className={`h-5 w-5 ${iconColor}`} />,
    "Connect multiple Salesforce orgs": <Cloud className={`h-5 w-5 ${iconColor}`} />,
    "Salesforce standalone List Views": <Cloud className={`h-5 w-5 ${iconColor}`} />,
    "Salesforce workflow automation (Event triggers)": <Cloud className={`h-5 w-5 ${iconColor}`} />,
    "Salesforce workflow automation (Scheduled triggers)": <Cloud className={`h-5 w-5 ${iconColor}`} />,
    "Sales Home": <Cloud className={`h-5 w-5 ${iconColor}`} />,
    "Exports (Salesforce Channels)": <Cloud className={`h-5 w-5 ${iconColor}`} />,
    "Salesforce Channel AI Summary Tab": <Zap className={`h-5 w-5 ${iconColor}`} />,

    // Support & Reliability
    "Customer Support Tier": <MessageSquare className={`h-5 w-5 ${iconColor}`} />,
    "99.99% Guaranteed Uptime SLA": <Zap className={`h-5 w-5 ${iconColor}`} />,
    "Integrations": <Zap className={`h-5 w-5 ${iconColor}`} />,

    // Other/Miscellaneous
    "Custom Terms of Service": <FileText className={`h-5 w-5 ${iconColor}`} />,
    "Native Device Management: Block Jailbroken Devices": <Smartphone className={`h-5 w-5 ${iconColor}`} />,
    "Native Device Management: Block Copy / Paste (Mobile)": <Smartphone className={`h-5 w-5 ${iconColor}`} />,
    "AI Admin analytics dashboard": <LineChart className="h-5 w-5 text-[#ECB22E]" />,
    "AI Explain": <Zap className={`h-5 w-5 ${iconColor}`} />,
    "Canvas AI": <FileText className={`h-5 w-5 ${iconColor}`}/>,
    "Limited Access: Message Limit": <Bot className={`h-5 w-5 ${iconColor}`} />,
    "Full Access: Unlimited Messages": <Bot className={`h-5 w-5 ${iconColor}`} />,
    "Multiple searches at once": <Bot className={`h-5 w-5 ${iconColor}`} />,
    "Desktop & mobile parity": <Bot className={`h-5 w-5 ${iconColor}`} />,
    "Slack search (including canvases)": <Bot className={`h-5 w-5 ${iconColor}`} />,
    "File uploads & calendar entity read": <Bot className={`h-5 w-5 ${iconColor}`} />,
    "Create & update canvases": <Bot className={`h-5 w-5 ${iconColor}`} />,
    "3P entity read (GDrive, OneDrive, Box, etc)": <Bot className={`h-5 w-5 ${iconColor}`} />,
    "Enterprise search w/ 3P read only connectors (OneDrive, Box, GDrive)": <Bot className={`h-5 w-5 ${iconColor}`} />,
    "International Data Residency": <Bot className={`h-5 w-5 ${iconColor}`} />,
    "Full-org kill switch": <Bot className={`h-5 w-5 ${iconColor}`} />,
    "Custom group access": <Bot className={`h-5 w-5 ${iconColor}`} />,
    "Full Data Export": <Bot className={`h-5 w-5 ${iconColor}`} />,
    "Filtered & single user export": <Bot className={`h-5 w-5 ${iconColor}`}/>,
    "Slackbot DLP": <Bot className={`h-5 w-5 ${iconColor}`}/>,
    "EKM compatibility": <Bot className={`h-5 w-5 ${iconColor}`}/>,
    "Slackbot Audit logs": <Bot className={`h-5 w-5 ${iconColor}`}/>,
    "Channel Expert Agent": <Bot className={`h-5 w-5 ${iconColor}`} />
  }

  return iconMap[feature] || <Zap className={`h-5 w-5 ${iconColor}`} />
}

// Get section colors - balanced variety with cohesion
export const getSectionColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    "Collaboration Tools": "#36C5F0", // slack blue - core collaboration
    "Administration & Analytics": "#4A154B", // slack purple - admin/power features
    "Security & Compliance": "#E01E5A", // slack red - security (important/serious)
    "External Collaboration": "#2EB67D", // slack green - external/sharing
    "User Management": "#ECB22E", // slack yellow - user-focused
    "Data & Exports": "#E01E5A", // slack red - data (important/serious)
    "Support & Reliability": "#36C5F0", // slack blue - support
    "Slack AI": "#4A154B", // slack purple - premium/advanced
    "Salesforce Integration": "#36C5F0", // slack blue - integration
    "Other Features": "#6B7280", // neutral gray - miscellaneous
    "Slackbot": "#E01E5A" // slack red - slackbot
  }

  return colorMap[category] || "#6B7280" // default to neutral gray
}