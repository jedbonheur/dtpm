# P04 — Matching, offer, and atomic assignment

| Field | Value |
|---|---|
| Phase | 4 |
| Status | blocked |
| Citations | TDD §14, §18, §29.2, §32 Phase 4; PRD AC-003–AC-005 |
| Blocker | TDD §36: not approved for implementation |

## Outcome

AC-003 through AC-005 pass, including deliberate acceptance/expiry/cancellation races.

## Packets

| ID | Title |
|---|---|
| P04-WP01 | PostGIS candidate query and eligibility |
| P04-WP02 | Score snapshot and explainable match-run evidence |
| P04-WP03 | Sequential offers and 60-second expiry |
| P04-WP04 | Push notification of offers (fake/sandbox) |
| P04-WP05 | Atomic acceptance and uniqueness |
| P04-WP06 | Rematch, unfulfilled, race tests AC-003–AC-005 |

PostgreSQL is assignment source of truth. Redis is not (TDD §34.4).
