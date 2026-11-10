/**
 * API process (P00 stub → Fastify).
 * TDD §35 item 3: Fastify approved by @bonheurjed (2026-11-10).
 * Fastify 4.x — Node 20 baseline (CI / engines); Fastify 5 needs Node ≥22.
 */

import { argv } from "node:process";
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
import Fastify, { type FastifyInstance } from "fastify";

export type HealthPayload = {
  ok: true;
  service: "api";
  mode: "skeleton";
  providersMode: AppConfig["providersMode"];
  correlationId: CorrelationId;
};

export type ApiRuntime = {
  config: AppConfig;
  /** Process-level correlation for startup logs; prefer per-request ids on responses. */
  correlationId: CorrelationId;
  log: Logger;
  health: HealthPayload;
  exampleError: ApiErrorEnvelope;
};

export type StartedServer = ApiRuntime & {
  app: FastifyInstance;
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

export type BuildAppOptions = {
  env?: NodeJS.ProcessEnv | Record<string, string | undefined>;
  /** Optional pre-built runtime (tests). */
  runtime?: ApiRuntime;
};

declare module "fastify" {
  interface FastifyRequest {
    correlationId: CorrelationId;
  }
}

export const createRuntime = (
  env: NodeJS.ProcessEnv | Record<string, string | undefined> = process.env,
): ApiRuntime => {
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
};

/** Build an unstarted Fastify app (use {@link FastifyInstance.inject} in tests). */
export const buildApp = async (
  options: BuildAppOptions = {},
): Promise<{
  app: FastifyInstance;
  runtime: ApiRuntime;
}> => {
  const runtime = options.runtime ?? createRuntime(options.env ?? process.env);
  const app = Fastify({ logger: false });

  app.decorateRequest("correlationId", "");
  app.addHook("onRequest", async (request) => {
    request.correlationId = createCorrelationId();
  });

  app.get("/health", async (request) => {
    return {
      ...runtime.health,
      correlationId: request.correlationId,
    } satisfies HealthPayload;
  });

  app.get("/example-error", async (request, reply) => {
    const body = createApiError({
      code: "EXAMPLE_NOT_FOUND",
      message: "Example resource was not found",
      correlationId: request.correlationId,
    });
    return reply.status(404).send(body);
  });

  app.setNotFoundHandler(async (request, reply) => {
    return reply.status(404).send(
      createApiError({
        code: "NOT_FOUND",
        message: `No route for ${request.method} ${request.url}`,
        correlationId: request.correlationId,
      }),
    );
  });

  await app.ready();
  return { app, runtime };
};

/**
 * Start the API HTTP server.
 * Prefer {@link buildApp} + `inject` for E2E; use this for `pnpm start:api`.
 */
export const startServer = async (options: StartServerOptions = {}): Promise<StartedServer> => {
  const { app, runtime } = await buildApp({ env: options.env ?? process.env });
  const listenPort = options.port ?? runtime.config.port;

  runtime.log.info("dtpm api starting", {
    result: "ok",
    providersMode: runtime.config.providersMode,
    port: listenPort,
    framework: "fastify",
  });

  await app.listen({ port: listenPort, host: "127.0.0.1" });
  const address = app.server.address();
  if (address === null || typeof address === "string") {
    await app.close();
    throw new Error("API server failed to bind a TCP port");
  }

  const port = address.port;
  runtime.log.info("dtpm api listening", {
    result: "ok",
    port,
    framework: "fastify",
  });

  return {
    ...runtime,
    app,
    port,
    close: () => app.close(),
  };
};

const isExecutedDirectly = (): boolean => {
  const entry = argv[1];
  if (!entry) {
    return false;
  }
  return import.meta.url === pathToFileURL(entry).href;
};

if (isExecutedDirectly()) {
  const started = await startServer();
  console.log(JSON.stringify(started.health));
  started.log.info("example error envelope ready", {
    result: "ok",
    errorCode: started.exampleError.error.code,
  });
}
