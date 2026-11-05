# P01-WP02: Delivery draft create and retrieve

| Field | Value |
|---|---|
| ID | P01-WP02 |
| Phase | 1 |
| Status | blocked |
| Depends on | P01-WP01 |
| Ledger | [LEDGER.md](../../LEDGER.md) |
| Evidence | none |
| Citations | TDD §10 Delivery, §12.2, §13 Draft, §21.1, §32 Phase 1 |

## Goal

An authenticated sender can create one delivery draft and retrieve it; data crosses API, domain, and PostgreSQL.

## Why this packet exists

Core of the Phase 1 vertical slice (TDD §32, §36.1).

## Allowed files / packages

- `packages/domain`, `application`, `contracts`, `persistence`
- `apps/api` HTTP commands for create/get draft
- Migrations for delivery draft persistence
- Integration tests

## Forbidden files / behaviors

- Publish, quote, payment, matching
- Direct cross-module table writes
- UI (P01-WP05)

## Dependencies

P01-WP01 done: sender principal exists.

## Interfaces this packet must not invent

Delivery module must not call payments or location transport (TDD §10). Use application-generated UUIDs, UTC timestamps (TDD §11). Draft is the only allowed lifecycle state in this packet.

## Implementer definition of done

- [ ] Create and get draft API
- [ ] Persisted in Postgres
- [ ] Domain policy owns Draft
- [ ] Integration tests pass
- [ ] Draft evidence

## Verifier definition of done

```text
{API/integration tests for create + get draft}
```

Map: TDD §36.1 “crosses API, domain, and database.”

## Constraints

Fakes only. Money types if present use integer minor units (TDD §11) even if unused.

## Worker brief

```text
You are the Implementer for P01-WP02.
Read RULES.md (Implementer) and this packet.
Implement create/retrieve delivery draft through API, domain, and Postgres.
No publish/payment/matching/UI. Do not mark ledger done.
```
