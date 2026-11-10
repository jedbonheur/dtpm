import { defineConfig } from "vitest/config";

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
    include: ["apps/**/*.e2e.test.ts", "packages/**/*.e2e.test.ts"],
    passWithNoTests: false,
    fileParallelism: false,
  },
});
