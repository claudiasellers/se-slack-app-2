// stdio entry point for the slack-plans MCP server.
// Run directly:  npx tsx mcp/index.ts
// Inspect:       npx @modelcontextprotocol/inspector npx tsx mcp/index.ts

import { serveStdio } from "@modelcontextprotocol/server/stdio"

import { createServer } from "./server"

void serveStdio(createServer)

// stdout is the JSON-RPC channel — never log there.
console.error("slack-plans MCP server running on stdio")
