# Product Requirements Document: Automated Delivery Marketplace

| Field            | Value                                                                                                             |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| Status           | v0.3 — product-owner approved as input for Phase 0 and provider-free Phase 1; full MVP and pilot approval pending |
| Product name     | To be determined                                                                                                  |
| Working category | Automated two-sided delivery marketplace with real-time tracking                                                  |
| Product owner    | Founder / product lead                                                                                            |
| Technical owner  | Jed Bonheur                                                                                                       |
| Last updated     | 2026-10-28                                                                                                        |
| Source           | Initial product-discovery conversation and founder decision review                                                |

## 1. Purpose of this document

This PRD defines what the first viable version of the delivery marketplace must accomplish, for whom, and how success will be evaluated. It is the product source of truth for the UX flows and Technical Design Document (TDD) that follow.

This PRD is approved by the product owner as the product input for repository foundation work (Phase 0) and the provider-free sender-draft vertical slice (Phase 1). It is not approval for the remaining MVP phases or the Montreal pilot. Statements marked **Confirmed direction** or **Confirmed decision** reflect founder decisions. Statements marked **Assumption** or **Proposed** still require validation or specialist approval where identified. Legal, insurance, tax, payment-provider, and operational feasibility remain later-phase and launch gates.

The PRD intentionally avoids choosing frameworks, databases, hosting providers, or detailed architecture. Those decisions belong in the TDD after the product requirements are approved.

## 2. Product summary

### 2.1 Product concept

**Confirmed direction:** The product is an automated two-sided marketplace connecting:

- **Senders**, who need an item delivered; and
- **Independent drivers**, who subscribe to receive eligible delivery offers.

The normal workflow has no human dispatcher, broker, or middle manager. The platform identifies eligible drivers, ranks them using explainable rules, offers the delivery to one driver at a time, and moves to another driver when an offer is declined or expires. A driver must explicitly accept before being assigned.

After pickup, the sender can follow delivery status and the parcel's live location until delivery is completed.

### 2.2 Product promise

**Proposed:** A sender can request a trustworthy local delivery without finding or negotiating with a driver, while a qualified driver can receive relevant work without searching for customers.

### 2.3 Problem statement

**Assumption:** People and small organizations that need local items delivered do not always have a fast, trustworthy way to find a suitable available driver. They may rely on personal contacts, calls, messages, or informal arrangements, creating uncertainty about availability, suitability, accountability, and delivery progress.

**Assumption:** Independent drivers need a reliable way to receive suitable delivery opportunities without manually finding and negotiating with each sender.

These problem statements have not yet been validated through sender or driver research.

## 3. Users

### 3.1 Primary user: sender

A person or small organization that needs a single item or parcel moved from one local address to another.

**Core job:** "Get this item delivered by a trustworthy person, with minimal coordination, and know what is happening until it arrives."

### 3.2 Primary user: driver

An independent delivery driver registered with the platform and eligible to receive delivery offers.

**Core job:** "Receive suitable delivery opportunities, decide whether to accept them, and complete them with clear instructions and proof."

### 3.3 Secondary user: support or risk administrator

An internal operator who handles account verification, safety incidents, disputes, or exceptional failures. This role does not manually broker or assign routine deliveries.

## 4. Goals and non-goals

### 4.1 MVP goals

The MVP must enable a limited group of real senders and drivers to complete real local deliveries and allow the product team to evaluate whether:

1. Senders will submit delivery requests.
2. The platform can identify and rank suitable drivers.
3. Drivers will accept relevant offers.
4. Accepted deliveries can progress safely from pickup to completion.
5. Status, location visibility, and proof of delivery create sufficient trust.
6. The process can operate without a human dispatcher in the normal path.

### 4.2 Non-goals for the MVP

Unless later approved, the MVP will not include:

- Driver bidding or sender-selected drivers
- Machine-learning-based matching
- Route optimization or multi-stop routes
- Scheduled deliveries in the MVP; scheduled delivery is planned after the immediate-delivery pilot
- Long-haul freight or international shipping
- Multiple business organizations and enterprise administration
- Dynamic or surge pricing
- Loyalty programs, promotions, or referral systems
- A public social reputation network
- Automated claims adjudication
- Native iOS and Android applications if a responsive web experience is sufficient for the pilot

