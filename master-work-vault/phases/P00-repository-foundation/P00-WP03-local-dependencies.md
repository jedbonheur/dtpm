# P00-WP03: Local Postgres/PostGIS, Redis, migration tooling

| Field      | Value                                          |
| ---------- | ---------------------------------------------- |
| ID         | P00-WP03                                       |
| Phase      | 0                                              |
| Status     | ready                                          |
| Depends on | P00-WP01                                       |
| Ledger     | [LEDGER.md](../../LEDGER.md)                   |
| Evidence   | none                                           |
| Citations  | TDD §5 TD-006 TD-007, §30.1 Local, §32 Phase 0 |

## Goal

Developers can start local PostgreSQL with PostGIS and Redis (or approved local equivalents), and run migration tooling against an empty schema. Fake providers remain the default.

## Why this packet exists

Authoritative business data is PostgreSQL; Redis is queues/ephemera only (TDD §6). Phase 0 must include local dependencies and migration tooling without production integrations.

## Allowed files / packages

- Local compose or documented local-service instructions
- `packages/persistence` migration toolchain skeleton
- Sample `.env.example` with non-secret local values only

## Forbidden files / behaviors

- Managed cloud databases, real provider accounts
- Redis as assignment or financial source of truth
- Production-like personal data
- Full delivery schema (that is Phase 1+)

## Dependencies

P00-WP01 done. May proceed in parallel with P00-WP02 if files do not collide (compose vs toolchain). If both touch root scripts, serialize after WP02.

## Interfaces this packet must not invent

Do not pick a final ORM in a way that claims TDD §35 is closed; choose a baseline compatible with transactions, PostGIS, and explicit locks, and label it pending technical approval.

## Implementer definition of done

- [ ] Documented up/down for local Postgres/PostGIS and Redis
- [ ] Migration tool runs from empty database
- [ ] `.env.example` has no secrets
- [ ] Draft evidence

## Verifier definition of done

```text
# Bring local deps up
# Run migration against empty DB
# Confirm PostGIS available (e.g. CREATE EXTENSION / SELECT PostGIS_version)
# Confirm Redis ping
# Tear down or leave as documented
```

## Constraints

Fake providers by default. No production personal data in local env.

## Worker brief

```text
You are the Implementer for P00-WP03.
Read RULES.md (Implementer) and this packet.
Add local Postgres/PostGIS, Redis, and migration tooling only.
No cloud, no secrets, no product schema beyond a trivial migration smoke.
Do not mark ledger done.
```
