import React, { useState } from "react";
import { ChevronDown, ArrowRight, Loader2, Users, FileText, MessageSquare, Lock, Settings, Zap, List, BarChart, Clock, Bot, Workflow, Shield, Database, UserCheck } from 'lucide-react';
import { featureData } from "../data/features";

// Add a new function to get feature icon
const getFeatureIcon = (feature: string) => {
    const iconMap: Record<string, React.ReactNode> = {
        Canvas: <FileText className="h-5 w-5 text-[#2EB67D]" />,
        "Custom Canvas Templates": <FileText className="h-5 w-5 text-[#2EB67D]" />,
        "Slack Sales Templates": <FileText className="h-5 w-5 text-[#2EB67D]" />,
        Clips: <MessageSquare className="h-5 w-5 text-[#36C5F0]" />,
        Guests: <Users className="h-5 w-5 text-[#36C5F0]" />,
        "Slack Connect (Shared Channels)": <Users className="h-5 w-5 text-[#36C5F0]" />,
        "Sponsored Connections - Slack Connect": <Users className="h-5 w-5 text-[#36C5F0]" />,
        "Per-Org Customization - Slack Connect": <Settings className="h-5 w-5 text-[#4A154B]" />,
        "Multi-Workspace Channels": <MessageSquare className="h-5 w-5 text-[#36C5F0]" />,
        "Channel Posting Permissions": <Lock className="h-5 w-5 text-[#E01E5A]" />,
        "Workflow Builder": <Workflow className="h-5 w-5 text-[#ECB22E]" />,
        "Message Activity": <BarChart className="h-5 w-5 text-[#36C5F0]" />,
        "Slack Catch Up": <MessageSquare className="h-5 w-5 text-[#36C5F0]" />,
        "Slack AI": <Bot className="h-5 w-5 text-[#4A154B]" />,
        "Out of Office Responder": <Clock className="h-5 w-5 text-[#ECB22E]" />,
        Lists: <List className="h-5 w-5 text-[#2EB67D]" />,
        "Slack Channel Templates": <FileText className="h-5 w-5 text-[#2EB67D]" />,
        "Granular Admin Roles": <Settings className="h-5 w-5 text-[#4A154B]" />,
        "Central Channel Dashboard": <BarChart className="h-5 w-5 text-[#36C5F0]" />,
        "Admin API": <Settings className="h-5 w-5 text-[#4A154B]" />,
        "Analytics API (Members)": <BarChart className="h-5 w-5 text-[#36C5F0]" />,
        "Analytics API (Conversations)": <BarChart className="h-5 w-5 text-[#36C5F0]" />,
        "App Analytics": <BarChart className="h-5 w-5 text-[#36C5F0]" />,
        "Custom Retention Policies (Workspace)": <Database className="h-5 w-5 text-[#E01E5A]" />,
        "Custom Retention Policies (Org-Wide)": <Database className="h-5 w-5 text-[#E01E5A]" />,
        "Lock Guest Names": <Lock className="h-5 w-5 text-[#E01E5A]" />,
        "Google OAuth 2.0": <UserCheck className="h-5 w-5 text-[#E01E5A]" />,
        "SAML SSO": <Shield className="h-5 w-5 text-[#E01E5A]" />,
        "Multi-SAML SSO": <Shield className="h-5 w-5 text-[#E01E5A]" />,
        "SCIM API": <Settings className="h-5 w-5 text-[#4A154B]" />,
        "SCIM API (Guest Provisioning)": <Settings className="h-5 w-5 text-[#4A154B]" />,
        Atlas: <Users className="h-5 w-5 text-[#36C5F0]" />,
        "User Groups": <Users className="h-5 w-5 text-[#36C5F0]" />,
        "IDP Groups": <Users className="h-5 w-5 text-[#36C5F0]" />,
        "Session Duration": <Clock className="h-5 w-5 text-[#ECB22E]" />,
        "Session Management": <Settings className="h-5 w-5 text-[#4A154B]" />,
        "Domain Claiming (create workspace)": <Lock className="h-5 w-5 text-[#E01E5A]" />,
        "MDM (Mobile Device Management)": <Shield className="h-5 w-5 text-[#E01E5A]" />,
        "MAM (Mobile Application Management)": <Shield className="h-5 w-5 text-[#E01E5A]" />,
        "Native Mobile Controls": <Settings className="h-5 w-5 text-[#4A154B]" />,
        "EKM (Enterprise Key Management)": <Lock className="h-5 w-5 text-[#E01E5A]" />,
        "Block File Downloads/Copying (Desktop)": <Lock className="h-5 w-5 text-[#E01E5A]" />,
        "Legal Holds": <Lock className="h-5 w-5 text-[#E01E5A]" />,
        "Information Barriers": <Shield className="h-5 w-5 text-[#E01E5A]" />,
        "DLP (Data Loss Prevention)": <Shield className="h-5 w-5 text-[#E01E5A]" />,
        "Native DLP (Slack Connect Only)": <Shield className="h-5 w-5 text-[#E01E5A]" />,
        "Audit Logs API": <Database className="h-5 w-5 text-[#E01E5A]" />,
        "Audit Logs (Native Dashboard)": <Database className="h-5 w-5 text-[#E01E5A]" />,
        "Discovery/DLP API": <Shield className="h-5 w-5 text-[#E01E5A]" />,
        "Exports (Public Data)": <Database className="h-5 w-5 text-[#E01E5A]" />,
        "Exports (Full Data)": <Database className="h-5 w-5 text-[#E01E5A]" />,
        "Exports (Single User Exports)": <Database className="h-5 w-5 text-[#E01E5A]" />,
        "Custom Terms of Service": <FileText className="h-5 w-5 text-[#2EB67D]" />,
        "Approve Workspaces": <Settings className="h-5 w-5 text-[#4A154B]" />,
        "Data Residency (IDR)": <Database className="h-5 w-5 text-[#E01E5A]" />,
        "Customer Support Tier": <MessageSquare className="h-5 w-5 text-[#36C5F0]" />,
        "99.99% Guaranteed Uptime SLA": <Zap className="h-5 w-5 text-[#ECB22E]" />,
        Integrations: <Zap className="h-5 w-5 text-[#ECB22E]" />,
    };

    return iconMap[feature] || <Zap className="h-5 w-5 text-[#ECB22E]" />;
};

