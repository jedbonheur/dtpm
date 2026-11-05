# P00-WP01: Fresh monorepo skeleton

| Field | Value |
|---|---|
| ID | P00-WP01 |
| Phase | 0 |
| Status | blocked |
| Depends on | G-00 |
| Ledger | [LEDGER.md](../../LEDGER.md) |
| Evidence | none |
| Citations | TDD §9, §36.2 |

## Goal

Initialize a fresh `dtpm` TypeScript monorepo whose empty apps and packages match TDD §9, including repository instructions that record the G-00 branch and change-review policy.

## Why this packet exists

TDD §32 Phase 0: initialize fresh monorepo and repository instructions; create application/package skeletons without product behavior.

## Allowed files / packages

- Root workspace config (package manager workspace files, `.gitignore`, editorconfig as needed)
- `apps/sender-web/`, `apps/admin-web/`, `apps/driver-mobile/`, `apps/api/`, `apps/worker/` empty runnable stubs
- `packages/domain/`, `application/`, `contracts/`, `persistence/`, `providers/`, `auth/`, `i18n/`, `observability/`, `testing/`, `config/` empty stubs
- `docs/` already exists; do not rewrite PRD/TDD
- Repository instructions (e.g. `AGENTS.md` / `CONTRIBUTING.md`) with G-00 branch and review policy
- `infra/` placeholder only if it contains no live hosting

## Forbidden files / behaviors

- Product features, domain logic, real schemas beyond a trivial health/placeholder
- Copying prior DTP code, architecture, migrations, or configuration
- Locking TDD §35 framework vendors as “final” without noting they are still pending approval
- Secrets, paid cloud, production compose credentials

## Dependencies

G-00 `done`: absolute path recorded, fresh init authorized, technical owner accepted monorepo shape, branch/review policy text available to paste.

## Interfaces this packet must not invent

Do not invent extra apps or a microservice split. Modular monolith: API process and worker process later share domain packages (TDD §6).

## Implementer definition of done

- [ ] Workspace installs from a clean clone of this repo path
- [ ] All listed apps and packages exist as empty skeletons
- [ ] Repository instructions include branch and change-review policy from G-00
- [ ] No product behavior
- [ ] Draft evidence record

## Verifier definition of done

```text
# From repo root, after documented install:
# - list apps/* and packages/* against TDD §9
# - confirm instructions contain branch + review policy
# - confirm no copied DTP history / no secrets
```

Empty apps are not required to have the example tests yet (that is P00-WP06) but must be valid workspace members.

## Constraints

Fresh repository only. Fake providers by default when any placeholder env exists.

## Worker brief

```text
You are the Implementer for P00-WP01.
Read master-work-vault/RULES.md (Implementer) and this packet.
Create a fresh monorepo skeleton matching TDD §9 at the G-00 authorized path.
Do not add product behavior or copy prior DTP code.
Do not mark the ledger done. Write a draft evidence file for a Verifier.
```
