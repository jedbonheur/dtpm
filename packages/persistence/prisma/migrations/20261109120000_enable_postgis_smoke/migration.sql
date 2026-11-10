-- Phase 0 migration smoke only — no product/delivery schema.
-- PostGIS DDL is hand-edited (TDD §31 / TD-014); shadow/CI DBs must provide PostGIS.

CREATE EXTENSION IF NOT EXISTS postgis;

-- CreateTable
CREATE TABLE "_phase0_migration_smoke" (
    "id" INTEGER NOT NULL,
    "note" TEXT NOT NULL DEFAULT 'p00-wp03',

    CONSTRAINT "_phase0_migration_smoke_pkey" PRIMARY KEY ("id")
);

INSERT INTO "_phase0_migration_smoke" ("id")
VALUES (1)
ON CONFLICT ("id") DO NOTHING;
