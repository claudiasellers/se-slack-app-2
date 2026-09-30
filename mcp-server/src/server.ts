/**
 * Builds the MCP server instance. Shared by both transports.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { SERVER_NAME, SERVER_VERSION } from "./constants.js";
import { registerTools } from "./tools/register.js";

export function createServer(): McpServer {
  const server = new McpServer(
    { name: SERVER_NAME, version: SERVER_VERSION },
    {
      instructions:
        "Tools for the Slack Plan Comparison Tool (https://claudiasellers.github.io/se-slack-app-2/), " +
        "an internal Slack SE resource mapping feature availability across Slack plans. " +
        "Use slackplan_compare_upgrade to answer 'what does a customer gain moving from X to Y'. " +
        "Use slackplan_comparison_matrix for side-by-side tables. " +
        "Pass line_of_business to frame features as customer pain points. " +
        "For legacy Pro / Business+ V1 / Grid V1 customers, pass from_add_ons: ['slack_ai'] if they " +
        "bought the Slack AI Add-on, or the comparison will oversell features they already have. " +
        "This data is maintained by hand and is not an official Slack pricing source - it is an " +
        "internal enablement aid, so verify customer-facing claims against the P&P matrix.",
    },
  );

  registerTools(server);
  return server;
}
