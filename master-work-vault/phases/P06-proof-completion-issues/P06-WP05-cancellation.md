# P06-WP05: Sender/driver cancellation (state-aware)

| Field | Value |
|---|---|
| ID | P06-WP05 |
| Phase | 6 |
| Status | blocked |
| Depends on | P03-WP04, P04-WP05 |
| Citations | TDD §13, AC-011, UF-08 |

## Goal

Cancellation rules depend on lifecycle state; reason and financial effect recorded. Financial posting may be a stub until Phase 7 if documented.

## Worker brief

```text
Implementer for P06-WP05. State-aware cancellation. Start only if ready.
```
