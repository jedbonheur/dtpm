# Contributing — dtpm

## Setup

Repository path: `/home/dtpm` (G-00).

```bash
# Requires Node.js >= 20 and pnpm 9.x (see packageManager in package.json)
corepack enable
pnpm install
pnpm build
```

## Local dependencies (Postgres/PostGIS + Redis)

Phase 0 local stack (TDD §30.1). Requires Docker Compose. Details: [`infra/local/README.md`](infra/local/README.md).

Copy [`.env.example`](.env.example) for non-secret local URLs (`DATABASE_URL`, `REDIS_URL`). Fake providers remain the default (`DTPM_PROVIDERS_MODE=fake`). `@dtpm/config` `loadConfig` fails fast if required keys are missing or invalid.

Shared API errors use one envelope from `@dtpm/observability` (`createApiError`: stable `code`, client-safe `message`, `correlationId`). Structured logs and correlation helpers live in the same package; test env factories are in `@dtpm/testing`.

```bash
pnpm deps:up      # docker compose -f infra/local/compose.yaml up -d
pnpm db:migrate   # node-pg-migrate against empty/local DB (@dtpm/persistence)
pnpm deps:down    # docker compose -f infra/local/compose.yaml down
```

Migration tooling (`node-pg-migrate` + SQL) is Phase 0 baseline only — not a closed TDD §35 ORM decision. Redis is queues/ephemera only, not business source of truth.

## Quality commands (Phase 0 baseline)

Local gates for TDD §30.2 items 2–4. Brands (Prettier, ESLint, Vitest) are Phase 0 process baseline only — not a closed TDD §35 decision (pending G-01 command-set approval).

```bash
pnpm format       # prettier --check .
pnpm lint         # eslint .
pnpm typecheck    # tsc --noEmit on every app and package
pnpm test         # vitest run --passWithNoTests
```

Apply formatting locally:

```bash
pnpm format:fix # prettier --write .
```

Optional stub processes (no product behavior):

```bash
pnpm start:api
pnpm start:worker
pnpm start:sender-web
pnpm start:admin-web
pnpm start:driver-mobile
```

## CI (P00-WP05)

GitHub Actions (`.github/workflows/ci.yml`) runs the **same** documented `pnpm` commands as local — no second command set. After install it runs `pnpm build` (same as Setup above) so workspace `dist/` exports exist before typecheck/test. No production deploy jobs and no live vendor CI secrets.

| In CI now (WP05)                                         | Deferred (later packets / fuller §30.2)                              |
| -------------------------------------------------------- | -------------------------------------------------------------------- |
| Setup `pnpm build` (workspace package `dist/` exports)   | —                                                                    |
| §30.2 (1) minimal instruction stub (`pnpm check:repo`)   | Full generated-file / schema gates                                   |
| §30.2 (2–3) `pnpm format`, `pnpm lint`, `pnpm typecheck` | —                                                                    |
| Unit tests via `pnpm test`                               | Property tests                                                       |
| Secret scanning via gitleaks (§30.2 item 8 partial)      | Broader dependency / vulnerability scanning                          |
| —                                                        | Migration + integration tests (§30.2.5)                              |
| —                                                        | API/event schema compatibility (§30.2.6)                             |
| —                                                        | Web and mobile build checks (§30.2.7)                                |
| —                                                        | Focused E2E (§30.2.9); mainline load / a11y / i18n / security suites |

Local preview of the instruction stub:

```bash
pnpm check:repo
```

## Branch and change-review policy (G-00)

Feature branches such as `p00-wp01-monorepo-skeleton`. Merge to `main` only via pull request with at least one approving review. No direct commits or force-pushes to `main`. Packet Implementer and Verifier must be different agents.

## Scope rules

- Follow work packets under `master-work-vault/`; do not expand scope.
- Do not copy prior DTP code, architecture, migrations, or configuration.
- TDD §35 framework vendors are not locked as final in Phase 0.
- No secrets, paid cloud credentials, or production compose files in this repository.
- Fake providers by default when any placeholder env exists.

## Layout

See TDD §9 and `AGENTS.md` for the authorized `apps/` and `packages/` shape.
