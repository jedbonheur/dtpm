# Ledger

Master index of gates and work packets. Status lives **only** here. Packet files hold scope; this table holds state.

Bootstrap: read [RULES.md](RULES.md) first.

## Status

`blocked` → `ready` → `assigned` → `in_progress` → `verify` → `changes_requested` | `done`

WIP default: one `in_progress`, one `verify`.

## Legend

| Status            | Meaning                                             |
| ----------------- | --------------------------------------------------- |
| blocked           | Missing dependency, human approval, or TDD §36 gate |
| ready             | Master may assign                                   |
| assigned          | Brief written; work not started                     |
| in_progress       | Implementer executing                               |
| verify            | Verifier executing                                  |
| changes_requested | Verifier failed                                     |
| done              | Verifier pass evidence linked                       |

## Summary (2026-11-10)

| Area            | State                                                                |
| --------------- | -------------------------------------------------------------------- |
| Next assignable | P01-WP01 (G-01 `done`)                                               |
| Phase 0 coding  | P00-WP01–WP06 `done` (Verifier pass evidence linked)                 |
| Phase 1 coding  | G-01 `done`; P01-WP01 `ready`; WP02–WP07 blocked on packet deps      |
| Phases 2–8      | blocked — TDD §36 not approved for implementation                    |

## Gates

| ID   | Title              | Phase | Status  | Depends on          | Packet                                                             | Assignee | Evidence | Notes / blocker                                                                                                   |
| ---- | ------------------ | ----- | ------- | ------------------- | ------------------------------------------------------------------ | -------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| G-00 | Phase 0 activation | gate  | done    | —                   | [gates/G-00-phase0-activation.md](gates/G-00-phase0-activation.md) | —        | none     | Path, technical acceptance, branch/review policy still pending (TDD §36.2)                                        |
| G-01 | Phase 1 activation | gate  | done    | G-00; P00-WP01–WP06 | [gates/G-01-phase1-activation.md](gates/G-01-phase1-activation.md) | —        | [evidence/G-01.md](evidence/G-01.md) | Verifier pass 2026-11-10; §36.3 recorded (command set @jed_bonheur; design bounded exception; security acting Phase 1; P01-TC01–TC08 named) |

## Phase 0 — Repository foundation

Charter: [phases/P00-repository-foundation/CHARTER.md](phases/P00-repository-foundation/CHARTER.md)

| ID       | Title                                            | Phase | Status | Depends on                   | Packet                                                                                                                                                     | Assignee                 | Evidence                                     | Notes / blocker                                                                                                             |
| -------- | ------------------------------------------------ | ----- | ------ | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| P00-WP01 | Fresh monorepo skeleton                          | 0     | done   | G-00                         | [phases/P00-repository-foundation/P00-WP01-monorepo-skeleton.md](phases/P00-repository-foundation/P00-WP01-monorepo-skeleton.md)                           | cursor-verifier-p00-wp01 | [evidence/P00-WP01.md](evidence/P00-WP01.md) | Verifier pass 2026-11-05; Implementer was cursor-implementer                                                                |
| P00-WP02 | Format, lint, typecheck, unit tests              | 0     | done   | P00-WP01                     | [phases/P00-repository-foundation/P00-WP02-quality-tooling.md](phases/P00-repository-foundation/P00-WP02-quality-tooling.md)                               | cursor-verifier-p00-wp02 | [evidence/P00-WP02.md](evidence/P00-WP02.md) | Verifier pass 2026-11-05 (re-verify after LEDGER prettier fix); Implementer was cursor-implementer                          |
| P00-WP03 | Local Postgres/PostGIS, Redis, migrations        | 0     | done   | P00-WP01                     | [phases/P00-repository-foundation/P00-WP03-local-dependencies.md](phases/P00-repository-foundation/P00-WP03-local-dependencies.md)                         | cursor-verifier-p00-wp03 | [evidence/P00-WP03.md](evidence/P00-WP03.md) | Verifier pass 2026-11-09 (re-verify after Master vault Prettier fix); Implementer was cursor-implementer                    |
| P00-WP04 | Config, error envelope, observability, factories | 0     | done   | P00-WP01, P00-WP02           | [phases/P00-repository-foundation/P00-WP04-config-observability-factories.md](phases/P00-repository-foundation/P00-WP04-config-observability-factories.md) | cursor-verifier-p00-wp04 | [evidence/P00-WP04.md](evidence/P00-WP04.md) | Verifier pass 2026-11-10; Implementer was cursor-implementer                                                                |
| P00-WP05 | CI and secret scanning                           | 0     | done   | P00-WP02                     | [phases/P00-repository-foundation/P00-WP05-ci-secret-scanning.md](phases/P00-repository-foundation/P00-WP05-ci-secret-scanning.md)                         | cursor-verifier-p00-wp05 | [evidence/P00-WP05.md](evidence/P00-WP05.md) | Verifier pass 2026-11-10; observed Actions runs linked; Implementer was cursor-implementer                                  |
| P00-WP06 | Example unit, integration, E2E (Phase 0 exit)    | 0     | done   | P00-WP02, P00-WP03, P00-WP04 | [phases/P00-repository-foundation/P00-WP06-example-tests-exit.md](phases/P00-repository-foundation/P00-WP06-example-tests-exit.md)                         | cursor-verifier-p00-wp06 | [evidence/P00-WP06.md](evidence/P00-WP06.md) | Verifier pass 2026-11-10; Phase 0 coding exit evidence; Prisma migrate note in evidence; Implementer was cursor-implementer |

