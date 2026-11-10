# Evidence: P00-WP04 (DRAFT — Implementer)

| Field       | Value                                       |
| ----------- | ------------------------------------------- |
| Packet      | P00-WP04                                    |
| Implementer | cursor-implementer (this session)           |
| Verifier    | {must differ from Implementer — not filled} |
| Date        | 2026-11-09                                  |
| Verdict     | pending Verifier                            |

## Commands run (Implementer observations — Verifier must re-run)

| Command                                                                                                   | Where        | Observed result                                                                                           |
| --------------------------------------------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------- |
| `pnpm install`                                                                                            | `/home/dtpm` | pass — workspace deps for `@dtpm/config`, `@dtpm/observability`, `@dtpm/testing`, `@dtpm/api` linked      |
| `pnpm --filter @dtpm/config --filter @dtpm/observability --filter @dtpm/testing --filter @dtpm/api build` | `/home/dtpm` | pass                                                                                                      |
| `pnpm format:fix` then `pnpm format`                                                                      | `/home/dtpm` | pass — Prettier clean                                                                                     |
| `pnpm lint`                                                                                               | `/home/dtpm` | pass — eslint exit 0                                                                                      |
| `pnpm typecheck`                                                                                          | `/home/dtpm` | pass — recursive typecheck; includes config, observability, testing, api                                  |
| `pnpm test`                                                                                               | `/home/dtpm` | pass — 3 files / 15 tests (config parse fail-fast, error envelope, test factories)                        |
| `DTPM_PROVIDERS_MODE=fake DATABASE_URL=… REDIS_URL=… pnpm start:api`                                      | `/home/dtpm` | pass — structured health log + example `EXAMPLE_NOT_FOUND` envelope with correlation id                   |
| `pnpm start:api` with required env unset                                                                  | `/home/dtpm` | pass (fail-fast) — `ConfigError: … missing required: DTPM_PROVIDERS_MODE, DATABASE_URL, REDIS_URL` exit 1 |
| Read `.env.example` / `CONTRIBUTING.md`                                                                   | `/home/dtpm` | required keys documented; shared error envelope + `loadConfig` fail-fast noted                            |

## Acceptance mapping

| Check                                           | Evidence                                                                        | Observed (Implementer)       |
| ----------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------- |
| Config fails fast on missing required local env | `packages/config/src/load-config.test.ts`; `ConfigError` from `loadConfig`      | pass (Verifier must re-run)  |
| Error envelope documented and typed             | `ApiErrorEnvelope` / `createApiError` in `@dtpm/observability`; CONTRIBUTING.md | pass (Verifier must inspect) |
| Observability helpers with correlation          | `createLogger`, `createCorrelationId`; structured JSON logs                     | pass (Verifier must re-run)  |
| Test factory package exists                     | `@dtpm/testing` `createTestEnv` / `createTestCorrelationId` + factories tests   | pass (Verifier must re-run)  |
| Unit tests for config parse / error envelope    | vitest 15 passing                                                               | pass (Verifier must re-run)  |
| Typecheck                                       | `pnpm typecheck`                                                                | pass (Verifier must re-run)  |
| Draft evidence record                           | this file                                                                       | present                      |
| No production telemetry credentials             | no-op metrics/span stubs only; no APM env keys                                  | pass (Verifier must inspect) |

## Forbidden-scope scan (Implementer self-check)

| Risk                                 | Observed                                                         |
| ------------------------------------ | ---------------------------------------------------------------- |
| Delivery/payment domain entities     | none                                                             |
| Real APM / product analytics as SoT  | none — logger stdout + no-op stubs                               |
| Per-app error formats                | none — single `ApiErrorEnvelope` in `@dtpm/observability`        |
| CI / secret scanning (WP05)          | none                                                             |
| Full example E2E (WP06)              | none — trivial api wiring only                                   |
| Secrets or live provider credentials | none                                                             |
| Prior DTP copy                       | none                                                             |
| TDD §35 vendors locked as final      | no — hand-rolled config; no OTel SDK; docs note Phase 0 baseline |
| Ledger marked done                   | no — Implementer did not edit `LEDGER.md`                        |

## Verifier notes

Suggested Verifier commands (from packet):

```text
cd /home/dtpm
pnpm install
pnpm build   # or filter-build dependents so workspace exports resolve
pnpm format
pnpm lint
pnpm typecheck
pnpm test
# confirm unit tests cover config parse fail-fast and error envelope
# confirm no production telemetry credentials / APM accounts
# confirm allow-list: packages/config, observability, testing + minimal apps/api
```

Do not treat this draft as a pass. Verifier must re-run commands and set Verdict.

## Verdict rationale

Not set. Implementer must not verify own packet.
