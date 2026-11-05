# P02-WP02: Verification-state workflow

| Field | Value |
|---|---|
| ID | P02-WP02 |
| Phase | 2 |
| Status | blocked |
| Depends on | P02-WP01; Phase 2 human approval |
| Citations | TDD §10 Driver, §32 Phase 2, §36.4 |

## Goal

Model driver verification states and transitions. Use fakes/sandboxes only. Do not collect real documents unless a later gate explicitly allows it.

## Allowed / forbidden

Allowed: state machine + fake document references. Forbidden: real licence/insurance/banking/background files.

## Implementer / Verifier DoD

Illegal transitions rejected; expiry tests as specified in phase exit.

## Worker brief

```text
Implementer for P02-WP02. Do not collect real identity documents. Start only if ledger says ready.
```