## Phase 1 — Sender delivery draft

Charter: [phases/P01-sender-delivery-draft/CHARTER.md](phases/P01-sender-delivery-draft/CHARTER.md)

| ID       | Title                               | Phase | Status  | Depends on         | Packet                                                                                                                                     | Assignee | Evidence | Notes / blocker |
| -------- | ----------------------------------- | ----- | ------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | -------- | -------- | --------------- |
| P01-WP01 | Local/test identity and sender auth | 1     | ready   | G-01               | [phases/P01-sender-delivery-draft/P01-WP01-local-identity.md](phases/P01-sender-delivery-draft/P01-WP01-local-identity.md)                 | —        | none     | G-01 done 2026-11-10 |
| P01-WP02 | Delivery draft create/retrieve      | 1     | blocked | P01-WP01           | [phases/P01-sender-delivery-draft/P01-WP02-delivery-draft-persist.md](phases/P01-sender-delivery-draft/P01-WP02-delivery-draft-persist.md) | —        | none     | P01-WP01         |
| P01-WP03 | Montreal address and parcel fakes   | 1     | blocked | P01-WP02           | [phases/P01-sender-delivery-draft/P01-WP03-montreal-parcel-fakes.md](phases/P01-sender-delivery-draft/P01-WP03-montreal-parcel-fakes.md)   | —        | none     | P01-WP02         |
| P01-WP04 | Audit event on draft create         | 1     | blocked | P01-WP02           | [phases/P01-sender-delivery-draft/P01-WP04-audit-event.md](phases/P01-sender-delivery-draft/P01-WP04-audit-event.md)                       | —        | none     | P01-WP02         |
| P01-WP05 | Sender web draft UI FR/EN           | 1     | blocked | P01-WP02, P01-WP03 | [phases/P01-sender-delivery-draft/P01-WP05-sender-web-i18n.md](phases/P01-sender-delivery-draft/P01-WP05-sender-web-i18n.md)               | —        | none     | P01-WP02, WP03   |
| P01-WP06 | Cross-sender authorization          | 1     | blocked | P01-WP01, P01-WP02 | [phases/P01-sender-delivery-draft/P01-WP06-cross-sender-authz.md](phases/P01-sender-delivery-draft/P01-WP06-cross-sender-authz.md)         | —        | none     | P01-WP01, WP02   |
| P01-WP07 | Focused E2E mapped to §36.1         | 1     | blocked | P01-WP03–WP06      | [phases/P01-sender-delivery-draft/P01-WP07-phase1-e2e.md](phases/P01-sender-delivery-draft/P01-WP07-phase1-e2e.md)                         | —        | none     | P01-WP03–WP06    |

## Phase 2 — Driver onboarding

Charter: [phases/P02-driver-onboarding/CHARTER.md](phases/P02-driver-onboarding/CHARTER.md)

Blocker for all rows: TDD §36 — not approved for implementation.