## 5. MVP hypothesis and boundary

### 5.1 Core hypothesis

**Proposed:** If senders can post a local delivery request and the platform automatically offers it to suitable drivers, then enough drivers will accept and complete those deliveries for both sides to prefer the marketplace over informal coordination.

### 5.2 MVP definition

The MVP is the smallest real product in which:

1. A verified sender creates an immediate delivery request within the City of Montreal.
2. The platform validates one supported parcel that can be safely carried in a mid-size SUV.
3. The platform calculates a quote and authorizes sender payment.
4. The platform filters and ranks eligible available drivers.
5. The platform offers the request to one driver at a time.
6. A driver accepts or declines within the 60-second offer window.
7. The platform falls back to the next eligible driver when necessary.
8. Pickup is confirmed.
9. The sender sees delivery status and permitted live location data.
10. Delivery is completed with an uploaded photo as proof.
11. The platform retains a 15% service fee and makes the remaining delivery payout eligible for weekly bank transfer to the driver.
12. Essential cancellation, unfulfilled, failed-delivery, payment, and tracking-interruption states are handled.

### 5.3 Confirmed commercial direction

**Confirmed decision:** The sender receives a delivery quote based on road distance, parcel dimensions, size tier, and weight. The same offer shows the driver the delivery details and guaranteed payout. The sender pays by card or verified bank account. The platform retains a 15% service fee from the delivery subtotal, and the driver's cleared balance is paid weekly by bank transfer.

The exact rate card, taxes, payment-provider fees, toll handling, and driver tax reporting require financial and legal validation before the pilot.

## 6. End-to-end product journey

1. The sender signs in and starts a delivery request.
2. The sender enters pickup, destination, parcel dimensions and weight, and contact details for an immediate delivery.
3. The platform validates Montreal service boundaries, parcel restrictions, and required information.
4. The platform calculates a quote from the approved rate card and displays the price breakdown.
5. The sender chooses card or an eligible verified bank account and authorizes payment.
6. The sender publishes the request.
7. The platform finds eligible available drivers.
8. The platform ranks eligible drivers using explainable factors.
9. The highest-ranked driver receives a 60-second offer showing the guaranteed payout.
10. The driver accepts or declines.
11. If declined or expired, the next eligible driver receives the offer.
12. On acceptance, the delivery is locked to that driver and both parties receive confirmation.
13. The driver travels to the pickup location and confirms pickup using the approved pickup method.
14. The sender can see permitted status and location updates during delivery.
15. The driver completes delivery and uploads a delivery photo.
16. The sender sees the completed state and proof of delivery.
17. The platform calculates its 15% service fee and the driver's cleared payout balance.
18. The platform retains an auditable event history for support and disputes.

## 7. Delivery lifecycle

The proposed delivery states are:

```text
Draft
  -> Posted
  -> Matching
  -> Offered
  -> Accepted
  -> At pickup
  -> Picked up
  -> In transit
  -> Delivered
```

Terminal or exceptional states:

```text
Cancelled by sender
Cancelled by driver
Unfulfilled — no eligible driver
Failed delivery
Payment failed
```

State names and permitted transitions must be finalized during UX-flow design and represented explicitly in the TDD.

## 8. Matching rules

### 8.1 Eligibility gate

A driver must satisfy every approved eligibility rule before ranking. Proposed rules include:

- Account is active and in good standing.
- Required identity or driver verification is complete.
- Driver is currently available.
- Pickup is inside the driver's service area.
- Destination is inside the supported delivery area.
- Vehicle type and capacity are suitable for the parcel.
- Driver holds any qualification required for the item category.
- Driver has no conflicting accepted delivery, unless concurrent work is explicitly supported.
- Driver is using a registered vehicle with enough verified capacity for the parcel.

### 8.2 Ranking

Eligible drivers are assigned an explainable score after passing the eligibility gate. The proposed pilot weights are:

- 40% estimated travel time to pickup
- 25% delivery completion reliability
- 15% offer acceptance reliability
- 10% customer rating
- 10% bounded fairness factor for qualified new drivers

