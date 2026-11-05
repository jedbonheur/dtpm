# P06-WP02: Completion transaction and tracking shutdown

| Field | Value |
|---|---|
| ID | P06-WP02 |
| Phase | 6 |
| Status | blocked |
| Depends on | P06-WP01 |
| Citations | TDD §13, AC-008, §29.2 item 6 |

## Goal

Acceptable photo completes delivery atomically; tracking stops; duplicates are idempotent.

## Worker brief

```text
Implementer for P06-WP02. Completion transaction. Start only if ready.
```
