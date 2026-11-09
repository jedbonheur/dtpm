-- Up Migration
-- Phase 0 migration smoke only — no product/delivery schema (P00-WP03).
-- Migration tooling is Phase 0 baseline; TDD §35 ORM/query vendors remain pending approval.

CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS _phase0_migration_smoke (
  id integer PRIMARY KEY,
  note text NOT NULL DEFAULT 'p00-wp03'
);

INSERT INTO _phase0_migration_smoke (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- Down Migration

DROP TABLE IF EXISTS _phase0_migration_smoke;

DROP EXTENSION IF EXISTS postgis;
