# Evidence draft: Fastify API migration (pre–P01-WP01 auth)

| Field       | Value                                   |
| ----------- | --------------------------------------- |
| Packet      | Transport prep (not full P01-WP01 auth) |
| Implementer | cursor-implementer                      |
| Verifier    | pending                                 |
| Date        | 2026-11-10                              |
| Verdict     | draft — migrate only; auth paused       |

## TDD §35 item 3

| Item                   | Value                                                                 |
| ---------------------- | --------------------------------------------------------------------- |
| Backend HTTP framework | **Fastify 4.x**                                                       |
| Approver               | @bonheurjed                                                           |
| Date                   | 2026-11-10                                                            |
| Node baseline note     | CI/`engines` Node 20; Fastify 5 requires Node ≥22 — stay on Fastify 4 |

## Commands run

| Command                                       | Where        | Observed result                                                         |
| --------------------------------------------- | ------------ | ----------------------------------------------------------------------- |
| `pnpm --filter @dtpm/api add fastify@4`       | `/home/dtpm` | pass — Fastify 4 installed (5 blocked on Node 20)                       |
| `pnpm --filter @dtpm/api typecheck`           | `/home/dtpm` | pass                                                                    |
| `pnpm test:e2e`                               | `/home/dtpm` | pass — 2 tests (`/health`, `/example-error`)                            |
| `pnpm format` / `lint` / `typecheck` / `test` | `/home/dtpm` | **pass** — format clean; lint ok; all packages typecheck; 15 unit tests |
| `pnpm test:e2e` (after cleanup)               | `/home/dtpm` | **pass** — 2 Fastify inject tests                                       |

## Acceptance mapping

| Check                                       | Evidence                                  | Observed |
| ------------------------------------------- | ----------------------------------------- | -------- |
| `apps/api` uses Fastify                     | `apps/api/src/index.ts` `buildApp`        | pass     |
| `/health` + `/example-error` contracts kept | `health.e2e.test.ts` via Fastify `inject` | pass     |
| No auth / identity product routes           | no `/v1/auth` or `/v1/me`                 | pass     |
| §35 Fastify approval recorded               | this file + @bonheurjed                   | pass     |

## Forbidden-scope scan

| Risk                         | Observed                |
| ---------------------------- | ----------------------- |
| P01-WP01 auth implementation | none — paused by design |
| Real IdP / identity docs     | none                    |
| Secrets / live providers     | none                    |

## Pause

Auth (local/test identity, sessions, `/v1/me`) is **not** started. Resume under a separate P01-WP01 plan after human go-ahead.