// Add a function to categorize features
const categorizeFeatures = (features: string[]) => {
    if (!features || features.length === 0) {
        return {};
    }

    const categories: Record<string, string[]> = {
        "Collaboration Tools": [
            "Canvas",
            "Custom Canvas Templates",
            "Slack Sales Templates",
            "Clips",
            "Slack Connect (Shared Channels)",
            "Multi-Workspace Channels",
            "Lists",
            "Slack Channel Templates",
            "Workflow Builder",
            "Slack AI",
        ],
        "Administration & Analytics": [
            "Granular Admin Roles",
            "Central Channel Dashboard",
            "Admin API",
            "Analytics API (Members)",
            "Analytics API (Conversations)",
            "App Analytics",
            "Message Activity",
            "Approve Workspaces",
        ],
        "Security & Compliance": [
            "Custom Retention Policies (Workspace)",
            "Custom Retention Policies (Org-Wide)",
            "SAML SSO",
            "Multi-SAML SSO",
            "Session Duration",
            "Session Management",
            "MDM (Mobile Device Management)",
            "MAM (Mobile Application Management)",
            "EKM (Enterprise Key Management)",
            "Block File Downloads/Copying (Desktop)",
            "Legal Holds",
            "Information Barriers",
            "DLP (Data Loss Prevention)",
            "Native DLP (Slack Connect Only)",
            "Audit Logs API",
            "Audit Logs (Native Dashboard)",
            "Discovery/DLP API",
            "Data Residency (IDR)",
        ],
        "External Collaboration": [
            "Guests",
            "Sponsored Connections - Slack Connect",
            "Per-Org Customization - Slack Connect",
            "Channel Posting Permissions",
            "Lock Guest Names",
        ],
        "User Management": [
            "SCIM API",
            "SCIM API (Guest Provisioning)",
            "Atlas",
            "User Groups",
            "IDP Groups",
            "Domain Claiming (create workspace)",
            "Google OAuth 2.0",
        ],
        "Data & Exports": ["Exports (Public Data)", "Exports (Full Data)", "Exports (Single User Exports)"],
        "Support & Reliability": ["Customer Support Tier", "99.99% Guaranteed Uptime SLA"],
        "Other Features": [],
    };

    // Create a map of categorized features
    const categorized: Record<string, string[]> = {};

    // First, add all features that match our predefined categories
    for (const category in categories) {
        const categoryFeatures = features.filter((feature) => categories[category].includes(feature));

        if (categoryFeatures.length > 0) {
            categorized[category] = categoryFeatures;
        }
    }

    // Then add any remaining features to "Other Features"
    const otherFeatures = features.filter((feature) => {
        for (const category in categories) {
            if (category !== "Other Features" && categories[category].includes(feature)) {
                return false;
            }
        }
        return true;
    });

    if (otherFeatures.length > 0) {
        categorized["Other Features"] = otherFeatures;
    }

    return categorized;
};