Vehicle suitability is a mandatory eligibility rule, not a score that can compensate for an unsuitable vehicle. New drivers begin with neutral reliability and rating values and receive a temporary fairness opportunity; they are not automatically ranked above clearly closer or more reliable drivers. Ties are resolved first by lower estimated travel time and then by the driver who has waited longer since their last platform offer.

### 8.3 Offer behavior

- The platform offers a delivery to one driver at a time during the MVP.
- Each offer has a visible 60-second expiry time.
- Acceptance must be atomic: only one driver can win a delivery.
- Declined and expired offers proceed to the next eligible driver.
- The sender does not select or negotiate with individual drivers.
- When no driver can be matched, the sender receives a clear unfulfilled outcome.

### 8.4 Service area and parcel policy

**Confirmed decision:** The MVP serves immediate deliveries whose pickup and destination are both inside the City of Montreal. Scheduled delivery remains post-MVP.

**Proposed parcel limits:** One packaged item per request, no more than 25 kg, with maximum outer dimensions of 100 cm × 70 cm × 60 cm. The parcel must fit safely in a mid-size SUV with seats folded, allow the driver to maintain safe visibility, and be manageable by one driver without specialized lifting equipment.

Permitted pilot categories include documents, clothing, packaged household goods, and packaged consumer electronics. The MVP excludes people, live animals, cash, weapons, illegal goods, alcohol, cannabis, tobacco, prescription drugs, hazardous materials, temperature-controlled goods, unpackaged food, and items declared above CAD 1,000 in value. Fragile items must be securely packaged and declared.

### 8.5 Pricing, payment, service fee, and payout

- Prices are in Canadian dollars.
- The delivery subtotal is calculated from a configurable base charge, road distance, parcel size tier, and parcel weight tier.
- Dynamic or surge pricing is out of scope for the MVP.
- Taxes and approved pass-through charges are shown separately from the delivery subtotal.
- A quote is valid for 10 minutes; after expiry, the sender must request a refreshed quote.
- The driver offer shows pickup and destination areas, estimated distance and duration, parcel size and weight, special handling information, and guaranteed payout after the 15% service fee.
- The sender authorizes the full quoted amount before publication. The authorization is voided when no driver is assigned or the sender cancels before assignment.
- The authorized amount is captured when pickup is confirmed. Refunds and adjustments follow the approved cancellation and failed-delivery policy.
- Card and verified bank-account payment are product requirements. Card is the default for immediate delivery; bank payment may be restricted to verified senders if payment-provider settlement risk requires it.
- The platform service fee is 15% of the delivery subtotal, excluding taxes, voluntary tips, and pass-through charges. The driver receives the remaining 85% of the subtotal.
- Cleared driver earnings are paid weekly by bank transfer for the previous completed payout period. A delivery becomes payout-eligible after completion and a 24-hour issue-reporting window.
- Any voluntary tip is passed fully to the driver, although tipping may be postponed from the MVP interface.

### 8.6 Driver membership and verification

For the MVP, "driver subscription" means an approved active driver membership, not a recurring subscription charge. Monetization comes from the 15% service fee.

Before receiving offers, a driver must provide identity information, a valid driver's licence, vehicle registration, proof of appropriate insurance, supported vehicle details, and a bank account owned by the driver. Any criminal-record or other background screening must be legally reviewed, consent-based, and approved before it becomes a launch requirement.

### 8.7 Pickup, delivery proof, and ratings

- Pickup is confirmed with a one-time code supplied by the sender and entered by the driver.
- Proof of delivery is a photo uploaded by the driver and associated with delivery ID, completion time, and permitted location evidence.
- The proof photo should show the parcel at the approved destination and avoid capturing recognizable people unless they consent.
- The sender may report an issue during the 24-hour issue-reporting window.
- After completion, the sender can rate the driver from one to five and select structured feedback tags. A driver's rating affects matching only after at least five completed rated deliveries; before that threshold, the neutral new-driver policy applies.

### 8.8 Cancellation and failed-delivery policy

