import { describe, expect, it } from "vitest";
import { createApiError, createCorrelationId, createLogger } from "./index.js";

describe("ApiErrorEnvelope", () => {
  it("builds the shared error shape with correlation id", () => {
    const correlationId = createCorrelationId();
    const envelope = createApiError({
      code: "EXAMPLE_ERROR",
      message: "Example client-safe message",
      correlationId,
      details: { field: "x" },
    });

    expect(envelope).toEqual({
      error: {
        code: "EXAMPLE_ERROR",
        message: "Example client-safe message",
        correlationId,
        details: { field: "x" },
      },
    });
  });

  it("omits details when not provided", () => {
    const correlationId = "corr-fixed";
    const envelope = createApiError({
      code: "EXAMPLE_ERROR",
      message: "msg",
      correlationId,
    });
    expect(envelope.error.details).toBeUndefined();
    expect(Object.keys(envelope.error)).toEqual(["code", "message", "correlationId"]);
  });

  it("createCorrelationId returns a non-empty string", () => {
    const id = createCorrelationId();
    expect(typeof id).toBe("string");
    expect(id.length).toBeGreaterThan(0);
  });
});

describe("createLogger", () => {
  it("exports structured log methods", () => {
    const log = createLogger({ correlationId: "c1", resource: "api" });
    expect(typeof log.info).toBe("function");
    expect(typeof log.error).toBe("function");
    // smoke: does not throw
    log.info("hello", { result: "ok" });
  });
});
