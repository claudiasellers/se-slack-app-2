#!/usr/bin/env node
/**
 * stdio entrypoint - for Claude Desktop, Claude Code and any other local MCP client.
 *
 * Nothing may be written to stdout except protocol traffic, so all logging
 * goes to stderr.
 */

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { APP_URL, DATA_MODE, SERVER_NAME, SERVER_VERSION } from "./constants.js";
import { createServer } from "./server.js";

async function main(): Promise<void> {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    process.stdout.write(
      `${SERVER_NAME} v${SERVER_VERSION}\n\n` +
        `MCP server for the Slack Plan Comparison Tool (${APP_URL}).\n\n` +
        `Usage:\n` +
        `  slack-plan-comparison-mcp-server            Run over stdio (default)\n` +
        `  node dist/http.js                           Run as a streamable HTTP server\n\n` +
        `Environment:\n` +
        `  SLACKPLAN_DATA_MODE       "remote" (default) or "bundled" to disable network reads\n` +
        `  SLACKPLAN_BRANCH          Git branch to read data from (default: main)\n` +
        `  SLACKPLAN_CACHE_TTL_MS    Cache lifetime in ms (default: 600000)\n` +
        `  GITHUB_TOKEN              Optional, raises the GitHub API rate limit for freshness checks\n` +
        `  PORT                      HTTP port (http transport only, default 3000)\n`,
    );
    return;
  }

  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error(`${SERVER_NAME} v${SERVER_VERSION} running on stdio (data mode: ${DATA_MODE}).`);
}

main().catch((error: unknown) => {
  console.error("Fatal error starting the server:", error);
  process.exit(1);
});