- Sender cancellation before driver assignment is free and voids the payment authorization.
- Sender cancellation after driver assignment but before pickup incurs 20% of the delivery subtotal, capped at CAD 10. Eighty percent of that cancellation charge is credited to the assigned driver and 20% to the platform.
- After pickup, ordinary cancellation is unavailable; the sender must contact support for return or alternate handling and may be charged the original delivery plus a return charge.
- Driver cancellation before pickup triggers rematching without a sender fee and records a reliability event. Verified safety or vehicle-emergency reasons may be exempted after review.
- If no driver accepts, the delivery becomes unfulfilled and the sender is not charged.
- If delivery cannot be completed, the driver must attempt contact, wait 10 minutes at the destination, and open a failed-delivery flow. The parcel must not be left unattended unless the sender explicitly authorizes it. Return or redelivery terms must be shown before the sender confirms the next action.

### 8.9 Location, notifications, and pilot support

- Precise sender-visible tracking begins after pickup and ends when the delivery is delivered, failed, or cancelled.
- The target location interval is 10 seconds while moving and 30 seconds while stationary when device and network conditions permit.
- A location becomes stale after 60 seconds and must be labeled with its last-update time.
- Precise route/location records are retained for 30 days for support and disputes, then deleted or irreversibly aggregated, subject to legal approval.
- P0 notifications are in-app plus push or an equivalent immediate foreground alert for offers, assignment, pickup, cancellation, failure, and completion. Email provides payment receipts and completion summaries. SMS is P1.
- The proposed pilot operating and support window is 07:00–23:00 Montreal local time, every day. New immediate requests are accepted only when the estimated delivery can be supported within that window.

## 9. Functional requirements

Priorities use **P0** for required MVP behavior and **P1** for desirable behavior that may be postponed.

| ID     | Priority | Requirement                                                                                                                                                                     |
| ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-001 | P0       | A user can create an account, sign in, and use an authorized sender or driver role.                                                                                             |
| FR-002 | P0       | A sender can create one immediate-delivery request with Montreal pickup and destination, parcel dimensions and weight, and contact details.                                     |
| FR-003 | P0       | The platform validates required fields, City of Montreal service boundaries, one-parcel limits, permitted categories, and operating hours before publication.                   |
| FR-004 | P0       | The platform calculates and displays a 10-minute quote with delivery subtotal, taxes, pass-through charges, and total.                                                          |
| FR-005 | P0       | The sender can view the current delivery state and an understandable history of material state changes.                                                                         |
| FR-006 | P0       | A driver can submit and maintain required identity, licence, vehicle, insurance, service-area, and payout information.                                                          |
| FR-007 | P0       | A driver can mark themselves available or unavailable for new offers.                                                                                                           |
| FR-008 | P0       | The platform filters drivers using the approved eligibility rules.                                                                                                              |
| FR-009 | P0       | The platform ranks eligible drivers using the approved weighted, explainable factors and tie-breakers.                                                                          |
| FR-010 | P0       | The platform issues a 60-second offer to the highest-ranked driver.                                                                                                             |
| FR-011 | P0       | The driver can view sufficient request details and guaranteed payout to make an informed accept-or-decline decision.                                                            |
| FR-012 | P0       | The driver can accept or decline an active offer, and an expired offer cannot be accepted.                                                                                      |
| FR-013 | P0       | Exactly one driver can be assigned to a delivery, including during simultaneous actions or retries.                                                                             |
| FR-014 | P0       | Declined or expired offers automatically proceed to the next eligible driver.                                                                                                   |
| FR-015 | P0       | The sender receives a clear result when no eligible driver accepts.                                                                                                             |
| FR-016 | P0       | The assigned driver can update only the permitted next delivery state.                                                                                                          |
| FR-017 | P0       | Pickup requires the driver to enter the sender's valid one-time pickup code.                                                                                                    |
| FR-018 | P0       | The driver experience shares location only after pickup and before a terminal state, with explicit permission.                                                                  |
| FR-019 | P0       | The sender can view the permitted driver or parcel location during an active delivery.                                                                                          |
| FR-020 | P0       | A location older than 60 seconds is visibly marked stale with its last-update time.                                                                                             |
| FR-021 | P0       | Completion requires the driver to upload a delivery photo associated with the delivery, time, and permitted location evidence.                                                  |
| FR-022 | P0       | Sender and driver can see clear confirmation when delivery is completed.                                                                                                        |
| FR-023 | P0       | Sender and driver can cancel only under the approved lifecycle rules and see applicable charges or consequences before confirming.                                              |
| FR-024 | P0       | The platform records an auditable history of offers, decisions, assignments, state changes, cancellations, and proof.                                                           |
| FR-025 | P0       | Authorized support personnel can inspect relevant delivery history and account state without performing routine matching.                                                       |
| FR-026 | P0       | Users receive in-app plus immediate push or foreground alerts for offers, assignment, pickup, cancellation, failure, and completion; senders receive payment receipts by email. |
| FR-027 | P0       | After completion, the sender can rate the driver and submit a structured issue report within 24 hours.                                                                          |
| FR-028 | P0       | Before publication, the sender can authorize the quoted amount by card or an eligible verified bank account.                                                                    |
| FR-029 | P0       | Payment authorization is voided if the request is unfulfilled or cancelled before assignment, and payment is captured when pickup is confirmed.                                 |
| FR-030 | P0       | The platform calculates a 15% service fee on the delivery subtotal and credits 85% to the driver's pending balance.                                                             |
| FR-031 | P0       | Cleared driver balances are paid weekly to the driver's verified bank account with a payout statement.                                                                          |
| FR-032 | P0       | The product applies the approved sender-cancellation, driver-cancellation, failed-delivery, return, refund, and payout-adjustment rules.                                        |
| FR-033 | P1       | A sender can request a scheduled delivery for a future time window.                                                                                                             |
| FR-034 | P1       | Users can opt into SMS notifications.                                                                                                                                           |
| FR-035 | P0       | Core sender, driver, payment, safety, and support flows are available in French and English, subject to language review.                                                        |