| ID       | Title                                   | Phase | Status  | Depends on                 | Packet                                                                                                                                   | Assignee | Evidence | Notes / blocker            |
| -------- | --------------------------------------- | ----- | ------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | -------------------------- |
| P02-WP01 | Driver profile, vehicle, service area   | 2     | blocked | Phase 2 approval; P01-WP07 | [phases/P02-driver-onboarding/P02-WP01-driver-profile.md](phases/P02-driver-onboarding/P02-WP01-driver-profile.md)                       | —        | none     | TDD §36                    |
| P02-WP02 | Verification-state workflow             | 2     | blocked | P02-WP01                   | [phases/P02-driver-onboarding/P02-WP02-verification-workflow.md](phases/P02-driver-onboarding/P02-WP02-verification-workflow.md)         | —        | none     | TDD §36; no real documents |
| P02-WP03 | Payout-account status                   | 2     | blocked | P02-WP01                   | [phases/P02-driver-onboarding/P02-WP03-payout-account-status.md](phases/P02-driver-onboarding/P02-WP03-payout-account-status.md)         | —        | none     | TDD §36                    |
| P02-WP04 | Availability / go-available eligibility | 2     | blocked | P02-WP02, P02-WP03         | [phases/P02-driver-onboarding/P02-WP04-availability.md](phases/P02-driver-onboarding/P02-WP04-availability.md)                           | —        | none     | TDD §36                    |
| P02-WP05 | Support verification view               | 2     | blocked | P02-WP02                   | [phases/P02-driver-onboarding/P02-WP05-support-verification-view.md](phases/P02-driver-onboarding/P02-WP05-support-verification-view.md) | —        | none     | TDD §36                    |
| P02-WP06 | Mobile permission + dev-build pipeline  | 2     | blocked | P00-WP01; Phase 2 approval | [phases/P02-driver-onboarding/P02-WP06-mobile-dev-pipeline.md](phases/P02-driver-onboarding/P02-WP06-mobile-dev-pipeline.md)             | —        | none     | TDD §36; no live location  |

## Phase 3 — Quote, payment, publish

Charter: [phases/P03-quote-payment-publish/CHARTER.md](phases/P03-quote-payment-publish/CHARTER.md)

Blocker: TDD §36.

| ID       | Title                               | Phase | Status  | Depends on                  | Packet                                                                                                                                     | Assignee | Evidence | Notes / blocker |
| -------- | ----------------------------------- | ----- | ------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------- | -------- | --------------- |
| P03-WP01 | Rate-card and quote                 | 3     | blocked | Phase 3 approval; P01 draft | [phases/P03-quote-payment-publish/P03-WP01-rate-card-quote.md](phases/P03-quote-payment-publish/P03-WP01-rate-card-quote.md)               | —        | none     | TDD §36         |
| P03-WP02 | Route adapter and quote expiry      | 3     | blocked | P03-WP01                    | [phases/P03-quote-payment-publish/P03-WP02-route-quote-expiry.md](phases/P03-quote-payment-publish/P03-WP02-route-quote-expiry.md)         | —        | none     | TDD §36         |
| P03-WP03 | Card sandbox authorization          | 3     | blocked | P03-WP01                    | [phases/P03-quote-payment-publish/P03-WP03-card-sandbox-auth.md](phases/P03-quote-payment-publish/P03-WP03-card-sandbox-auth.md)           | —        | none     | TDD §36         |
| P03-WP04 | Publication and matching-wait state | 3     | blocked | P03-WP02, P03-WP03          | [phases/P03-quote-payment-publish/P03-WP04-publish-matching-state.md](phases/P03-quote-payment-publish/P03-WP04-publish-matching-state.md) | —        | none     | TDD §36         |
| P03-WP05 | Bank payment feature flag           | 3     | blocked | P03-WP03                    | [phases/P03-quote-payment-publish/P03-WP05-bank-payment-flag.md](phases/P03-quote-payment-publish/P03-WP05-bank-payment-flag.md)           | —        | none     | TDD §36         |
| P03-WP06 | Verify AC-001, AC-002, AC-009       | 3     | blocked | P03-WP04, P03-WP05          | [phases/P03-quote-payment-publish/P03-WP06-ac-verify.md](phases/P03-quote-payment-publish/P03-WP06-ac-verify.md)                           | —        | none     | TDD §36         |