// Add a function to get section colors
const getSectionColor = (category: string) => {
    const colorMap: Record<string, string> = {
        "Collaboration Tools": "#36C5F0", // Slack Blue
        "Administration & Analytics": "#4A154B", // Slack Purple
        "Security & Compliance": "#E01E5A", // Slack Red
        "External Collaboration": "#2EB67D", // Slack Green
        "User Management": "#ECB22E", // Slack Yellow
        "Data & Exports": "#E01E5A", // Slack Red
        "Support & Reliability": "#36C5F0", // Slack Blue
        "Other Features": "#4A154B", // Slack Purple
    };

    return colorMap[category] || "#4A154B"; // Default to Slack Purple
};

/* // Function to get the category for a feature
const getFeatureCategory = (feature: string) => {
    const categories: Record<string, string[]> = {
        "Collaboration Tools": [
            "Canvas",
            "Custom Canvas Templates",
            "Slack Sales Templates",
            "Clips",
            "Slack Connect (Shared Channels)",
            "Multi-Workspace Channels",
            "Lists",
            "Slack Channel Templates",
            "Workflow Builder",
            "Slack AI",
        ],
        "Administration & Analytics": [
            "Granular Admin Roles",
            "Central Channel Dashboard",
            "Admin API",
            "Analytics API (Members)",
            "Analytics API (Conversations)",
            "App Analytics",
            "Message Activity",
            "Approve Workspaces",
        ],
        "Security & Compliance": [
            "Custom Retention Policies (Workspace)",
            "Custom Retention Policies (Org-Wide)",
            "SAML SSO",
            "Multi-SAML SSO",
            "Session Duration",
            "Session Management",
            "MDM (Mobile Device Management)",
            "MAM (Mobile Application Management)",
            "EKM (Enterprise Key Management)",
            "Block File Downloads/Copying (Desktop)",
            "Legal Holds",
            "Information Barriers",
            "DLP (Data Loss Prevention)",
            "Native DLP (Slack Connect Only)",
            "Audit Logs API",
            "Audit Logs (Native Dashboard)",
            "Discovery/DLP API",
            "Data Residency (IDR)",
        ],
        "External Collaboration": [
            "Guests",
            "Sponsored Connections - Slack Connect",
            "Per-Org Customization - Slack Connect",
            "Channel Posting Permissions",
            "Lock Guest Names",
        ],
        "User Management": [
            "SCIM API",
            "SCIM API (Guest Provisioning)",
            "Atlas",
            "User Groups",
            "IDP Groups",
            "Domain Claiming (create workspace)",
            "Google OAuth 2.0",
        ],
        "Data & Exports": ["Exports (Public Data)", "Exports (Full Data)", "Exports (Single User Exports)"],
        "Support & Reliability": ["Customer Support Tier", "99.99% Guaranteed Uptime SLA"],
    };

    for (const category in categories) {
        if (categories[category].includes(feature)) {
            return category;
        }
    }

    return "Other Features";
}; */

