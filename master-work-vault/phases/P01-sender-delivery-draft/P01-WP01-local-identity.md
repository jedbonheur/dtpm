# P01-WP01: Local/test identity and sender auth boundary

| Field | Value |
|---|---|
| ID | P01-WP01 |
| Phase | 1 |
| Status | blocked |
| Depends on | G-01 |
| Ledger | [LEDGER.md](../../LEDGER.md) |
| Evidence | none |
| Citations | TDD §10 Identity, §23, §32 Phase 1, §36.1, PRD FR-001 |

## Goal

Senders can authenticate through a **local/test identity adapter** and receive a principal the API can authorize. No production identity vendor.

## Why this packet exists

Phase 1 requires a sender authentication boundary using a local/test identity adapter (TDD §32).

## Allowed files / packages

- `packages/auth`, `packages/providers` identity fake/local adapter
- `apps/api` session/auth wiring
- Tests for unauthenticated rejection

## Forbidden files / behaviors

- Real identity/verification providers
- Driver verification documents
- Admin impersonation without audit (out of scope)

## Dependencies

G-01 done (security/privacy approved this boundary).

## Interfaces this packet must not invent

Use typed config and error envelope from P00. Identity module must not own driver verification policy (TDD §10).

## Implementer definition of done

- [ ] Local/test adapter only
- [ ] Unauthenticated API calls fail with the shared error envelope
- [ ] Authenticated sender principal available to downstream packets
- [ ] Draft evidence

## Verifier definition of done

```text
{unit/API tests for authn success and failure}
```

Map: TDD §36.1 “authenticated sender”; PRD FR-001 as far as local identity goes.

## Constraints

TDD §36.4: no real identity documents.

## Worker brief

```text
You are the Implementer for P01-WP01.
Read RULES.md (Implementer) and this packet.
Implement local/test sender authentication only.
No live IdP. Do not mark ledger done.
```
