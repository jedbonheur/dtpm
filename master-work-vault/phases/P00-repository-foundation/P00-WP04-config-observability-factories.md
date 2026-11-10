# P00-WP04: Typed config, error envelope, observability, test factories

| Field      | Value                                                                |
| ---------- | -------------------------------------------------------------------- |
| ID         | P00-WP04                                                             |
| Phase      | 0                                                                    |
| Status     | done                                                                 |
| Depends on | P00-WP01, P00-WP02                                                   |
| Ledger     | [LEDGER.md](../../LEDGER.md)                                         |
| Evidence   | [evidence/P00-WP04.md](../../evidence/P00-WP04.md)                   |
| Citations  | TDD §21.4, §26.1, §32 Phase 0, packages config/observability/testing |

## Goal

Typed environment configuration, a shared API error envelope, baseline structured logging/metrics/trace helpers, and test factories/fakes packages exist and are used by a trivial example (full example tests in P00-WP06).

## Why this packet exists

TDD §32 Phase 0: establish typed configuration, error envelopes, observability, and test factories. TDD §21.4 requires a consistent error shape.

## Allowed files / packages

- `packages/config`
- `packages/observability`
- `packages/testing`
- Minimal wiring in `apps/api` to load config and return the error envelope on a health or example error route if needed for WP06
- Shared types for correlation ids

## Forbidden files / behaviors

- Product analytics as source of truth (TDD §10 Audit vs Analytics)
- Shipping real APM vendor accounts
- Domain entities for deliveries/payments

## Dependencies

P00-WP01 and P00-WP02 done so packages typecheck and unit-test.

## Interfaces this packet must not invent

Error envelope must be one shared shape for later API contract tests. Do not create per-app error formats.

## Implementer definition of done

- [ ] Config fails fast on missing required local env
- [ ] Error envelope documented and typed
- [ ] Observability helpers export structured logs with correlation
- [ ] Test factory package exists for later phases
- [ ] Draft evidence

## Verifier definition of done

```text
{unit tests for config parse / error envelope}
{typecheck}
```

No production telemetry credentials.

## Constraints

Local/test only.

## Worker brief

```text
You are the Implementer for P00-WP04.
Read RULES.md (Implementer) and this packet.
Implement typed config, shared error envelope, observability helpers, and test factories.
No delivery/payment domain. Do not mark ledger done.
```
