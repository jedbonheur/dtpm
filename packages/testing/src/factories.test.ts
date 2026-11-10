import { describe, expect, it } from "vitest";
import { loadConfig } from "@dtpm/config";
import { createTestCorrelationId, createTestEnv } from "./index.js";

describe("createTestEnv", () => {
  it("produces an env that loadConfig accepts", () => {
    const env = createTestEnv();
    const config = loadConfig(env);
    expect(config.providersMode).toBe("fake");
    expect(config.databaseUrl).toBe(env.DATABASE_URL);
    expect(config.redisUrl).toBe(env.REDIS_URL);
  });

  it("applies overrides", () => {
    const env = createTestEnv({ PORT: "8080" });
    expect(loadConfig(env).port).toBe(8080);
  });
});

describe("createTestCorrelationId", () => {
  it("returns a fixed id when provided", () => {
    expect(createTestCorrelationId("fixed-id")).toBe("fixed-id");
  });

  it("returns a non-empty id by default", () => {
    expect(createTestCorrelationId().length).toBeGreaterThan(0);
  });
});
