import { defineConfig } from "vitest/config";

const sourceFirstConditions = ["@dtpm/source", "import", "module", "default"];

export default defineConfig({
  resolve: {
    // Prefer workspace TypeScript sources over dist/ (see package exports @dtpm/source).
    conditions: sourceFirstConditions,
  },
  ssr: {
    resolve: {
      conditions: sourceFirstConditions,
      externalConditions: sourceFirstConditions,
    },
  },
  test: {
    include: ["apps/**/*.{test,spec}.ts", "packages/**/*.{test,spec}.ts"],
    passWithNoTests: true,
  },
});
