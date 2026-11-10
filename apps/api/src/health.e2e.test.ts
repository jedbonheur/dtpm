/**
 * Phase 0 E2E example (P00-WP06): hit stub API routes with supertest.
 * No browser harness — TDD §35 web/mobile stacks remain pending.
 */

import request from "supertest";
import { describe, expect, it } from "vitest";

import { createTestEnv } from "@dtpm/testing";

import { createHttpServer, createRuntime } from "./index.js";

describe("api health e2e (P00-WP06)", () => {
  const runtime = createRuntime(createTestEnv());
  const server = createHttpServer(runtime);

  it("GET /health returns ok skeleton payload", async () => {
    const response = await request(server)
      .get("/health")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toMatchObject({
      ok: true,
      service: "api",
      mode: "skeleton",
      providersMode: "fake",
    });
    expect(typeof response.body.correlationId).toBe("string");
    expect(response.body.correlationId.length).toBeGreaterThan(0);
  });

  it("GET /example-error returns shared ApiErrorEnvelope", async () => {
    const response = await request(server)
      .get("/example-error")
      .expect(404)
      .expect("Content-Type", /json/);

    expect(response.body.error).toMatchObject({
      code: "EXAMPLE_NOT_FOUND",
      message: "Example resource was not found",
      correlationId: runtime.correlationId,
    });
  });
});
