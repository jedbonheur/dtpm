# Evidence: P00-WP06 (DRAFT — Implementer)

| Field       | Value                                       |
| ----------- | ------------------------------------------- |
| Packet      | P00-WP06                                    |
| Implementer | cursor-implementer (this session)           |
| Verifier    | {must differ from Implementer — not filled} |
| Date        | 2026-11-09                                  |
| Verdict     | pending Verifier                            |

## Commands run (Implementer observations — Verifier must re-run)

| Command                                                                   | Where        | Observed result                                                                                             |
| ------------------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| `pnpm build`                                                              | `/home/dtpm` | **pass** — all 15 workspace apps/packages (`tsc`) emit successfully                                         |
| `pnpm test`                                                               | `/home/dtpm` | **pass** — 3 files / 15 unit tests (WP04 config / observability / testing; integration+e2e excluded)        |
| `docker compose -f infra/local/compose.yaml up -d` then `pnpm db:migrate` | `/home/dtpm` | **pass** — PostGIS + Redis up; migration `20261109120000_enable-postgis-smoke` applied                      |
| `pnpm test:integration`                                                   | `/home/dtpm` | **pass** — `node:test` suite: PostGIS_Version + `_phase0_migration_smoke` id=1 (2 tests)                    |
| `pnpm test:e2e`                                                           | `/home/dtpm` | **pass** — 1 file / 2 tests via **supertest**: `GET /health` ok+fake; `GET /example-error` shared envelope  |
| `pnpm format`                                                             | `/home/dtpm` | **pass** — Prettier check clean                                                                             |
| `pnpm lint`                                                               | `/home/dtpm` | **pass** — eslint exit 0                                                                                    |
| `pnpm typecheck`                                                          | `/home/dtpm` | **pass** — recursive typecheck across workspace                                                             |
| Inspect `.github/workflows/ci.yml`                                        | `/home/dtpm` | quality runs unit + e2e; integration job uses `postgis/postgis:16-3.4` service + migrate + test:integration |
| Read `CONTRIBUTING.md`                                                    | `/home/dtpm` | documents unit / integration / e2e commands; browser/mobile E2E deferred                                    |

Note: Vitest could not load CJS `pg` (Vite ESM interop: `Class extends value [object Module]`). Phase 0 DB smoke therefore uses `node:test` + `createRequire('pg')` as documented in CONTRIBUTING.

## Acceptance mapping

| Check                                         | Evidence                                                                                       | Observed (Implementer)       |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------- |
| Every TDD §9 application builds               | `pnpm build` — api, worker, sender-web, admin-web, driver-mobile + packages                    | pass (Verifier must re-run)  |
| Example unit test passes                      | existing WP04 Vitest suite via `pnpm test` (15 tests)                                          | pass (Verifier must re-run)  |
| Example DB integration test vs local Postgres | `packages/persistence/src/phase0-smoke.integration.test.mjs` via `pnpm test:integration`       | pass (Verifier must re-run)  |
| Example E2E check passes                      | `apps/api` `createHttpServer` + **supertest** in `health.e2e.test.ts` via `pnpm test:e2e`      | pass (Verifier must re-run)  |
| No secrets / no production integrations       | fake providers; local compose; no deploy jobs; gitleaks job unchanged                          | pass (Verifier must inspect) |
| Draft evidence record                         | this file                                                                                      | present                      |
| Reuses WP04 config + error envelope           | `loadConfig` / `createApiError` on API routes; health payload uses `providersMode` from config | pass (Verifier must inspect) |
| Reuses WP03 persistence smoke                 | integration asserts `_phase0_migration_smoke`                                                  | pass (Verifier must re-run)  |

## Forbidden-scope scan (Implementer self-check)

| Risk                                          | Observed                                                |
| --------------------------------------------- | ------------------------------------------------------- |
| Sender delivery draft / Phase 1 product slice | none                                                    |
| Secrets or live provider credentials          | none                                                    |
| Production deploy / paid infra                | none — CI has no deploy jobs                            |
| Prior DTP copy                                | none                                                    |
| LEDGER / RULES edited                         | no — Implementer did not edit `LEDGER.md` or `RULES.md` |
| Product schema beyond Phase 0 smoke           | none — only existing `_phase0_migration_smoke`          |

## Paths added/changed

- `apps/api/src/index.ts` — `createHttpServer` / `startServer` / `node:http` `/health` + `/example-error`
- `apps/api/src/health.e2e.test.ts` — Phase 0 E2E via **supertest**
- `apps/api/package.json` / `tsconfig.json` (`supertest`, `@types/supertest`, `@dtpm/testing`; exclude e2e from emit)
- `packages/persistence/src/phase0-smoke.integration.test.mjs`
- `packages/persistence/package.json` / `tsconfig.json`
- `package.json` — `test:integration`, `test:e2e`
- `vitest.config.ts` — exclude integration/e2e from unit run
- `vitest.e2e.config.ts`, `vitest.integration.config.ts` (reserved note)
- `.github/workflows/ci.yml` — e2e in quality; PostGIS integration job
- `CONTRIBUTING.md` — Phase 0 exit commands + §30.2 table
- `eslint.config.mjs` — Node globals for integration `.mjs`
- `master-work-vault/evidence/P00-WP06-draft.md` (this file)

## Verifier notes

Suggested Verifier commands:

```text
cd /home/dtpm
pnpm build
pnpm test
pnpm deps:up   # or: docker compose -f infra/local/compose.yaml up -d
pnpm db:migrate
pnpm test:integration
pnpm test:e2e
pnpm format && pnpm lint && pnpm typecheck
# Inspect apps/api HTTP surface and CI jobs against CONTRIBUTING.md
```

Ledger dependency: packet `Depends on` includes P00-WP04. Master should ensure WP04 is `done` before marking WP06 `done`. Implementer branched from WP05 tip (includes WP04+CI).

## Verdict rationale

Implementer DoD claimed complete locally (build + unit + DB integration + HTTP E2E). Ledger `done` requires a different Verifier with mapped observed evidence.
