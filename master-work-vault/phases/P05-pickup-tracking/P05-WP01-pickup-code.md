# P05-WP01: Pickup code confirmation

| Field | Value |
|---|---|
| ID | P05-WP01 |
| Phase | 5 |
| Status | blocked |
| Depends on | P04-WP05; Phase 5 + location/privacy gates |
| Citations | TDD §13, AC-012 |

## Goal

Assigned driver confirms pickup with one-time code; duplicate pickup is idempotent (TDD §29.2 item 5).

## Worker brief

```text
Implementer for P05-WP01. Pickup code only. Start only if ready.
```
