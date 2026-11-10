# P00-WP06: Example unit, integration, and E2E (Phase 0 exit)

| Field      | Value                                              |
| ---------- | -------------------------------------------------- |
| ID         | P00-WP06                                           |
| Phase      | 0                                                  |
| Status     | done                                               |
| Depends on | P00-WP02, P00-WP03, P00-WP04                       |
| Ledger     | [LEDGER.md](../../LEDGER.md)                       |
| Evidence   | [evidence/P00-WP06.md](../../evidence/P00-WP06.md) |
| Citations  | TDD §32 Phase 0 exit, §36.3                        |

## Goal

Prove the foundation: all empty applications build, and one example unit test, one database integration test, and one E2E check pass. No product behavior required beyond whatever trivial surface those examples need.

## Why this packet exists

Phase 1 must not start without this observed exit evidence (TDD §36.3).

## Allowed files / packages

- Example tests under `packages/testing` and/or apps
- Trivial health endpoint or placeholder page if required for E2E
- Build scripts for all apps in TDD §9

## Forbidden files / behaviors

- Sender delivery draft or any Phase 1 product slice
- Credentials or production integrations
- Skipping any app build

## Dependencies

Tooling, local DB, and config/observability/factories exist.

P00-WP05 may still be in progress; this packet’s local commands must pass regardless. If WP05 is done, CI should be updated to run the new example tests (Implementer of WP06 may extend CI; that is in scope).

## Interfaces this packet must not invent

Use the error envelope and config from P00-WP04. Use persistence from P00-WP03.

## Implementer definition of done

- [ ] Every TDD §9 application builds
- [ ] Example unit test passes
- [ ] Example DB integration test passes against local Postgres
- [ ] Example E2E check passes
- [ ] No secrets / no production integrations
- [ ] Draft evidence with command output

## Verifier definition of done

```text
{documented build all apps}
{documented unit example}
{documented db integration example}
{documented e2e example}
```

Map to TDD §32 Phase 0 exit and §36.3 first bullet.

## Constraints

Fakes only.

## Worker brief

```text
You are the Implementer for P00-WP06.
Read RULES.md (Implementer) and this packet.
Make all empty apps build and add one passing unit, DB integration, and E2E example.
No Phase 1 product slice. Do not mark ledger done.
```