// Update the PlanComparisonTool component to include these new state variables
export default function PlanComparisonTool() {
    const [currentPlan, setCurrentPlan] = useState("free");
    const [futurePlan, setFuturePlan] = useState("pro");
    const [lineOfBusiness, setLineOfBusiness] = useState("");
    const [upgradeFeatures, setUpgradeFeatures] = useState<string[]>([]);
    const [categorizedFeatures, setCategorizedFeatures] = useState<Record<string, string[]>>({});
    const [painPoints, setPainPoints] = useState<{ [key: string]: string }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Function to get upgrade features
    const getUpgradeFeatures = (current: string, future: string) => {
        const addedFeatures: string[] = [];

        for (const feature in featureData.featureAvailability) {
            const currentAccess = featureData.featureAvailability[feature as keyof typeof featureData.featureAvailability][current as keyof typeof featureData.featureAvailability[keyof typeof featureData.featureAvailability]] ?? false;
            const futureAccess = featureData.featureAvailability[feature as keyof typeof featureData.featureAvailability][future as keyof typeof featureData.featureAvailability[keyof typeof featureData.featureAvailability]] ?? false;

            // Add feature if it's available in future plan but not in current plan
            if (currentAccess !== futureAccess && futureAccess) {
                addedFeatures.push(feature);
            }
        }

        return addedFeatures;
    };

    // Function to get LOB pain points
    const getLOBPainPoints = (features: string[], lob: string) => {
        const relevantPainPoints: { [key: string]: string } = {};

        features.forEach((feature) => {
            const painPoint = featureData.featurePainPoints[feature as keyof typeof featureData.featurePainPoints];
            if (painPoint && painPoint[lob as keyof typeof painPoint]) {
                relevantPainPoints[feature] = painPoint[lob as keyof typeof painPoint] as string;
            }
        });

        return relevantPainPoints;
    };

    // Simplified handleSubmit function without Promise
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Use setTimeout directly
        setTimeout(() => {
            try {
                // Get features that are in future plan but not in current plan
                const features = getUpgradeFeatures(currentPlan, futurePlan);
                setUpgradeFeatures(features);

                // Categorize the features
                const categorized = categorizeFeatures(features);
                setCategorizedFeatures(categorized);

                // Get pain points if line of business is selected
                if (lineOfBusiness) {
                    const lobPainPoints = getLOBPainPoints(features, lineOfBusiness);
                    setPainPoints(lobPainPoints);
                } else {
                    setPainPoints({});
                }

                setIsSubmitted(true);

                // Track event (would connect to analytics in production)
                console.log("Tracking: Upgrade Features Viewed", {
                    currentPlan,
                    futurePlan,
                    lineOfBusiness,
                    featuresCount: features.length,
                });
            } catch (error) {
                console.error("Error during plan comparison:", error);
            } finally {
                setIsLoading(false);
            }
        }, 800);
    };

    const planOptions = [
        { value: "free", label: "Free" },
        { value: "pro", label: "Pro" },
        { value: "plus", label: "Business Plus" },
        { value: "grid", label: "Enterprise Grid" },
    ];

    const lobOptions = [
        { value: "", label: "Select Line of Business (Optional)" },
        { value: "it", label: "IT" },
        { value: "sales", label: "Sales" },
        { value: "hr", label: "Human Resources" },
        { value: "marketing", label: "Marketing" },
        { value: "finance", label: "Finance" },
        { value: "customer_support", label: "Customer Support" },
        { value: "operations", label: "Operations" },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-[#4A154B] text-white">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <svg viewBox="0 0 54 54" className="h-8 w-8 text-white" fill="currentColor">
                                <path d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386" />
                                <path d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387" />
                                <path d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386" />
                                <path d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.25m14.336-.001v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.25a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387" />
                            </svg>
                            <h1 className="text-xl font-bold">Slack Plan Comparison</h1>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-[#4A154B]">Find the right Slack plan for your team</h2>
                    <p className="mt-2 text-gray-600">Compare plans to see what features you'll gain by upgrading</p>
                </div>

                <div className="grid gap-8 md:grid-cols-12">
                    {/* Left Column - Form */}
                    <div className="md:col-span-4">
                        <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-semibold text-[#36C5F0]">Select Options</h3>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="currentPlan" className="mb-1 block font-medium text-[#36C5F0]">
                                        Current Plan
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="currentPlan"
                                            value={currentPlan}
                                            onChange={(e) => setCurrentPlan(e.target.value)}
                                            className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 shadow-sm focus:border-[#36C5F0] focus:outline-none focus:ring-2 focus:ring-[#36C5F0]/50"
                                            disabled={isLoading}
                                        >
                                            {planOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="futurePlan" className="mb-1 block font-medium text-[#36C5F0]">
                                        Future Plan
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="futurePlan"
                                            value={futurePlan}
                                            onChange={(e) => setFuturePlan(e.target.value)}
                                            className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 shadow-sm focus:border-[#36C5F0] focus:outline-none focus:ring-2 focus:ring-[#36C5F0]/50"
                                            disabled={isLoading}
                                        >
                                            {planOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="lineOfBusiness" className="mb-1 block font-medium text-[#36C5F0]">
                                        Line of Business
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="lineOfBusiness"
                                            value={lineOfBusiness}
                                            onChange={(e) => setLineOfBusiness(e.target.value)}
                                            className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 shadow-sm focus:border-[#36C5F0] focus:outline-none focus:ring-2 focus:ring-[#36C5F0]/50"
                                            disabled={isLoading}
                                        >
                                            {lobOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full rounded-full bg-[#36C5F0] px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-[#2EAAD3] focus:outline-none focus:ring-2 focus:ring-[#36C5F0]/50 focus:ring-offset-2 disabled:opacity-70"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center">
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Comparing Plans...
                                        </span>
                                    ) : (
                                        "Compare Plans"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column - Results */}
                    <div className="md:col-span-8">
                        {!isSubmitted ? (
                            <div className="flex h-full items-center justify-center rounded-lg bg-gray-50 p-8 text-center">
                                <div>
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ECF4FB]">
                                        <ArrowRight className="h-8 w-8 text-[#36C5F0]" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">Select plans to compare</h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Choose your current and future plans to see what features you'll gain by upgrading
                                    </p>
                                </div>
                            </div>
                        ) : (
              <div className="rounded-lg bg-white shadow-sm">
                {/* Tabs/Info Bar */}
                <div className="flex items-center justify-between border-b px-6 py-3">
                  <div className="font-medium text-[#36C5F0]">Upgrade Features</div>
                  {isSubmitted && lineOfBusiness && (
                    <div className="flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm">
                      <div className="mr-1 font-medium text-gray-700">
                        {lobOptions.find((option) => option.value === lineOfBusiness)?.label} View
                      </div>
                      <div className="h-2 w-2 rounded-full bg-[#E01E5A]"></div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-4 flex items-center">
                    <div className="flex items-center space-x-2">
                      <div className="rounded-md bg-gray-100 px-2 py-1 text-sm font-medium text-gray-800">
                        {planOptions.find((option) => option.value === currentPlan)?.label}
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <div className="rounded-md bg-[#4A154B] px-2 py-1 text-sm font-medium text-white">
                        {planOptions.find((option) => option.value === futurePlan)?.label}
                      </div>
                    </div>
                  </div>

                  <h3 className="mb-4 text-xl font-semibold text-[#4A154B]">Features you'll gain by upgrading</h3>

                  {upgradeFeatures.length === 0 ? (
                    <div className="rounded-lg bg-gray-50 p-4 text-center text-gray-500">
                      No additional features available in this upgrade path.
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {Object.entries(categorizedFeatures).map(([category, features]) => (
                        <div key={category}>
                          <h4 className="mb-3 text-lg font-medium" style={{ color: getSectionColor(category) }}>
                            {category}
                          </h4>
                          <div className="grid gap-4 sm:grid-cols-2">
                            {features.map((feature) => {
                              const hasPainPoint = lineOfBusiness && painPoints[feature];

                              return (
                                <div
                                  key={feature}
                                  className={`group relative rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md ${
                                    hasPainPoint ? "border-l-4 border-l-[#E01E5A] border-gray-200" : "border-gray-200"
                                  }`}
                                >
                                  <div className="mb-2 flex items-start">
                                    <div className="mr-3 mt-0.5 flex-shrink-0">{getFeatureIcon(feature)}</div>
                                    <div className="w-full">
                                      <h4 className="font-semibold text-[#4A154B]">{feature}</h4>
                                      <p className="mt-1 text-sm text-gray-600">
                                        {featureData.featureDescriptions[feature as keyof typeof featureData.featureDescriptions] || "No description available."}
                                      </p>

                                      {hasPainPoint && (
                                        <div className="mt-3 border-t border-dashed border-gray-200 pt-3">
                                          <div className="flex items-center">
                                            <div className="mr-2 h-2 w-2 rounded-full bg-[#E01E5A]"></div>
                                            <h5 className="text-sm font-medium text-[#E01E5A]">
                                              {lobOptions.find((option) => option.value === lineOfBusiness)?.label} Pain
                                              Point
                                            </h5>
                                          </div>
                                          <p className="mt-1 text-sm text-gray-700">{painPoints[feature]}</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
                </div>
        </div>
      </main >

        <footer className="bg-gray-50 py-8">
            <div className="container mx-auto px-4 text-center text-sm text-gray-500">
                <p>© {new Date().getFullYear()} Slack Technologies, LLC, a Salesforce company. All rights reserved.</p>
                <div className="mt-2 flex justify-center space-x-4">
                    <a href="#" className="hover:text-[#1264A3] hover:underline">
                        Privacy
                    </a>
                    <a href="#" className="hover:text-[#1264A3] hover:underline">
                        Terms
                    </a>
                    <a href="#" className="hover:text-[#1264A3] hover:underline">
                        Cookie Preferences
                    </a>
                    <a href="#" className="hover:text-[#1264A3] hover:underline">
                        Contact Us
                    </a>
                </div>
            </div>
        </footer>
    </div >
  );
}