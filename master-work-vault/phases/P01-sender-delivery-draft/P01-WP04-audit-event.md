# P01-WP04: Audit event on draft create

| Field | Value |
|---|---|
| ID | P01-WP04 |
| Phase | 1 |
| Status | blocked |
| Depends on | P01-WP02 |
| Ledger | [LEDGER.md](../../LEDGER.md) |
| Evidence | none |
| Citations | TDD §10 Audit, §26.3, §36.1 |

## Goal

Creating a delivery draft writes an append-only audit event. Audit is not product analytics and is not mutable operational state.

## Why this packet exists

TDD §36.1 requires an audit event. TDD §10: Audit owns append-only material action record.

## Allowed files / packages

- Audit persistence and application port
- Outbox if required so the event commits with the draft (TDD TD-010) — only if needed for this event; do not build the full job platform
- Tests that the event exists and is not updated in place

## Forbidden files / behaviors

- Using analytics as the audit log
- Mutable “last status” as the only record
- Support unrestricted data access

## Dependencies

P01-WP02 done. Can parallel P01-WP03 if file ownership is split (audit vs validation). If both migrate overlapping tables, serialize.

## Interfaces this packet must not invent

Do not write audit rows from random modules via cross-table writes; go through the audit port.

## Implementer definition of done

- [ ] Draft create commits an audit event
- [ ] Event is append-only (test)
- [ ] Draft evidence

## Verifier definition of done

```text
{integration test: create draft => audit row; attempt mutate fails or is not API-exposed}
```

Map: TDD §36.1 “writes an audit event.”

## Worker brief

```text
You are the Implementer for P01-WP04.
Read RULES.md (Implementer) and this packet.
Persist an append-only audit event on draft create.
No analytics substitute. Do not mark ledger done.
```
