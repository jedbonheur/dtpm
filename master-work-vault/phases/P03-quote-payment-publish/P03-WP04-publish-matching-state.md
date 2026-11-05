# P03-WP04: Publication and sender matching-wait state

| Field      | Value                   |
| ---------- | ----------------------- |
| ID         | P03-WP04                |
| Phase      | 3                       |
| Status     | blocked                 |
| Depends on | P03-WP02, P03-WP03      |
| Citations  | TDD §13, AC-001, AC-002 |

## Goal

Valid authorized quotes can publish; invalid requests cannot. Sender sees matching-related state without running the matching engine (Phase 4).

## Worker brief

```text
Implementer for P03-WP04. Publish + reject unsupported. No matching engine. Start only if ready.
```
