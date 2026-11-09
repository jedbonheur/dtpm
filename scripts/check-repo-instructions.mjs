#!/usr/bin/env node
/**
 * Minimal TDD §30.2 item-1 stub: assert Phase 0 instruction anchors exist.
 * Not a full generated-artifact / schema gate — later packets extend this.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

function requireFile(relPath) {
  const abs = join(root, relPath);
  if (!existsSync(abs)) {
    failures.push(`missing required file: ${relPath}`);
  }
}

requireFile("AGENTS.md");
requireFile("CONTRIBUTING.md");
requireFile("package.json");

const packageJsonPath = join(root, "package.json");
if (existsSync(packageJsonPath)) {
  try {
    const pkg = JSON.parse(readFileSync(packageJsonPath, "utf8"));
    if (typeof pkg.packageManager !== "string" || pkg.packageManager.length === 0) {
      failures.push("package.json must declare a non-empty packageManager field");
    }
  } catch (err) {
    failures.push(
      `package.json is not valid JSON: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}

if (failures.length > 0) {
  console.error("check-repo-instructions failed:");
  for (const failure of failures) {
    console.error(`  - ${failure}`);
  }
  process.exit(1);
}

console.log("check-repo-instructions: AGENTS.md, CONTRIBUTING.md, and packageManager OK");
