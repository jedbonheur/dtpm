# Evidence: P00-WP03 (DRAFT — Implementer)

| Field       | Value                                       |
| ----------- | ------------------------------------------- |
| Packet      | P00-WP03                                    |
| Implementer | cursor-implementer (this session)           |
| Verifier    | {must differ from Implementer — not filled} |
| Date        | 2026-11-09                                  |
| Verdict     | pending Verifier                            |

## Commands run (Implementer observations — Verifier must re-run)

| Command                                                                                 | Where        | Observed result                                                                                               |
| --------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------- |
| `pnpm deps:up`                                                                          | `/home/dtpm` | pass — `postgis/postgis:16-3.4` and `redis:7-alpine` pulled; containers `dtpm-postgres`, `dtpm-redis` Started |
| `docker compose -f infra/local/compose.yaml ps` (after health)                          | `/home/dtpm` | pass — both services `healthy` on `5432` / `6379`                                                             |
| `pnpm db:migrate` (first run against empty DB)                                          | `/home/dtpm` | pass — applied `20261109120000_enable-postgis-smoke` (CREATE EXTENSION postgis + `_phase0_migration_smoke`)   |
| `pnpm db:migrate` (second run)                                                          | `/home/dtpm` | pass — `No migrations to run!`                                                                                |
| `docker compose … exec -T postgres psql -U dtpm -d dtpm -c "SELECT PostGIS_version();"` | `/home/dtpm` | pass — `3.4 USE_GEOS=1 USE_PROJ=1 USE_STATS=1`                                                                |
| `docker compose … exec -T redis redis-cli ping`                                         | `/home/dtpm` | pass — `PONG`                                                                                                 |
| `pnpm deps:down`                                                                        | `/home/dtpm` | pass — compose down documented; Verifier may leave up or tear down per packet                                 |
| `pnpm format` / `pnpm lint` / `pnpm typecheck` / `pnpm test` / `pnpm build`             | `/home/dtpm` | pass — quality gates still green after WP03 additive changes                                                  |
| Read `.env.example` / `CONTRIBUTING.md` / `infra/local/README.md`                       | `/home/dtpm` | documented up/down, migrate, non-secret local URLs; `DTPM_PROVIDERS_MODE=fake` retained                       |

## Acceptance mapping

| Check                                                   | Evidence                                                                  | Observed (Implementer)       |
| ------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------- |
| Documented up/down for local Postgres/PostGIS and Redis | `infra/local/README.md`; `CONTRIBUTING.md` Local dependencies; `deps:*`   | pass (Verifier must re-run)  |
| Migration tool runs from empty database                 | `pnpm db:migrate` applied smoke SQL via `node-pg-migrate`                 | pass (Verifier must re-run)  |
| `.env.example` has no secrets                           | local `DATABASE_URL` / `REDIS_URL` match compose defaults; fake providers | pass (Verifier must inspect) |
| Draft evidence record                                   | this file                                                                 | present                      |
| PostGIS available                                       | `SELECT PostGIS_version()`                                                | pass (Verifier must re-run)  |
| Redis ping                                              | `redis-cli ping` → `PONG`                                                 | pass (Verifier must re-run)  |

## Forbidden-scope scan (Implementer self-check)

| Risk                                | Observed                                                                           |
| ----------------------------------- | ---------------------------------------------------------------------------------- |
| Product / delivery schema           | none — only `_phase0_migration_smoke` + PostGIS extension                          |
| Managed cloud DBs / real providers  | none — local compose images only                                                   |
| Redis as assignment/financial truth | none — docs state queues/ephemera only                                             |
| Secrets or live credentials         | none — `.env.example` non-secret local defaults                                    |
| Prior DTP copy                      | none                                                                               |
| TDD §35 ORM/hosting locked as final | no — docs label `node-pg-migrate` / compose images as Phase 0 baseline pending §35 |
| CI / WP04 / WP05 / WP06 scope       | none                                                                               |
| Ledger marked done                  | no — Implementer did not edit `LEDGER.md`                                          |

## Verifier notes

Suggested Verifier commands (from packet):

```text
cd /home/dtpm
pnpm deps:up
# wait until healthy
pnpm db:migrate
docker compose -f infra/local/compose.yaml exec -T postgres \
  psql -U dtpm -d dtpm -c "SELECT PostGIS_version();"
docker compose -f infra/local/compose.yaml exec -T redis redis-cli ping
# confirm .env.example has no secrets
# confirm CONTRIBUTING.md / infra/local/README.md document up/down
pnpm format && pnpm lint && pnpm typecheck && pnpm test
# tear down or leave as documented
pnpm deps:down
```

Do not treat this draft as a pass. Verifier must re-run commands and set Verdict.

## Verdict rationale

Not set. Implementer must not verify own packet.
