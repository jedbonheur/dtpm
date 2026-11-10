/**
 * Phase 0 DB integration example (P00-WP06).
 * Uses node:test (not Vitest) so the CJS `pg` driver loads without Vite ESM interop breakage.
 *
 * Requires local Postgres/PostGIS with migrations applied:
 *   pnpm deps:up && pnpm db:migrate
 */

import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { after, before, describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const require = createRequire(join(dirname(fileURLToPath(import.meta.url)), "../package.json"));
const { Client } = require("pg");

/** Mirrors `@dtpm/testing` createTestEnv defaults (fake providers + local compose URLs). */
const DATABASE_URL = process.env.DATABASE_URL?.trim() || "postgres://dtpm:dtpm@localhost:5432/dtpm";

describe("phase0 persistence smoke (integration)", () => {
  /** @type {import('pg').Client} */
  let client;

  before(async () => {
    client = new Client({ connectionString: DATABASE_URL });
    try {
      await client.connect();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(
        `DB integration example could not connect to Postgres at ${DATABASE_URL}. ` +
          `Run \`pnpm deps:up && pnpm db:migrate\` first. Underlying error: ${message}`,
      );
    }
  });

  after(async () => {
    await client.end();
  });

  it("has PostGIS enabled", async () => {
    const result = await client.query("SELECT PostGIS_Version() AS version");
    assert.equal(result.rowCount, 1);
    assert.ok(result.rows[0]?.version);
  });

  it("retains the WP03 migration smoke row", async () => {
    const result = await client.query(
      "SELECT id, note FROM _phase0_migration_smoke WHERE id = $1",
      [1],
    );
    assert.equal(result.rowCount, 1);
    assert.deepEqual(result.rows[0], { id: 1, note: "p00-wp03" });
  });
});