## Phase 4 — Matching and assignment

Charter: [phases/P04-matching-assignment/CHARTER.md](phases/P04-matching-assignment/CHARTER.md)

Blocker: TDD §36.

| ID       | Title                        | Phase | Status  | Depends on         | Packet                                                                                                                           | Assignee | Evidence | Notes / blocker |
| -------- | ---------------------------- | ----- | ------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | --------------- |
| P04-WP01 | PostGIS eligibility          | 4     | blocked | P02-WP04, P03-WP04 | [phases/P04-matching-assignment/P04-WP01-postgis-eligibility.md](phases/P04-matching-assignment/P04-WP01-postgis-eligibility.md) | —        | none     | TDD §36         |
| P04-WP02 | Score snapshot               | 4     | blocked | P04-WP01           | [phases/P04-matching-assignment/P04-WP02-score-snapshot.md](phases/P04-matching-assignment/P04-WP02-score-snapshot.md)           | —        | none     | TDD §36         |
| P04-WP03 | Sequential offers and expiry | 4     | blocked | P04-WP02           | [phases/P04-matching-assignment/P04-WP03-sequential-offers.md](phases/P04-matching-assignment/P04-WP03-sequential-offers.md)     | —        | none     | TDD §36         |
| P04-WP04 | Offer push                   | 4     | blocked | P04-WP03           | [phases/P04-matching-assignment/P04-WP04-offer-push.md](phases/P04-matching-assignment/P04-WP04-offer-push.md)                   | —        | none     | TDD §36         |
| P04-WP05 | Atomic acceptance            | 4     | blocked | P04-WP03           | [phases/P04-matching-assignment/P04-WP05-atomic-acceptance.md](phases/P04-matching-assignment/P04-WP05-atomic-acceptance.md)     | —        | none     | TDD §36         |
| P04-WP06 | Races; AC-003–AC-005         | 4     | blocked | P04-WP04, P04-WP05 | [phases/P04-matching-assignment/P04-WP06-races-ac-verify.md](phases/P04-matching-assignment/P04-WP06-races-ac-verify.md)         | —        | none     | TDD §36         |

## Phase 5 — Pickup and tracking

Charter: [phases/P05-pickup-tracking/CHARTER.md](phases/P05-pickup-tracking/CHARTER.md)

Blocker: TDD §36 plus location/privacy gate (TDD §36.4).

| ID       | Title                           | Phase | Status  | Depends on                   | Packet                                                                                                                         | Assignee | Evidence | Notes / blocker |
| -------- | ------------------------------- | ----- | ------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------- | -------- | --------------- |
| P05-WP01 | Pickup code                     | 5     | blocked | P04-WP05; Phase 5 gates      | [phases/P05-pickup-tracking/P05-WP01-pickup-code.md](phases/P05-pickup-tracking/P05-WP01-pickup-code.md)                       | —        | none     | TDD §36         |
| P05-WP02 | Capture saga                    | 5     | blocked | P05-WP01, P03-WP03           | [phases/P05-pickup-tracking/P05-WP02-capture-saga.md](phases/P05-pickup-tracking/P05-WP02-capture-saga.md)                     | —        | none     | TDD §36         |
| P05-WP03 | Background location permissions | 5     | blocked | P02-WP06; privacy gate       | [phases/P05-pickup-tracking/P05-WP03-background-permissions.md](phases/P05-pickup-tracking/P05-WP03-background-permissions.md) | —        | none     | TDD §36.4       |
| P05-WP04 | Location ingest                 | 5     | blocked | P05-WP01, P05-WP03           | [phases/P05-pickup-tracking/P05-WP04-location-ingest.md](phases/P05-pickup-tracking/P05-WP04-location-ingest.md)               | —        | none     | TDD §36.4       |
| P05-WP05 | WebSocket fan-out               | 5     | blocked | P05-WP04                     | [phases/P05-pickup-tracking/P05-WP05-websocket-fanout.md](phases/P05-pickup-tracking/P05-WP05-websocket-fanout.md)             | —        | none     | TDD §36         |
| P05-WP06 | Stale location and retention    | 5     | blocked | P05-WP04                     | [phases/P05-pickup-tracking/P05-WP06-stale-retention.md](phases/P05-pickup-tracking/P05-WP06-stale-retention.md)               | —        | none     | TDD §36         |
| P05-WP07 | Verify AC-006, AC-007, AC-012   | 5     | blocked | P05-WP02, P05-WP05, P05-WP06 | [phases/P05-pickup-tracking/P05-WP07-ac-verify.md](phases/P05-pickup-tracking/P05-WP07-ac-verify.md)                           | —        | none     | TDD §36         |

