import { defineConfig } from "vitest/config";

/**
 * Reserved for future Vitest-based integration suites.
 * Phase 0 smoke uses `node:test` via `pnpm test:integration` because Vite ESM
 * interop breaks the CJS `pg` driver (`Class extends value [object Module]`).
 */
const sourceFirstConditions = ["@dtpm/source", "import", "module", "default"];

export default defineConfig({
  resolve: {
    conditions: sourceFirstConditions,
  },
  ssr: {
    resolve: {
      conditions: sourceFirstConditions,
      externalConditions: sourceFirstConditions,
    },
  },
  test: {
    include: ["apps/**/*.integration.test.ts", "packages/**/*.integration.test.ts"],
    passWithNoTests: true,
    fileParallelism: false,
  },
});
