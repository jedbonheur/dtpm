# P01-WP03: Montreal address shape and parcel limits (fakes)

| Field      | Value                                                                    |
| ---------- | ------------------------------------------------------------------------ |
| ID         | P01-WP03                                                                 |
| Phase      | 1                                                                        |
| Status     | blocked                                                                  |
| Depends on | P01-WP02                                                                 |
| Ledger     | [LEDGER.md](../../LEDGER.md)                                             |
| Evidence   | none                                                                     |
| Citations  | TDD §32 Phase 1; PRD Montreal + parcel rules; TDD §16 quote not in scope |

## Goal

Draft create validates Montreal address **shape** and parcel limits using **provider fakes**. Invalid drafts are rejected with the shared error envelope. Valid Montreal drafts persist.

## Why this packet exists

TDD §32 Phase 1: validate Montreal address shape and parcel limits using provider fakes. Full PostGIS boundary + pricing snapshot is later (TDD §29.3 FR-002–004). Phase 1 is provider-free.

## Allowed files / packages

- Fake maps/geocode adapter in `packages/providers`
- Domain validation for parcel limits
- API validation tests

## Forbidden files / behaviors

- Production map/geocode vendor
- Quote calculation and rate cards (Phase 3)
- Dynamic pricing

## Dependencies

P01-WP02 done.

## Interfaces this packet must not invent

Keep maps behind a port (TDD TD-012). Do not call vendors from domain modules.

## Implementer definition of done

- [ ] Fake adapter used for address shape
- [ ] Parcel limit validation
- [ ] Invalid input does not persist
- [ ] Tests for valid and invalid cases
- [ ] Draft evidence

## Verifier definition of done

```text
{integration tests: valid Montreal-shaped address + parcel; invalid rejected}
```

Map: TDD §32 Phase 1 validation bullet; not AC-001 (publish).

## Constraints

Provider fakes only.

## Worker brief

```text
You are the Implementer for P01-WP03.
Read RULES.md (Implementer) and this packet.
Validate Montreal address shape and parcel limits with fakes only.
No live maps, no quotes. Do not mark ledger done.
```
