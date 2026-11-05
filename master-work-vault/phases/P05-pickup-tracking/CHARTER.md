# P05 — Pickup and live tracking

| Field | Value |
|---|---|
| Phase | 5 |
| Status | blocked |
| Citations | TDD §17.2, §19, §32 Phase 5; PRD AC-006, AC-007, AC-012 |
| Blocker | TDD §36: not approved; §36.4 forbids location until gated |

## Outcome

AC-006, AC-007, AC-012 pass on supported real devices plus integration environments — only after a separate location/privacy gate.

## Packets

| ID | Title |
|---|---|
| P05-WP01 | Pickup code confirmation |
| P05-WP02 | Payment capture saga after pickup |
| P05-WP03 | Background location permissions (native app) |
| P05-WP04 | Batched location ingest and validation |
| P05-WP05 | Authorized WebSocket fan-out |
| P05-WP06 | Stale/unavailable states and 30-day retention job |
| P05-WP07 | Verify AC-006, AC-007, AC-012 |
