# P03-WP05: Feature flag — bank payment disabled

| Field      | Value    |
| ---------- | -------- |
| ID         | P03-WP05 |
| Phase      | 3        |
| Status     | blocked  |
| Depends on | P03-WP03 |
| Citations  | TDD §33  |

## Goal

Bank-account payment is independently feature-gated off until approved. Flags cannot bypass authorization or accounting invariants.

## Worker brief

```text
Implementer for P03-WP05. Bank path gated off. Start only if ready.
```
