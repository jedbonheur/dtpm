# P02-WP06: Mobile permission explanation and development-build pipeline

| Field | Value |
|---|---|
| ID | P02-WP06 |
| Phase | 2 |
| Status | blocked |
| Depends on | P00-WP01 (driver-mobile skeleton); Phase 2 approval |
| Citations | TDD §19.1, §32 Phase 2, §34.1 |

## Goal

Driver mobile has a development-build pipeline and permission-explanation UX. Do not collect background/precise location until Phase 5 gates.

## Forbidden

Production stores, live tracking, background location collection (TDD §36.4).

## Worker brief

```text
Implementer for P02-WP06. Dev-build pipeline and permission copy only. No live location. Start only if ready.
```
