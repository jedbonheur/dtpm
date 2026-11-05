# P07 — Ledger, fee, payout, and reconciliation

| Field | Value |
|---|---|
| Phase | 7 |
| Status | blocked |
| Citations | TDD §17, §32 Phase 7; PRD AC-010 |
| Blocker | TDD §36: not approved; finance/payments approval required |

## Outcome

AC-010 passes; property tests prove balanced entries; sandbox reconciliation has no unexplained difference.

## Packets

| ID | Title |
|---|---|
| P07-WP01 | Append-only double-entry ledger |
| P07-WP02 | 15/85 split; taxes excluded from split |
| P07-WP03 | Cancellation credit, refund, issue hold |
| P07-WP04 | Cleared earnings after issue window |
| P07-WP05 | Weekly payout batch, statement, failure retry |
| P07-WP06 | Reconciliation vs provider sandbox |
| P07-WP07 | Verify AC-010 and balance properties |

Ledger module must not execute provider payouts; payout module must not rewrite ledger entries (TDD §10).
