# P01-WP07: Focused E2E and integration mapped to §36.1

| Field      | Value                                                 |
| ---------- | ----------------------------------------------------- |
| ID         | P01-WP07                                              |
| Phase      | 1                                                     |
| Status     | blocked                                               |
| Depends on | P01-WP03, P01-WP04, P01-WP05, P01-WP06                |
| Ledger     | [LEDGER.md](../../LEDGER.md)                          |
| Evidence   | none                                                  |
| Citations  | TDD §29.3, §32 Phase 1 exit, §36.1, §36.3 last bullet |

## Goal

Run focused E2E and integration tests that map 1:1 to the approved Phase 1 acceptance outcome. Phase 1 is not complete until those tests have actually run.

## Why this packet exists

TDD §2 and §32: a phase is not complete until acceptance checks have run. G-01 requires named test cases linked to §36.1.

## Allowed files / packages

- Focused E2E in the agreed test harness
- Traceability table from test names → §36.1 bullets
- CI extension to run these focused tests

## Forbidden files / behaviors

- Treating unit tests as a substitute for the UI E2E
- Expanding into publish/payment ACs (AC-001, AC-009)

## Dependencies

All other P01 WPs done (or at least WP03–WP06; WP01–WP02 are implied).

## Interfaces this packet must not invent

Use G-01 named test list. If G-01 list differs from this packet, stop and escalate (conflict protocol).

## Implementer definition of done

- [ ] Tests named and linked to each §36.1 bullet
- [ ] Tests pass in the documented environment
- [ ] Traceability table in evidence
- [ ] Draft evidence

## Verifier definition of done

```text
{documented focused e2e}
{documented integration suite for draft}
```

Map every §36.1 bullet. Fail if any bullet is unmapped or not run.

## Worker brief

```text
You are the Implementer for P01-WP07.
Read RULES.md (Implementer) and this packet.
Add and run focused E2E/integration mapped to TDD §36.1.
Do not add Phase 2+ features. Do not mark ledger done.
```
