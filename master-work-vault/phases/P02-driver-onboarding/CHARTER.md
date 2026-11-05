# P02 — Driver onboarding and availability

| Field     | Value                                                                        |
| --------- | ---------------------------------------------------------------------------- |
| Phase     | 2                                                                            |
| Status    | blocked                                                                      |
| Citations | TDD §32 Phase 2, §10 Driver/Support, §36.1 (not approved for implementation) |
| Blocker   | TDD §36: later MVP phases not approved                                       |

## Outcome

Only an approved eligible driver can go available. Negative authorization and expiry tests pass.

## Packets

| ID       | Title                                                      |
| -------- | ---------------------------------------------------------- |
| P02-WP01 | Driver profile, vehicle capacity, service area             |
| P02-WP02 | Verification-state workflow (no real documents)            |
| P02-WP03 | Payout-account status (sandbox/fake; no real banks)        |
| P02-WP04 | Availability + eligibility to go available                 |
| P02-WP05 | Support verification view, least privilege                 |
| P02-WP06 | Mobile permission explanation + development-build pipeline |

## Exit (TDD §32)

Only an approved eligible driver can go available; negative authorization and expiry tests pass.

## Forbidden until separately gated

Collection of real driver identity, licence, insurance, banking, or background-screening documents (TDD §36.4).
