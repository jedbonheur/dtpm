/**
 * API stub (P00-WP01 / P00-WP04 / P00-WP06).
 * Typed config + structured logs + minimal node:http health surface for Phase 0 E2E.
 * No HTTP framework locked yet (TDD §35 pending).
 */

import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import { pathToFileURL } from "node:url";

import { loadConfig, type AppConfig } from "@dtpm/config";
import {
  createApiError,
  createCorrelationId,
  createLogger,
  type ApiErrorEnvelope,
  type CorrelationId,
  type Logger,
} from "@dtpm/observability";

export type HealthPayload = {
  ok: true;
  service: "api";
  mode: "skeleton";
  providersMode: AppConfig["providersMode"];
  correlationId: CorrelationId;
};

export type ApiRuntime = {
  config: AppConfig;
  correlationId: CorrelationId;
  log: Logger;
  health: HealthPayload;
  exampleError: ApiErrorEnvelope;
};

export type StartedServer = ApiRuntime & {
  server: Server;
  port: number;
  close: () => Promise<void>;
};

export type StartServerOptions = {
  /** Env map for {@link loadConfig}; defaults to `process.env`. */
  env?: NodeJS.ProcessEnv | Record<string, string | undefined>;
  /**
   * Listen port override. Use `0` in tests for an ephemeral port.
   * Defaults to `config.port` from env.
   */
  port?: number;
};

export function createRuntime(
  env: NodeJS.ProcessEnv | Record<string, string | undefined> = process.env,
): ApiRuntime {
  const correlationId = createCorrelationId();
  const log = createLogger({ resource: "api", correlationId });
  const config = loadConfig(env);

  const health: HealthPayload = {
    ok: true,
    service: "api",
    mode: "skeleton",
    providersMode: config.providersMode,
    correlationId,
  };

  const exampleError = createApiError({
    code: "EXAMPLE_NOT_FOUND",
    message: "Example resource was not found",
    correlationId,
  });

  return { config, correlationId, log, health, exampleError };
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(payload),
  });
  res.end(payload);
}

function handleRequest(runtime: ApiRuntime, req: IncomingMessage, res: ServerResponse): void {
  const method = req.method ?? "GET";
  const path = req.url?.split("?")[0] ?? "/";

  if (method === "GET" && path === "/health") {
    sendJson(res, 200, runtime.health);
    return;
  }

  if (method === "GET" && path === "/example-error") {
    sendJson(res, 404, runtime.exampleError);
    return;
  }

  sendJson(
    res,
    404,
    createApiError({
      code: "NOT_FOUND",
      message: `No route for ${method} ${path}`,
      correlationId: runtime.correlationId,
    }),
  );
}

/** Build an unstarted `node:http` server (supertest / listeners attach later). */
export function createHttpServer(runtime: ApiRuntime): Server {
  return createServer((req, res) => {
    handleRequest(runtime, req, res);
  });
}

/**
 * Start the Phase 0 stub HTTP server.
 * Prefer {@link createHttpServer} + supertest for E2E; use this for `pnpm start:api`.
 */
export async function startServer(options: StartServerOptions = {}): Promise<StartedServer> {
  const runtime = createRuntime(options.env ?? process.env);
  const listenPort = options.port ?? runtime.config.port;

  runtime.log.info("dtpm api stub starting", {
    result: "ok",
    providersMode: runtime.config.providersMode,
    port: listenPort,
  });

  const server = createHttpServer(runtime);

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(listenPort, "127.0.0.1", () => {
      server.off("error", reject);
      resolve();
    });
  });

  const address = server.address();
  if (address === null || typeof address === "string") {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
    throw new Error("API server failed to bind a TCP port");
  }

  const port = address.port;
  runtime.log.info("dtpm api stub listening", {
    result: "ok",
    port,
  });

  return {
    ...runtime,
    server,
    port,
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
      }),
  };
}

function isExecutedDirectly(): boolean {
  const entry = process.argv[1];
  if (!entry) {
    return false;
  }
  return import.meta.url === pathToFileURL(entry).href;
}

if (isExecutedDirectly()) {
  const started = await startServer();
  console.log(JSON.stringify(started.health));
  started.log.info("example error envelope ready", {
    result: "ok",
    errorCode: started.exampleError.error.code,
  });
}
