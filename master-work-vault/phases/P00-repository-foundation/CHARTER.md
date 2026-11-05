# P00 — Repository and quality foundation

| Field     | Value                                                                           |
| --------- | ------------------------------------------------------------------------------- |
| Phase     | 0                                                                               |
| Status    | blocked on G-00                                                                 |
| Citations | TDD §9, §30, §32 Phase 0, §36.2                                                 |
| Approval  | Product owner approved Phase 0 scope (TDD §36.1). Technical activation is G-00. |

## Outcome

Fresh monorepo with empty application skeletons, quality tooling, local dependencies, typed configuration, baseline observability, test factories, CI/secret scanning, and one passing example at each of unit, database integration, and E2E.

## Exit (TDD §32)

All empty applications build; one example unit, integration, and E2E check passes; no credentials or production integrations exist.

## Packets

| ID       | Title                                                       |
| -------- | ----------------------------------------------------------- |
| P00-WP01 | Fresh monorepo skeleton                                     |
| P00-WP02 | Format, lint, typecheck, unit test runner                   |
| P00-WP03 | Local Postgres/PostGIS, Redis, migration tooling            |
| P00-WP04 | Typed config, error envelope, observability, test factories |
| P00-WP05 | CI foundation and secret scanning                           |
| P00-WP06 | Example unit, integration, and E2E (Phase 0 exit)           |

## Forbidden for the whole phase

Product behavior, real providers, secrets, copying prior DTP code, production infrastructure selection (TDD §35 remains open).