## 10. Core acceptance criteria

### AC-001: Publish a request

**Given** an authenticated sender has entered all required information for a supported delivery,  
**When** the sender accepts a valid quote, authorizes payment, confirms the applicable terms, and publishes,  
**Then** the request becomes available for automated matching and the sender sees its current state.

### AC-002: Reject an unsupported request

**Given** a request is missing required information or falls outside approved service rules,  
**When** the sender attempts to publish,  
**Then** publication is prevented and each correctable problem is explained.

### AC-003: Offer to the best eligible driver

**Given** a published request has at least one eligible available driver,  
**When** matching begins,  
**Then** the platform ranks eligible drivers using the approved rules and creates one active offer for the highest-ranked driver.

### AC-004: Fall back after decline or expiry

**Given** the current driver declines or does not respond before expiry,  
**When** another eligible driver remains,  
**Then** the first offer becomes unusable and the platform creates an offer for the next-ranked driver.

### AC-005: Prevent double assignment

**Given** two acceptance actions occur for the same delivery,  
**When** the system processes them,  
**Then** no more than one driver is assigned and every other action receives a truthful non-success result.

### AC-006: Track an active delivery

**Given** a driver has confirmed pickup and granted the required location permission,  
**When** valid location updates are received,  
**Then** the sender sees a clearly timestamped location no more precise or persistent than the approved privacy policy permits.

### AC-007: Handle stale location

**Given** no valid location update has arrived within the approved freshness interval,  
**When** the sender views tracking,  
**Then** the product labels the last update as stale and does not imply that it is current.

### AC-008: Complete delivery

**Given** the delivery is in an allowed completion state,  
**When** the driver uploads an acceptable delivery photo,  
**Then** the delivery becomes delivered, the photo, time, and permitted location evidence are recorded, and both parties see completion.

### AC-009: Quote and authorize payment

**Given** a sender has entered a valid supported request,  
**When** the platform calculates the quote,  
**Then** the sender sees a 10-minute itemized quote and cannot publish until the total is successfully authorized using a supported payment method.

### AC-010: Apply service fee and driver payout

**Given** a paid delivery has been completed and its 24-hour issue window has cleared,  
**When** earnings are settled,  
**Then** the platform retains 15% of the delivery subtotal, credits 85% to the driver, excludes taxes and pass-through charges from the split, and includes the cleared amount in the next weekly payout statement.

