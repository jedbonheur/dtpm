# P07-WP05: Weekly payout batch, statement, failure retry

| Field | Value |
|---|---|
| ID | P07-WP05 |
| Phase | 7 |
| Status | blocked |
| Depends on | P07-WP04 |
| Citations | TDD §17.4, §10 Payout |

## Goal

Weekly batch and statements via payout adapter. Sandbox only until finance gate. Payout cannot rewrite ledger.

## Worker brief

```text
Implementer for P07-WP05. Payout execution adapter. Start only if ready.
```
