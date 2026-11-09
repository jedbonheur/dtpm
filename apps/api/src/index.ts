/**
 * API stub (P00-WP01 / P00-WP04).
 * Loads typed config, emits structured health log, and demonstrates the shared error envelope.
 * No HTTP framework locked yet (TDD §35 pending) — WP06 may hang real routes on this shape.
 */

import { loadConfig } from "@dtpm/config";
import { createApiError, createCorrelationId, createLogger } from "@dtpm/observability";

const correlationId = createCorrelationId();
const log = createLogger({ resource: "api", correlationId });

const config = loadConfig();

log.info("dtpm api stub starting", {
  result: "ok",
  providersMode: config.providersMode,
  port: config.port,
});

const health = {
  ok: true,
  service: "api",
  mode: "skeleton",
  providersMode: config.providersMode,
  correlationId,
};

console.log(JSON.stringify(health));

/** Example error envelope for later contract/HTTP wiring (WP06) — not thrown at startup. */
const exampleError = createApiError({
  code: "EXAMPLE_NOT_FOUND",
  message: "Example resource was not found",
  correlationId,
});

log.info("example error envelope ready", {
  result: "ok",
  errorCode: exampleError.error.code,
});

export { config, exampleError, health };
