# P00-WP02: Format, lint, typecheck, unit test runner

| Field | Value |
|---|---|
| ID | P00-WP02 |
| Phase | 0 |
| Status | blocked |
| Depends on | P00-WP01 |
| Ledger | [LEDGER.md](../../LEDGER.md) |
| Evidence | none |
| Citations | TDD §32 Phase 0, §30.2 items 2–4 |

## Goal

Every workspace package can format, lint, typecheck, and run unit tests via documented root commands.

## Why this packet exists

TDD §32: configure formatting, linting, type checks, tests. TDD §30.2: CI will run these; local commands must exist first.

## Allowed files / packages

- Shared toolchain config at repo root and per-package scripts
- Minimal unit-test runner wiring
- Docs in repository instructions for the commands

## Forbidden files / behaviors

- Product domain tests that belong in later phases
- Skipping typecheck on any app/package
- Database or E2E stacks (P00-WP03 / P00-WP06)

## Dependencies

P00-WP01 done: skeletons exist as workspace members.

## Interfaces this packet must not invent

Use the same language/toolchain implied by TDD TD-001 (TypeScript monorepo). Do not treat a specific linter brand as a closed TDD §35 decision; record the choice as the Phase 0 baseline pending technical owner command-set approval in G-01.

## Implementer definition of done

- [ ] Documented commands: format, lint, typecheck, unit test
- [ ] Commands succeed on empty skeletons
- [ ] Draft evidence with command output

## Verifier definition of done

```text
{documented format command}
{documented lint command}
{documented typecheck command}
{documented unit-test command}
```

Map: TDD §30.2 steps 2–4 locally.

## Constraints

No credentials. No network-required linters that need paid keys.

## Worker brief

```text
You are the Implementer for P00-WP02.
Read RULES.md (Implementer) and this packet.
Add format, lint, typecheck, and unit-test runner to the P00-WP01 skeleton.
Do not add product features. Do not mark ledger done.
```
