#!/usr/bin/env node
/**
 * Streamable HTTP entrypoint - for the hosted deployment (Heroku).
 *
 * Stateless: a fresh transport and server per request, which keeps horizontal
 * scaling trivial and avoids request-id collisions between clients.
 */

import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express, { type Request, type Response } from "express";

import { APP_URL, DATA_MODE, SERVER_NAME, SERVER_VERSION } from "./constants.js";
import { getDataset } from "./data/loader.js";
import { createServer } from "./server.js";

const MCP_PATH = process.env.SLACKPLAN_MCP_PATH ?? "/mcp";

/**
 * Optional shared-secret gate. Set SLACKPLAN_AUTH_TOKEN to require
 * `Authorization: Bearer <token>`. Left unset, the endpoint is open - fine
 * behind an internal network, not for a public URL.
 */
const AUTH_TOKEN = process.env.SLACKPLAN_AUTH_TOKEN;

/**
 * Comma-separated allowed Origin values. Browsers are not the expected client
 * here, but validating Origin protects against DNS-rebinding when this runs
 * locally.
 */
const ALLOWED_ORIGINS = (process.env.SLACKPLAN_ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

function jsonRpcError(res: Response, status: number, code: number, message: string): void {
  res.status(status).json({ jsonrpc: "2.0", error: { code, message }, id: null });
}

function authorize(req: Request, res: Response): boolean {
  const origin = req.get("origin");
  if (origin && ALLOWED_ORIGINS.length > 0 && !ALLOWED_ORIGINS.includes(origin)) {
    jsonRpcError(res, 403, -32600, "Origin not allowed.");
    return false;
  }

  if (AUTH_TOKEN) {
    const header = req.get("authorization") ?? "";
    const provided = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (provided !== AUTH_TOKEN) {
      jsonRpcError(res, 401, -32001, "Unauthorized. Supply 'Authorization: Bearer <token>'.");
      return false;
    }
  }

  return true;
}

async function main(): Promise<void> {
  const app = express();
  app.use(express.json({ limit: "1mb" }));
  app.disable("x-powered-by");

  // Health check for the platform's dyno probe.
  app.get("/healthz", async (_req: Request, res: Response) => {
    try {
      const dataset = await getDataset();
      res.json({
        status: "ok",
        server: SERVER_NAME,
        version: SERVER_VERSION,
        data_source: dataset.source,
        fetched_at: dataset.fetchedAt,
        features: Object.keys(dataset.featureData.featureAvailability).length,
        warnings: dataset.warnings,
      });
    } catch (error) {
      res.status(503).json({ status: "degraded", error: error instanceof Error ? error.message : String(error) });
    }
  });

  app.get("/", (_req: Request, res: Response) => {
    res.type("text/plain").send(
      `${SERVER_NAME} v${SERVER_VERSION}\n` +
        `MCP endpoint: POST ${MCP_PATH}\n` +
        `Health: GET /healthz\n` +
        `Web app: ${APP_URL}\n`,
    );
  });

  app.post(MCP_PATH, async (req: Request, res: Response) => {
    if (!authorize(req, res)) return;

    const server = createServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });

    res.on("close", () => {
      void transport.close();
      void server.close();
    });

    try {
      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      console.error("Error handling MCP request:", error);
      if (!res.headersSent) jsonRpcError(res, 500, -32603, "Internal server error.");
    }
  });

  // GET/DELETE on the MCP path are only meaningful for stateful sessions.
  const rejectStateful = (_req: Request, res: Response): void => {
    jsonRpcError(res, 405, -32000, "This server is stateless; use POST for MCP requests.");
  };
  app.get(MCP_PATH, rejectStateful);
  app.delete(MCP_PATH, rejectStateful);

  const port = Number.parseInt(process.env.PORT ?? "3000", 10);
  const host = process.env.SLACKPLAN_HOST ?? "0.0.0.0";

  app.listen(port, host, () => {
    console.error(
      `${SERVER_NAME} v${SERVER_VERSION} listening on http://${host}:${port}${MCP_PATH} ` +
        `(data mode: ${DATA_MODE}, auth: ${AUTH_TOKEN ? "bearer token" : "open"}).`,
    );
  });
}

main().catch((error: unknown) => {
  console.error("Fatal error starting the HTTP server:", error);
  process.exit(1);
});
