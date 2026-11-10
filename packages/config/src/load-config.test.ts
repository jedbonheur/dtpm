import { describe, expect, it } from "vitest";
import { ConfigError, loadConfig } from "./index.js";

const validEnv = {
  DTPM_PROVIDERS_MODE: "fake",
  DATABASE_URL: "postgres://dtpm:dtpm@localhost:5432/dtpm",
  REDIS_URL: "redis://localhost:6379",
};

describe("loadConfig", () => {
  it("parses a valid local env", () => {
    const config = loadConfig(validEnv);
    expect(config).toEqual({
      providersMode: "fake",
      databaseUrl: validEnv.DATABASE_URL,
      redisUrl: validEnv.REDIS_URL,
      port: 3000,
    });
  });

  it("honors optional PORT", () => {
    const config = loadConfig({ ...validEnv, PORT: "4000" });
    expect(config.port).toBe(4000);
  });

  it("fails fast when DTPM_PROVIDERS_MODE is missing", () => {
    const { DTPM_PROVIDERS_MODE: _, ...rest } = validEnv;
    expect(() => loadConfig(rest)).toThrow(ConfigError);
    try {
      loadConfig(rest);
    } catch (err) {
      expect(err).toBeInstanceOf(ConfigError);
      expect((err as ConfigError).missing).toContain("DTPM_PROVIDERS_MODE");
    }
  });

  it("fails fast when DATABASE_URL is missing", () => {
    const { DATABASE_URL: _, ...rest } = validEnv;
    expect(() => loadConfig(rest)).toThrow(ConfigError);
    try {
      loadConfig(rest);
    } catch (err) {
      expect((err as ConfigError).missing).toContain("DATABASE_URL");
    }
  });

  it("fails fast when REDIS_URL is missing", () => {
    const { REDIS_URL: _, ...rest } = validEnv;
    expect(() => loadConfig(rest)).toThrow(ConfigError);
    try {
      loadConfig(rest);
    } catch (err) {
      expect((err as ConfigError).missing).toContain("REDIS_URL");
    }
  });

  it("rejects non-fake providers mode in Phase 0", () => {
    expect(() => loadConfig({ ...validEnv, DTPM_PROVIDERS_MODE: "live" })).toThrow(ConfigError);
    try {
      loadConfig({ ...validEnv, DTPM_PROVIDERS_MODE: "live" });
    } catch (err) {
      expect((err as ConfigError).invalid.length).toBeGreaterThan(0);
    }
  });

  it("rejects invalid PORT", () => {
    expect(() => loadConfig({ ...validEnv, PORT: "nope" })).toThrow(ConfigError);
  });
});