### AC-011: Apply sender cancellation policy

**Given** a sender chooses to cancel,  
**When** the product displays and the sender confirms the cancellation,  
**Then** the product applies the correct rule for the current lifecycle state, records the reason and financial effect, and notifies affected parties.

### AC-012: Confirm pickup

**Given** an assigned driver has reached the pickup location,  
**When** the driver enters the valid one-time pickup code,  
**Then** pickup is recorded, payment capture is requested, location sharing begins, and the delivery advances to the permitted next state.

## 11. Non-functional product requirements

These requirements define user-visible quality. Exact engineering mechanisms belong in the TDD.

### 11.1 Security and authorization

- Users may view and change only resources permitted by their role and relationship to a delivery.
- Sensitive operations require authenticated, authorized requests.
- Assignment, payment, payout, state transitions, cancellations, and proof changes must be auditable.
- The application must not store raw card or bank credentials; sensitive payment data must be handled through an approved payment provider.
- Secrets and credentials must never appear in client code or logs.

### 11.2 Privacy

- A driver must understand and permit location sharing.
- Sender access to precise driver location is limited to the period after pickup and before a terminal delivery state.
- Precise route/location data is retained for 30 days and then deleted or irreversibly aggregated, subject to legal approval.
- Proof photos are retained for 90 days for support and disputes and then deleted unless a live dispute or legal hold requires longer retention.
- Proof photos should avoid recognizable people unless they consent.
- The sender must not receive unnecessary driver personal information.

### 11.3 Reliability

- Retries must not create duplicate deliveries, duplicate offers, or multiple assignments.
- Intermittent network access must not silently corrupt delivery state.
- The experience must communicate delayed, failed, or stale updates truthfully.

### 11.4 Performance — proposed pilot targets

- Under expected pilot load, 95% of ordinary application reads and writes should complete within two seconds, excluding external-provider delays.
- A newly published valid request should enter matching within five seconds.
- A valid location update should normally become visible to an authorized sender within 15 seconds.
- Location is visibly marked stale when the last valid update is more than 60 seconds old.
- Payment, assignment, pickup, and completion actions must return a truthful success, pending, or failure state; the interface must not claim success while the outcome is unknown.

### 11.5 Accessibility and compatibility

- Core sender and driver journeys must be keyboard accessible and usable with assistive technology.
- Status must not be communicated by color alone.
- The pilot experience must support the agreed modern mobile and desktop browsers.
- The driver experience must be practical on a mobile-sized screen.
- Core pilot journeys and essential transactional communications must be usable in French and English.

## 12. Success metrics

The following are proposed pilot targets, not validated forecasts. They should be reviewed after the first 50 completed or terminal delivery requests.

| Metric                            |                   Proposed pilot target | What it reveals                                                    |
| --------------------------------- | --------------------------------------: | ------------------------------------------------------------------ |
| Valid request publication rate    |                            At least 70% | Whether senders can complete request creation and accept the quote |
| Match rate within 10 minutes      |                            At least 70% | Whether sufficient driver supply exists                            |
| Median time to first offer        |                        Under 30 seconds | Whether automated matching operates promptly                       |
| Offer acceptance rate             |                            At least 30% | Whether offers and payouts are relevant to drivers                 |
| Accepted-to-pickup rate           |                            At least 90% | Whether accepted jobs become real deliveries                       |
| Accepted-delivery completion rate |                            At least 90% | Whether the marketplace produces the intended outcome              |
| Sender cancellation rate          |                               Under 10% | Whether pricing, timing, and trust meet expectations               |
| Fresh tracking coverage           | At least 95% of active delivery minutes | Whether the tracking promise is credible                           |
| Payment authorization success     |       At least 95% for eligible methods | Whether senders can pay reliably                                   |
| Weekly payout success             |        At least 99% of eligible payouts | Whether drivers receive reliable compensation                      |
| Issue-report rate                 |       Under 10% of completed deliveries | Whether the workflow is understandable and safe                    |
| Repeat sender and driver rates    |              Baseline only during pilot | Whether both sides perceive continuing value                       |

## 13. Analytics and evidence

The MVP must produce privacy-appropriate events or records sufficient to evaluate the core funnel:

