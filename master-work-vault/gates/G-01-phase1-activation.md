# G-01: Phase 1 activation

| Field      | Value                                                    |
| ---------- | -------------------------------------------------------- |
| ID         | G-01                                                     |
| Phase      | Gate — before P01 coding                                 |
| Status     | done                                                     |
| Depends on | G-00 done; all P00 work packets done (Phase 0 exit)      |
| Ledger     | [LEDGER.md](../LEDGER.md)                                |
| Evidence   | [evidence/G-01.md](../evidence/G-01.md)                  |
| Citations  | TDD §32 Phase 1, TDD §36.1, TDD §36.3, PRD Phase 1 scope |

## Goal

Record everything TDD §36.3 requires so the provider-free sender delivery-draft slice may begin.

## Why this packet exists

Product owner approved Phase 1 _scope_ (TDD §36.1). That does not waive activation gates. Phase 1 coding starts only after Phase 0 exit evidence and the listed human approvals.

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

- [x] Phase 0 exit evidence linked
- [x] Technical owner approves executable repo commands for format, lint, typecheck, unit tests, DB integration tests, focused E2E, and builds (TDD §36.3)
- [x] Product design approves Phase 1 sender-draft screen states **or** records a bounded exception
- [x] Security/privacy approves: local/test auth boundary, sender-to-delivery authorization, audit event, test-data rules, secret-scanning baseline
- [x] Exact Phase 1 test cases are named and linked to the §36.1 acceptance outcome

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

| Item                              | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Date       | Who                                      |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ---------------------------------------- |
| Phase 0 exit evidence             | Linked [evidence/P00-WP06.md](../evidence/P00-WP06.md) Verifier pass 2026-11-10: all §9 apps build (`pnpm build`); example unit (`pnpm test`); DB integration (`pnpm test:integration`); HTTP E2E (`pnpm test:e2e`); no credentials or production integrations.                                                                                                                                                                                                                                                                                                              | 2026-11-10 | cursor-verifier-p00-wp06 (observed)      |
| Technical owner command set       | Jed Bonheur approves CONTRIBUTING executable set for Phase 1: `pnpm format`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:integration` (requires `pnpm deps:up` + `pnpm db:migrate`), `pnpm test:e2e`, `pnpm build`. Prettier/ESLint/Vitest remain Phase 0 process tooling; TDD §35 vendors still pending.                                                                                                                                                                                                                                                                                                                          | 2026-11-10 | @jed_bonheur                             |
| Product design screen states      | **Bounded exception:** no design specialist named in TDD §39. Product-owner 2026-10-28 UX approval covers Phase 1 draft screens; wireframes deferred. Phase 1 UI contract remains UX_FLOWS screen IDs **SH-02** (sign-in), **SE-01** (home/start), **SE-02** (pickup/destination), **SE-03** (parcel details) only — draft create/retrieve/reload/FR-EN. Explicit non-scope: SE-04–SE-12 and payment/matching flows.                                                                                                                                                                                                                         | 2026-11-10 | Founder / product lead (exception); UX 2026-10-28 |
| Security/privacy Phase 1 boundary | @jed_bonheur acting for Phase 1 only (TDD §39 security owner still TBD for later phases). Approves: (1) local/test identity adapter only — no real IdP or identity documents; (2) sender may only create/retrieve own drafts — cross-sender deny; (3) audit event on draft create; (4) synthetic test data only — no real customer PII; (5) secret-scanning baseline already in CI (gitleaks / P00-WP05). Dedicated security owner replaces this acting approval when named.                                                                                                                                                                  | 2026-11-10 | @jed_bonheur (acting Phase 1)            |
| Named Phase 1 test cases          | Named and linked to TDD §36.1 (implemented/run in P01-WP07): `P01-TC01-local-auth-sender` (authenticated sender); `P01-TC02-create-montreal-draft` (create one valid Montreal delivery draft); `P01-TC03-retrieve-draft-api-domain-db` (crosses API, domain, database); `P01-TC04-draft-survives-reload` (survives reload via UI); `P01-TC05-draft-ui-fr` / `P01-TC06-draft-ui-en` (French and English); `P01-TC07-audit-on-create` (writes an audit event); `P01-TC08-cross-sender-denied` (inaccessible to another sender).                                                                                                              | 2026-11-10 | @jed_bonheur                             |

## Worker brief

```text
You are recording G-01 (Phase 1 activation), not writing product code.
Read master-work-vault/RULES.md and this gate file.
Only fill Recorded decisions when humans have actually approved.
Do not start sender-web or delivery-draft implementation.
Forbidden: P01 coding, live providers, real data.
```
