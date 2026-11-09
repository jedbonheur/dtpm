# P02-WP03: Payout-account status (fake/sandbox)

| Field      | Value                       |
| ---------- | --------------------------- |
| ID         | P02-WP03                    |
| Phase      | 2                           |
| Status     | blocked                     |
| Depends on | P02-WP01                    |
| Citations  | TDD §32 Phase 2, §17, §36.4 |

## Goal

Track payout-account status on the driver without executing payouts or storing bank credentials.

## Forbidden

Raw bank credentials, live payouts, rewriting ledger history.

## Worker brief

```text
Implementer for P02-WP03. Status flags only; no real banking. Start only if ready.
```