## Phase 6 — Proof, completion, issues

Charter: [phases/P06-proof-completion-issues/CHARTER.md](phases/P06-proof-completion-issues/CHARTER.md)

Blocker: TDD §36.

| ID       | Title                            | Phase | Status  | Depends on         | Packet                                                                                                                       | Assignee | Evidence | Notes / blocker |
| -------- | -------------------------------- | ----- | ------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | --------------- |
| P06-WP01 | Private photo upload             | 6     | blocked | P05-WP01           | [phases/P06-proof-completion-issues/P06-WP01-private-photo.md](phases/P06-proof-completion-issues/P06-WP01-private-photo.md) | —        | none     | TDD §36         |
| P06-WP02 | Completion and tracking shutdown | 6     | blocked | P06-WP01           | [phases/P06-proof-completion-issues/P06-WP02-completion.md](phases/P06-proof-completion-issues/P06-WP02-completion.md)       | —        | none     | TDD §36         |
| P06-WP03 | Rating                           | 6     | blocked | P06-WP02           | [phases/P06-proof-completion-issues/P06-WP03-rating.md](phases/P06-proof-completion-issues/P06-WP03-rating.md)               | —        | none     | TDD §36         |
| P06-WP04 | 24-hour issue window             | 6     | blocked | P06-WP02           | [phases/P06-proof-completion-issues/P06-WP04-issue-window.md](phases/P06-proof-completion-issues/P06-WP04-issue-window.md)   | —        | none     | TDD §36         |
| P06-WP05 | State-aware cancellation         | 6     | blocked | P03-WP04, P04-WP05 | [phases/P06-proof-completion-issues/P06-WP05-cancellation.md](phases/P06-proof-completion-issues/P06-WP05-cancellation.md)   | —        | none     | TDD §36         |
| P06-WP06 | Failed delivery / return         | 6     | blocked | P06-WP05, P02-WP05 | [phases/P06-proof-completion-issues/P06-WP06-failed-return.md](phases/P06-proof-completion-issues/P06-WP06-failed-return.md) | —        | none     | TDD §36         |
| P06-WP07 | Verify AC-008, AC-011, UF-07–09  | 6     | blocked | P06-WP02–WP06      | [phases/P06-proof-completion-issues/P06-WP07-ac-verify.md](phases/P06-proof-completion-issues/P06-WP07-ac-verify.md)         | —        | none     | TDD §36         |

## Phase 7 — Ledger and payout

Charter: [phases/P07-ledger-payout/CHARTER.md](phases/P07-ledger-payout/CHARTER.md)

Blocker: TDD §36; finance/payments human approval.

| ID       | Title                   | Phase | Status  | Depends on                   | Packet                                                                                                         | Assignee | Evidence | Notes / blocker |
| -------- | ----------------------- | ----- | ------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------- | -------- | -------- | --------------- |
| P07-WP01 | Double-entry ledger     | 7     | blocked | Phase 7 + finance approval   | [phases/P07-ledger-payout/P07-WP01-double-entry.md](phases/P07-ledger-payout/P07-WP01-double-entry.md)         | —        | none     | TDD §36         |
| P07-WP02 | 15/85 fee split         | 7     | blocked | P07-WP01, P06-WP02           | [phases/P07-ledger-payout/P07-WP02-fee-split.md](phases/P07-ledger-payout/P07-WP02-fee-split.md)               | —        | none     | TDD §36         |
| P07-WP03 | Credits, refunds, holds | 7     | blocked | P07-WP01, P06-WP04, P06-WP05 | [phases/P07-ledger-payout/P07-WP03-refunds-holds.md](phases/P07-ledger-payout/P07-WP03-refunds-holds.md)       | —        | none     | TDD §36         |
| P07-WP04 | Cleared earnings        | 7     | blocked | P07-WP02, P06-WP04           | [phases/P07-ledger-payout/P07-WP04-cleared-earnings.md](phases/P07-ledger-payout/P07-WP04-cleared-earnings.md) | —        | none     | TDD §36         |
| P07-WP05 | Weekly payout batch     | 7     | blocked | P07-WP04                     | [phases/P07-ledger-payout/P07-WP05-weekly-payout.md](phases/P07-ledger-payout/P07-WP05-weekly-payout.md)       | —        | none     | TDD §36         |
| P07-WP06 | Sandbox reconciliation  | 7     | blocked | P07-WP05                     | [phases/P07-ledger-payout/P07-WP06-reconciliation.md](phases/P07-ledger-payout/P07-WP06-reconciliation.md)     | —        | none     | TDD §36         |
| P07-WP07 | Verify AC-010           | 7     | blocked | P07-WP02–WP06                | [phases/P07-ledger-payout/P07-WP07-ac-verify.md](phases/P07-ledger-payout/P07-WP07-ac-verify.md)               | —        | none     | TDD §36         |

