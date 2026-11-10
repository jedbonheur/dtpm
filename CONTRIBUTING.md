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
pnpm db:migrate   # prisma migrate deploy (@dtpm/persistence)
pnpm deps:down    # docker compose -f infra/local/compose.yaml down
```

Migration tooling is **Prisma Migrate** paired with the Prisma schema in `packages/persistence` (TD-013 / TD-014). PostGIS DDL is hand-edited in migration SQL. TDD §35 item 4 is not formally closed until the PostGIS + explicit-lock proof-of-concept is recorded. Redis is queues/ephemera only, not business source of truth.

## Quality commands (Phase 0 baseline)

Local gates for TDD §30.2 items 2–4. Brands (Prettier, ESLint, Vitest) are Phase 0 process baseline only — not a closed TDD §35 decision (pending G-01 command-set approval). Workspace packages resolve TypeScript via the `@dtpm/source` export condition (`tsconfig.base.json` / Vitest), so these gates work without a prior `pnpm build`. Use `pnpm build` when you need emitted `dist/` for Node start scripts.

```bash
pnpm format       # prettier --check .
pnpm lint         # eslint .
pnpm typecheck    # tsc --noEmit on every app and package
pnpm test         # unit only (excludes *.integration.test.ts / *.e2e.test.ts)
pnpm test:integration  # node:test DB smoke vs local Postgres (needs deps:up + db:migrate)
pnpm test:e2e     # Phase 0 HTTP /health example via supertest against @dtpm/api
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

GitHub Actions (`.github/workflows/ci.yml`) runs the **same** documented `pnpm` commands as local — no second command set. Workspace packages expose TypeScript sources via the `@dtpm/source` export condition, so `pnpm typecheck` / `pnpm test` do not require a prior `pnpm build`. No production deploy jobs and no live vendor CI secrets.

| In CI now (WP05 + WP06)                                  | Deferred (later packets / fuller §30.2)                   |
| -------------------------------------------------------- | --------------------------------------------------------- |
| §30.2 (1) minimal instruction stub (`pnpm check:repo`)   | Full generated-file / schema gates                        |
| §30.2 (2–3) `pnpm format`, `pnpm lint`, `pnpm typecheck` | —                                                         |
| Unit tests via `pnpm test`                               | Property tests                                            |
| DB integration example via `pnpm test:integration`       | Broader migration/integration suites beyond Phase 0 smoke |
| Phase 0 HTTP E2E example via `pnpm test:e2e`             | Browser / mobile focused E2E (§30.2.9 product slices)     |
| Secret scanning via gitleaks (§30.2 item 8 partial)      | Broader dependency / vulnerability scanning               |
| —                                                        | API/event schema compatibility (§30.2.6)                  |
| —                                                        | Real web and mobile bundler/native build checks (§30.2.7) |
| —                                                        | Mainline load / a11y / i18n / security suites             |

Local preview of the instruction stub:

```bash
pnpm check:repo
```

Phase 0 exit examples (P00-WP06): `pnpm build` for every §9 app/package, `pnpm test` for the unit layer, `pnpm deps:up && pnpm db:migrate && pnpm test:integration` for the DB smoke (`node:test` + `pg`, because Vitest/Vite ESM interop breaks the CJS driver), and `pnpm test:e2e` for the stub API `/health` check via **supertest**. Browser/mobile E2E remains deferred until product UI packets.

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
