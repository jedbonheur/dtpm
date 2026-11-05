# P03-WP03: Card sandbox authorization (idempotent)

| Field      | Value                  |
| ---------- | ---------------------- |
| ID         | P03-WP03               |
| Phase      | 3                      |
| Status     | blocked                |
| Depends on | P03-WP01               |
| Citations  | TDD §15, §17.1, AC-009 |

## Goal

Authorize sender payment in **sandbox/fakes** with idempotent retries. No production accounts.

## Worker brief

```text
Implementer for P03-WP03. Sandbox/fake authorization only. Start only if ready.
```