## Phase 8 — Pilot hardening

Charter: [phases/P08-pilot-hardening/CHARTER.md](phases/P08-pilot-hardening/CHARTER.md)

Blocker: TDD §36; completing P08 does not launch the pilot.

| ID       | Title                          | Phase | Status  | Depends on                | Packet                                                                                                                 | Assignee | Evidence | Notes / blocker          |
| -------- | ------------------------------ | ----- | ------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------- | -------- | ------------------------ |
| P08-WP01 | Support tooling                | 8     | blocked | P06-WP06, P02-WP05        | [phases/P08-pilot-hardening/P08-WP01-support-tooling.md](phases/P08-pilot-hardening/P08-WP01-support-tooling.md)       | —        | none     | TDD §36                  |
| P08-WP02 | Bilingual and accessibility    | 8     | blocked | product surfaces          | [phases/P08-pilot-hardening/P08-WP02-i18n-a11y.md](phases/P08-pilot-hardening/P08-WP02-i18n-a11y.md)                   | —        | none     | TDD §36                  |
| P08-WP03 | Alerts and metrics             | 8     | blocked | P00-WP04                  | [phases/P08-pilot-hardening/P08-WP03-alerts-metrics.md](phases/P08-pilot-hardening/P08-WP03-alerts-metrics.md)         | —        | none     | TDD §36                  |
| P08-WP04 | Load-smoke and recovery drills | 8     | blocked | matching/location/queues  | [phases/P08-pilot-hardening/P08-WP04-load-recovery.md](phases/P08-pilot-hardening/P08-WP04-load-recovery.md)           | —        | none     | TDD §36                  |
| P08-WP05 | Retention evidence             | 8     | blocked | P05-WP06                  | [phases/P08-pilot-hardening/P08-WP05-retention-evidence.md](phases/P08-pilot-hardening/P08-WP05-retention-evidence.md) | —        | none     | TDD §36                  |
| P08-WP06 | Security review (human)        | 8     | blocked | security tests            | [phases/P08-pilot-hardening/P08-WP06-security-review.md](phases/P08-pilot-hardening/P08-WP06-security-review.md)       | —        | none     | Human gate               |
| P08-WP07 | Runbooks and pilot flags       | 8     | blocked | P08-WP03                  | [phases/P08-pilot-hardening/P08-WP07-runbooks-flags.md](phases/P08-pilot-hardening/P08-WP07-runbooks-flags.md)         | —        | none     | TDD §36                  |
| P08-WP08 | Release-criteria evidence pack | 8     | blocked | P08-WP01–WP07; AC-001–012 | [phases/P08-pilot-hardening/P08-WP08-release-criteria.md](phases/P08-pilot-hardening/P08-WP08-release-criteria.md)     | —        | none     | Does not authorize pilot |

## Templates and evidence

| Artifact              | Path                                                         |
| --------------------- | ------------------------------------------------------------ |
| Work packet template  | [templates/work-packet.md](templates/work-packet.md)         |
| Worker brief template | [templates/worker-brief.md](templates/worker-brief.md)       |
| Evidence template     | [templates/evidence-record.md](templates/evidence-record.md) |
| Evidence directory    | [evidence/README.md](evidence/README.md)                     |
