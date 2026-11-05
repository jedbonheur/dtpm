# P04-WP05: Atomic acceptance and uniqueness

| Field      | Value                            |
| ---------- | -------------------------------- |
| ID         | P04-WP05                         |
| Phase      | 4                                |
| Status     | blocked                          |
| Depends on | P04-WP03                         |
| Citations  | TDD §14, AC-005, §29.2 items 1–4 |

## Goal

At most one driver assigned. Database uniqueness, row locking, atomic state transition, idempotent acceptance.

## Worker brief

```text
Implementer for P04-WP05. Atomic assignment; Postgres truth. Start only if ready.
```
