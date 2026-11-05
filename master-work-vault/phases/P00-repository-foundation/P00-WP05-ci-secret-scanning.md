# P00-WP05: CI foundation and secret scanning

| Field | Value |
|---|---|
| ID | P00-WP05 |
| Phase | 0 |
| Status | blocked |
| Depends on | P00-WP02 |
| Ledger | [LEDGER.md](../../LEDGER.md) |
| Evidence | none |
| Citations | TDD §30.2 items 1–3 plus secret scanning; §32 Phase 0 |

## Goal

CI runs repository-instruction/generated-file checks (or a documented stub), formatting, linting, type checking, and secret scanning on every change. Remaining §30.2 layers can be added as those test types appear.

## Why this packet exists

Phase 0 requires CI and secret scanning before product behavior. Full §30.2 matrix is the north star; this packet installs the foundation that later packets extend.

## Allowed files / packages

- CI workflow definitions
- Secret scanning config
- Generated-file / instruction check scripts if needed

## Forbidden files / behaviors

- Deploy jobs to production or paid infra
- Storing CI secrets for live vendors
- Claiming the entire §30.2 pipeline is complete if E2E/load/security suites do not exist yet — document what is in and what is deferred to later packets

## Dependencies

P00-WP02 done (commands exist). Prefer after P00-WP03/WP04 if CI will also run integration later; WP05 may land format/lint/type/secret first.

## Interfaces this packet must not invent

Do not invent a second command set. CI must call the same documented commands as local.

## Implementer definition of done

- [ ] CI config invokes format, lint, typecheck
- [ ] Secret scanning enabled
- [ ] Documented which §30.2 steps are not yet in CI
- [ ] Draft evidence (CI log or local act/equivalent)

## Verifier definition of done

```text
# Inspect CI config against documented commands
# Confirm secret scanner is present
# If a pipeline run is available, attach the log; otherwise fail only if config is missing, and note “no observed CI run yet” for master
```

Prefer an observed pipeline run. If the environment cannot run CI, Verifier records that gap; master must not mark `done` until a run exists or a human records a bounded exception on this packet.

## Constraints

No production deploy.

## Worker brief

```text
You are the Implementer for P00-WP05.
Read RULES.md (Implementer) and this packet.
Add CI for format, lint, typecheck, and secret scanning using the same local commands.
No production deploy. Do not mark ledger done.
```
