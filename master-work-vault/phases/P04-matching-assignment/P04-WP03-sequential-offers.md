# P04-WP03: Sequential offers and 60-second expiry

| Field      | Value                                        |
| ---------- | -------------------------------------------- |
| ID         | P04-WP03                                     |
| Phase      | 4                                            |
| Status     | blocked                                      |
| Depends on | P04-WP02                                     |
| Citations  | TDD §18.3, PRD matching rules, AC-003 AC-004 |

## Goal

One active offer at a time; 60-second expiry; next driver on decline/expiry.

## Worker brief

```text
Implementer for P04-WP03. Sequential offers + expiry. Start only if ready.
```
