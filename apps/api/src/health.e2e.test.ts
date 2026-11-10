/**
 * API HTTP E2E (P00-WP06 contracts on Fastify).
 * Uses Fastify inject — no browser harness (TDD §35 web/mobile still open).
 */

import { describe, expect, it } from "vitest";

import { createTestEnv } from "@dtpm/testing";

import { buildApp } from "./index.js";

describe("api health e2e (Fastify)", () => {
  it("GET /health returns ok skeleton payload", async () => {
    const { app } = await buildApp({ env: createTestEnv() });

    const response = await app.inject({ method: "GET", url: "/health" });

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.json()).toMatchObject({
      ok: true,
      service: "api",
      mode: "skeleton",
      providersMode: "fake",
    });
    expect(typeof response.json().correlationId).toBe("string");
    expect(response.json().correlationId.length).toBeGreaterThan(0);

    await app.close();
  });

  it("GET /example-error returns shared ApiErrorEnvelope", async () => {
    const { app } = await buildApp({ env: createTestEnv() });

    const response = await app.inject({ method: "GET", url: "/example-error" });

    expect(response.statusCode).toBe(404);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.json().error).toMatchObject({
      code: "EXAMPLE_NOT_FOUND",
      message: "Example resource was not found",
    });
    expect(typeof response.json().error.correlationId).toBe("string");
    expect(response.json().error.correlationId.length).toBeGreaterThan(0);

    await app.close();
  });
});
