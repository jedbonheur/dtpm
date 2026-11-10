# P01 — First vertical slice: sender delivery draft

| Field     | Value                                                   |
| --------- | ------------------------------------------------------- |
| Phase     | 1                                                       |
| Status    | active — G-01 done; P01-WP01 ready                      |
| Citations | TDD §32 Phase 1, §36.1, §36.3, §36.4; PRD Phase 1 input |
| Approval  | Product owner approved Phase 1 sender-draft scope; identity per G-01 (Auth0 Development tenant) |

## Outcome (TDD §36.1)

An authenticated sender can create and retrieve one valid Montreal delivery draft through the UI; the draft crosses API, domain, and database boundaries; survives reload; appears in French and English; writes an audit event; and is inaccessible to another sender.

## Packets

| ID       | Title                                                    |
| -------- | -------------------------------------------------------- |
| P01-WP01 | Auth0 Development identity and sender auth boundary      |
| P01-WP02 | Delivery draft create/retrieve (API → domain → Postgres) |
| P01-WP03 | Montreal address shape and parcel limits (fakes)         |
| P01-WP04 | Audit event on draft create                              |
| P01-WP05 | Sender web: draft UI, reload, French and English         |
| P01-WP06 | Cross-sender authorization isolation                     |
| P01-WP07 | Focused E2E and integration mapped to §36.1              |

## Forbidden for the whole phase

Payments, matching, offers, assignment, pickup, location, real identity documents, driver app product behavior, production, real customer data (TDD §36.4).
