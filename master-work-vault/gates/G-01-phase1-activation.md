# G-01: Phase 1 activation

| Field | Value |
|---|---|
| ID | G-01 |
| Phase | Gate — before P01 coding |
| Status | blocked |
| Depends on | G-00 done; all P00 work packets done (Phase 0 exit) |
| Ledger | [LEDGER.md](../LEDGER.md) |
| Evidence | none |
| Citations | TDD §32 Phase 1, TDD §36.1, TDD §36.3, PRD Phase 1 scope |

## Goal

Record everything TDD §36.3 requires so the provider-free sender delivery-draft slice may begin.

## Why this packet exists

Product owner approved Phase 1 *scope* (TDD §36.1). That does not waive activation gates. Phase 1 coding starts only after Phase 0 exit evidence and the listed human approvals.

## Allowed files / packages

- This gate file’s recorded-decisions table
- Ledger status updates by master
- Links to P00 evidence files and named test cases

## Forbidden files / behaviors

- Starting P01 coding packets
- Real identity providers, payments, matching, location, or production
- Waiving missing approvals

## Dependencies

Upstream done means:

- G-00 `done`
- P00-WP01 through P00-WP06 `done` with Verifier pass evidence
- Phase 0 exit observed: all empty applications build; one example unit, database integration, and E2E check pass; no credentials or production integrations (TDD §32 / §36.3)

## Interfaces this packet must not invent

Do not redesign the Phase 1 product outcome. It is already approved (TDD §36.1): an authenticated sender can create and retrieve one valid Montreal delivery draft through the UI; the draft crosses API, domain, and database boundaries; survives reload; appears in French and English; writes an audit event; and is inaccessible to another sender.

## Implementer definition of done

Human / master recording only:

- [ ] Phase 0 exit evidence linked
- [ ] Technical owner approves executable repo commands for format, lint, typecheck, unit tests, DB integration tests, focused E2E, and builds (TDD §36.3)
- [ ] Product design approves Phase 1 sender-draft screen states **or** records a bounded exception
- [ ] Security/privacy approves: local/test auth boundary, sender-to-delivery authorization, audit event, test-data rules, secret-scanning baseline
- [ ] Exact Phase 1 test cases are named and linked to the §36.1 acceptance outcome

## Verifier definition of done

```text
# Inspect this file and linked evidence. Every §36.3 bullet must have a named approver and date.
# Confirm P00 evidence files exist and verdict is pass.
```

Map to TDD §36.3. Fail if any approval is still TBD.

## Constraints

- Phase 1 remains provider-free: local/test identity and fakes only (TDD §36.1, §36.4)
- Human gates stay human

## Recorded decisions

| Item | Value | Date | Who |
|---|---|---|---|
| Phase 0 exit evidence | blocked on P00 | — | — |
| Technical owner command set | pending | — | — |
| Product design screen states | pending | — | — |
| Security/privacy Phase 1 boundary | pending | — | — |
| Named Phase 1 test cases | pending | — | — |

## Worker brief

```text
You are recording G-01 (Phase 1 activation), not writing product code.
Read master-work-vault/RULES.md and this gate file.
Only fill Recorded decisions when humans have actually approved.
Do not start sender-web or delivery-draft implementation.
Forbidden: P01 coding, live providers, real data.
```
