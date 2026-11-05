# P05-WP02: Payment capture saga after pickup

| Field | Value |
|---|---|
| ID | P05-WP02 |
| Phase | 5 |
| Status | blocked |
| Depends on | P05-WP01, P03-WP03 |
| Citations | TDD §17.2 |

## Goal

Pickup requests capture via payment port; sandbox/fakes unless a payment gate says otherwise.

## Worker brief

```text
Implementer for P05-WP02. Capture saga, idempotent callbacks. Start only if ready.
```
