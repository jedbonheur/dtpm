/**
 * Test factories / fakes (P00-WP04).
 *
 * Phase 0: env + correlation helpers only — no delivery/payment domain entities.
 */

import { createCorrelationId, type CorrelationId } from "@dtpm/observability";

export type TestEnv = {
  DTPM_PROVIDERS_MODE: string;
  DATABASE_URL: string;
  REDIS_URL: string;
  PORT?: string;
};

const DEFAULT_TEST_ENV: TestEnv = {
  DTPM_PROVIDERS_MODE: "fake",
  DATABASE_URL: "postgres://dtpm:dtpm@localhost:5432/dtpm",
  REDIS_URL: "redis://localhost:6379",
};

/**
 * Complete valid env map for {@link loadConfig} from `@dtpm/config`.
 * Pass overrides to exercise failure or alternate local values.
 */
export function createTestEnv(overrides: Partial<TestEnv> = {}): TestEnv {
  return {
    ...DEFAULT_TEST_ENV,
    ...overrides,
  };
}

/** Stable-enough correlation id for unit tests (real UUID by default). */
export function createTestCorrelationId(fixed?: string): CorrelationId {
  return fixed ?? createCorrelationId();
}
