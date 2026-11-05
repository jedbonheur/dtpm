# P08-WP07: Operational runbooks and pilot controls

| Field | Value |
|---|---|
| ID | P08-WP07 |
| Phase | 8 |
| Status | blocked |
| Depends on | P08-WP03 |
| Citations | TDD §33, §32 Phase 8 |

## Goal

Runbooks plus flags: pause publication, pause matching, disable bank, disable adapters, rate-card/matching versions, service area/hours/cohort, suspend user, stop payouts. Flags cannot bypass auth, state machine, accounting, or audit.

## Worker brief

```text
Implementer for P08-WP07. Flags + runbooks. Start only if ready.
```