```text
request_started
quote_presented
payment_authorized
request_published
matching_started
offer_created
offer_viewed
offer_accepted
offer_declined
offer_expired
driver_assigned
pickup_confirmed
payment_captured
tracking_started
tracking_became_stale
delivery_completed
delivery_cancelled
delivery_unfulfilled
issue_reported
driver_earnings_cleared
driver_payout_sent
payment_refunded
```

Event names are conceptual. The TDD will define schemas, identifiers, storage, and data-protection controls.

## 14. Pilot and rollout

**Proposed:** The MVP launches as a controlled Montreal pilot with:

- Pickup and destination both inside the City of Montreal
- Immediate deliveries only
- Operating and support hours of 07:00–23:00 Montreal local time
- A small verified driver cohort with registered vehicles whose verified capacity matches each offered parcel
- One parcel per delivery, no more than 25 kg or 100 cm × 70 cm × 60 cm
- Only the approved pilot parcel categories
- Card and eligible verified-bank payment, a configurable distance/size/weight rate card, and a 15% platform service fee
- Weekly driver payout by bank transfer
- Defined incident escalation, cancellation, return, and failed-delivery handling
- Monitoring of every core funnel stage
- A documented pause or rollback procedure

The pilot expands only after the product owner reviews safety, completion, reliability, and marketplace metrics.

## 15. Key risks

| Risk                              | Product consequence                        | Proposed mitigation direction                                                                                |
| --------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Insufficient drivers              | Requests remain unfulfilled                | Limit geography and operating window; recruit pilot supply first                                             |
| Poor matching                     | Drivers reject offers or arrive unsuitable | Strict eligibility before ranking; collect reason codes                                                      |
| Cold-start rating bias            | New qualified drivers never receive work   | Add a bounded fairness factor and do not rely on rating alone                                                |
| Double assignment                 | Severe trust and operational failure       | Atomic assignment and idempotent actions in technical design                                                 |
| Driver or sender fraud            | Safety, financial, and reputation harm     | Verification, audit history, controlled pilot, incident process                                              |
| Location privacy misuse           | User harm and regulatory exposure          | Narrow sharing window, explicit permission, retention limits                                                 |
| Stale tracking                    | False confidence and support burden        | Freshness timestamps and truthful degraded state                                                             |
| Damage, loss, or failed delivery  | Disputes and liability                     | Define proof, prohibited items, responsibility, and claims policy before launch                              |
| Payment chargeback or bank return | Loss and delayed driver payout             | Authorize before publication, restrict bank payment when necessary, and maintain reserves and reconciliation |
| Unproven economics                | Marketplace cannot sustain service         | Pilot configurable rate card and measure contribution after 15% fee and provider costs                       |
| Oversized or misdeclared parcel   | Unsafe or impossible pickup                | Enforce limits, require sender declaration, show driver details, and allow documented safety refusal         |

## 16. Dependencies

The product may depend on:

- Identity and account verification
- Address validation and mapping
- Location permission and background location behavior
- Notification delivery
- Card authorization, verified bank payment, refunds, reconciliation, and connected driver payouts
- Secure evidence storage for proof of delivery
- Customer support and incident-handling procedures
- Legal, insurance, tax, and local delivery regulations

No vendor is selected in this PRD.

## 17. Decision register and remaining validations

### 17.1 Product decisions adopted in this draft

| Topic               | Decision                                                                                       |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| Pilot geography     | City of Montreal; pickup and destination must both be inside the boundary                      |
| Delivery timing     | Immediate delivery in MVP; scheduled delivery is P1                                            |
| Parcel              | One supported parcel; proposed maximum 25 kg and 100 cm × 70 cm × 60 cm                        |
| Pricing             | Configurable base charge plus road distance, size tier, and weight tier; no surge pricing      |
| Sender payment      | Card or eligible verified bank account; authorization before publication and capture at pickup |
| Driver compensation | 85% of delivery subtotal, cleared after a 24-hour issue window, paid weekly by bank transfer   |
| Platform revenue    | 15% service fee on delivery subtotal, excluding tax, tips, and pass-through charges            |
| Driver membership   | Approved account membership; no recurring driver subscription charge in MVP                    |
| Matching            | Eligibility gate followed by explainable weighted ranking and sequential 60-second offers      |
| Pickup proof        | One-time code supplied by sender                                                               |
| Delivery proof      | Required uploaded photo with time and permitted location evidence                              |
| Tracking            | Precise sender-visible tracking after pickup until terminal state; stale after 60 seconds      |
| Cancellation        | Free before assignment; bounded charge after assignment; support flow after pickup             |
| Notifications       | In-app plus immediate alert for operational events; email receipts; SMS P1                     |
| Support window      | Proposed 07:00–23:00 Montreal local time daily                                                 |

