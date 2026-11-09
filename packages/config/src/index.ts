/**
 * Typed environment configuration (P00-WP04).
 *
 * Hand-rolled parse — Phase 0 baseline only; TDD §35 validation libraries remain pending.
 * Fails fast on missing or invalid required local env.
 */

export type ProvidersMode = "fake";

export type AppConfig = {
  providersMode: ProvidersMode;
  databaseUrl: string;
  redisUrl: string;
  port: number;
};

export class ConfigError extends Error {
  readonly missing: string[];
  readonly invalid: string[];

  constructor(message: string, missing: string[] = [], invalid: string[] = []) {
    super(message);
    this.name = "ConfigError";
    this.missing = missing;
    this.invalid = invalid;
  }
}

const DEFAULT_PORT = 3000;

function readRequired(
  env: NodeJS.ProcessEnv | Record<string, string | undefined>,
  key: string,
  missing: string[],
): string | undefined {
  const raw = env[key];
  if (raw === undefined || raw.trim() === "") {
    missing.push(key);
    return undefined;
  }
  return raw.trim();
}

/**
 * Parse and validate application config from an env map (defaults to `process.env`).
 * Throws {@link ConfigError} listing missing/invalid keys.
 */
export function loadConfig(
  env: NodeJS.ProcessEnv | Record<string, string | undefined> = process.env,
): AppConfig {
  const missing: string[] = [];
  const invalid: string[] = [];

  const providersModeRaw = readRequired(env, "DTPM_PROVIDERS_MODE", missing);
  const databaseUrl = readRequired(env, "DATABASE_URL", missing);
  const redisUrl = readRequired(env, "REDIS_URL", missing);

  let providersMode: ProvidersMode | undefined;
  if (providersModeRaw !== undefined) {
    if (providersModeRaw === "fake") {
      providersMode = "fake";
    } else {
      invalid.push(
        `DTPM_PROVIDERS_MODE (expected "fake" for Phase 0 local/test; got "${providersModeRaw}")`,
      );
    }
  }

  let port = DEFAULT_PORT;
  const portRaw = env.PORT;
  if (portRaw !== undefined && portRaw.trim() !== "") {
    const parsed = Number.parseInt(portRaw.trim(), 10);
    if (!Number.isFinite(parsed) || parsed < 1 || parsed > 65535) {
      invalid.push(`PORT (expected integer 1–65535; got "${portRaw.trim()}")`);
    } else {
      port = parsed;
    }
  }

  if (
    missing.length > 0 ||
    invalid.length > 0 ||
    providersMode === undefined ||
    databaseUrl === undefined ||
    redisUrl === undefined
  ) {
    const parts: string[] = [];
    if (missing.length > 0) {
      parts.push(`missing required: ${missing.join(", ")}`);
    }
    if (invalid.length > 0) {
      parts.push(`invalid: ${invalid.join("; ")}`);
    }
    throw new ConfigError(
      `Invalid application configuration (${parts.join("; ") || "incomplete"}). See .env.example.`,
      missing,
      invalid,
    );
  }

  return {
    providersMode,
    databaseUrl,
    redisUrl,
    port,
  };
}
