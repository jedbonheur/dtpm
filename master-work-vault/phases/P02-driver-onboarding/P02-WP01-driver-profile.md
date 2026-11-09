# P02-WP01: Driver profile, vehicle capacity, service area

| Field      | Value                                               |
| ---------- | --------------------------------------------------- |
| ID         | P02-WP01                                            |
| Phase      | 2                                                   |
| Status     | blocked                                             |
| Depends on | Phase 1 exit (P01-WP07); human approval for Phase 2 |
| Citations  | TDD §10 Driver, §12.1, §32 Phase 2                  |

## Goal

Persist driver profile, vehicle capacity, and service area without matching or payouts.

## Allowed files / packages

`packages/domain` driver, `persistence`, `apps/api` driver profile routes, `apps/driver-mobile` profile screens as needed.

## Forbidden files / behaviors

Matching selection, payouts, real identity documents.

## Dependencies

Human Phase 2 approval; P01 done recommended for shared auth.

## Interfaces this packet must not invent

Driver module must not own matching or payouts (TDD §10).

## Implementer / Verifier DoD

Profile CRUD + capacity constraints tested. Verifier runs those tests.

## Worker brief

```text
Implementer for P02-WP01. Phase 2 is blocked until human approval. Do not start unless ledger status is ready.
```
