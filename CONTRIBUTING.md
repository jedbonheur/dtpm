# Contributing — dtpm

## Setup

Repository path: `/home/dtpm` (G-00).

```bash
# Requires Node.js >= 20 and pnpm 9.x (see packageManager in package.json)
corepack enable
pnpm install
pnpm build
```

Optional stub processes (no product behavior):

```bash
pnpm start:api
pnpm start:worker
pnpm start:sender-web
pnpm start:admin-web
pnpm start:driver-mobile
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
