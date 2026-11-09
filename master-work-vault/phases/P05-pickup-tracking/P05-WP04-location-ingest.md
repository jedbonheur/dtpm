# P05-WP04: Batched location ingest and validation

| Field      | Value                   |
| ---------- | ----------------------- |
| ID         | P05-WP04                |
| Phase      | 5                       |
| Status     | blocked                 |
| Depends on | P05-WP01, P05-WP03      |
| Citations  | TDD §19.2, §29.2 item 8 |

## Goal

HTTP batched ingest; validate; Postgres latest state. Location module does not own delivery lifecycle.

## Worker brief

```text
Implementer for P05-WP04. Batches, duplicates, out-of-order. Start only if ready.
```