### 17.2 External validations required before implementation approval

These are not missing product ideas; they are specialist approval gates:

1. Approve the numeric Montreal rate card, tax treatment, toll policy, and minimum economically viable price.
2. Confirm that the selected payment provider supports card authorization, eligible bank-account payment, refunds, connected-driver onboarding, and weekly Canadian bank payouts.
3. Obtain legal review of marketplace terms, cancellation charges, prohibited items, privacy consent, location and photo retention, background screening, and applicable consumer and language obligations.
4. Obtain insurance advice defining required driver coverage and responsibility for loss, theft, damage, delay, injury, and return delivery.
5. Confirm operational staffing for the proposed support window and define emergency, incident, claim, and account-suspension procedures.
6. Validate the proposed parcel limits with representative mid-size SUVs and a safe one-person handling assessment.
7. Approve exact Montreal boundary data and any initially excluded boroughs or restricted pickup zones.

## 18. MVP release criteria

The MVP is ready for a controlled pilot only when:

- Every P0 requirement is implemented or an explicit product exception is approved.
- Core acceptance criteria pass in an integrated environment.
- Sender and driver core journeys have passed usability review.
- Role and resource authorization have been verified.
- Double assignment and retry behavior have been tested.
- Location consent, visibility, staleness, and retention behavior match the approved privacy rules.
- Cancellation, unfulfilled, and failed-delivery behavior is defined and tested.
- Pilot pricing or payment terms are explicit.
- The numeric rate card, taxes, and payment-provider integration have financial approval.
- Driver verification and parcel restrictions are operational.
- Driver payout reconciliation and failure recovery have been tested.
- Audit history and essential funnel metrics are observable.
- Support, incident escalation, pause, and rollback procedures are documented.
- Required legal, privacy, insurance, tax, and operational reviews are recorded.
- The product owner and technical owner approve the pilot release.

## 19. Traceability to the next documents

### UX flows must define

- Sender request creation and publication
- Quote, payment authorization, payment failure, and payment receipt
- Driver onboarding, profile, availability, and offer decision
- Automated matching wait and fallback states
- Pickup confirmation
- Active delivery and location visibility
- Delivery completion and proof
- Rating and 24-hour issue reporting
- Cancellation, refund, unfulfilled, stale tracking, failed delivery, return, and redelivery
- Support or issue reporting

### The TDD must define

- System boundaries and component responsibilities
- Data model and delivery state machine
- Matching and ranking implementation
- Offer expiry and concurrency control
- Assignment atomicity and idempotency
- APIs or event contracts
- Authentication and authorization model
- Location ingestion, freshness, access, and retention
- Proof-of-delivery storage and access
- Pricing engine, quote expiry, payment authorization/capture/refund, fee calculation, driver ledger, reconciliation, and weekly payout
- Notifications and support tooling
- Audit history and product analytics
- Failure recovery, observability, rollout, and rollback
- Verification strategy for every P0 requirement

## 20. Approval record

| Role                        | Name                   | Decision                                                     | Date       |
| --------------------------- | ---------------------- | ------------------------------------------------------------ | ---------- |
| Product owner               | Founder / product lead | Approved as input for Phase 0 and provider-free Phase 1 only | 2026-10-28 |
| Product design              | TBD                    | Pending                                                      | —          |
| Technical owner             | Jed Bonheur            | Assigned; technical acceptance pending                       | —          |
| Security / privacy reviewer | TBD                    | Pending                                                      | —          |
| Operations / risk reviewer  | TBD                    | Pending                                                      | —          |
