# P01-WP06: Cross-sender authorization isolation

| Field      | Value                                       |
| ---------- | ------------------------------------------- |
| ID         | P01-WP06                                    |
| Phase      | 1                                           |
| Status     | blocked                                     |
| Depends on | P01-WP01, P01-WP02                          |
| Ledger     | [LEDGER.md](../../LEDGER.md)                |
| Evidence   | none                                        |
| Citations  | TDD §23.2, §24, §36.1, §29.1 security tests |

## Goal

A second authenticated sender cannot read or mutate another sender’s draft. Failures use the shared error envelope without leaking existence details beyond the approved policy.

## Why this packet exists

TDD §36.1: inaccessible to another sender.

## Allowed files / packages

- `packages/auth` relationship policies
- API authorization on get/update draft
- Security tests for cross-user access

## Forbidden files / behaviors

- IDOR “convenience” admin bypass
- Support tooling that lists all drafts (Phase 8 / support packets)

## Dependencies

Authn + draft persistence.

## Interfaces this packet must not invent

Relationship-based authorization (TDD §4, §23). Do not use Redis as the authorization source of truth.

## Implementer definition of done

- [ ] Cross-sender get/update denied
- [ ] Tests observed
- [ ] Draft evidence

## Verifier definition of done

```text
{security/API test: sender B cannot access sender A draft}
```

Map: TDD §36.1 last clause.

## Worker brief

```text
You are the Implementer for P01-WP06.
Read RULES.md (Implementer) and this packet.
Enforce sender-to-delivery authorization so another sender cannot access the draft.
Do not mark ledger done.
```
