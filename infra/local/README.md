# Local dependencies (Phase 0)

Containerized PostgreSQL with PostGIS and Redis for local development (TDD §30.1 Local). Not production hosting. No paid cloud or managed databases.

## Prerequisites

- Docker Engine with Compose v2 (`docker compose`)

## Up

From the repository root (`/home/dtpm`):

```bash
pnpm deps:up
# equivalent: docker compose -f infra/local/compose.yaml up -d
```

Wait until healthchecks pass (`docker compose -f infra/local/compose.yaml ps`).

## Connection defaults (non-secret)

Match [`.env.example`](../../.env.example):

| Service  | URL                                        |
| -------- | ------------------------------------------ |
| Postgres | `postgres://dtpm:dtpm@localhost:5432/dtpm` |
| Redis    | `redis://localhost:6379`                   |

## Smoke checks

```bash
# PostGIS available
docker compose -f infra/local/compose.yaml exec postgres \
  psql -U dtpm -d dtpm -c "SELECT PostGIS_version();"

# Redis ping
docker compose -f infra/local/compose.yaml exec redis redis-cli ping
```

## Migrations

With Postgres up:

```bash
pnpm db:migrate
```

## Down

```bash
pnpm deps:down
# equivalent: docker compose -f infra/local/compose.yaml down
```

To remove the Postgres volume as well:

```bash
docker compose -f infra/local/compose.yaml down -v
```

## Notes

- Redis is for queues/ephemera only — not business source of truth (TDD TD-007, §34.4).
- Images and ports are Phase 0 local baseline; TDD §35 cloud vendors remain pending approval.
