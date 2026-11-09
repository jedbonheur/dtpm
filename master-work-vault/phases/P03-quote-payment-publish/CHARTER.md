# P03 — Quote, payment authorization, and publication

| Field     | Value                                                 |
| --------- | ----------------------------------------------------- |
| Phase     | 3                                                     |
| Status    | blocked                                               |
| Citations | TDD §16, §17, §32 Phase 3; PRD AC-001, AC-002, AC-009 |
| Blocker   | TDD §36: not approved for implementation              |

## Outcome

AC-001, AC-002, and AC-009 pass with provider sandbox/fakes and idempotent retries. Bank payment remains feature-gated until approved.

## Packets

| ID       | Title                                         |
| -------- | --------------------------------------------- |
| P03-WP01 | Rate-card version and quote calculation       |
| P03-WP02 | Route adapter (fake/sandbox) and quote expiry |
| P03-WP03 | Card sandbox authorization (idempotent)       |
| P03-WP04 | Publication and sender matching-wait state    |
| P03-WP05 | Feature flag: bank payment disabled           |
| P03-WP06 | AC-001, AC-002, AC-009 verification           |

## Forbidden

Real card/bank transactions, production payment accounts (TDD §36.4).
