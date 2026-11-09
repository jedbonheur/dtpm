# Worker brief: P00-WP03

| Field          | Value                                                                             |
| -------------- | --------------------------------------------------------------------------------- |
| Packet         | P00-WP03 — Local Postgres/PostGIS, Redis, migration tooling                       |
| Role           | Verifier                                                                          |
| Agent id       | cursor-verifier-p00-wp03                                                          |
| Assigned by    | Master                                                                            |
| Date           | 2026-11-09                                                                        |
| Packet path    | master-work-vault/phases/P00-repository-foundation/P00-WP03-local-dependencies.md |
| Draft evidence | master-work-vault/evidence/P00-WP03-draft.md                                      |
| Evidence path  | master-work-vault/evidence/P00-WP03.md                                            |

## Prompt

```text
You are the Verifier for P00-WP03 (Local Postgres/PostGIS, Redis, migration tooling).

Your agent id is cursor-verifier-p00-wp03. You must differ from the Implementer
(cursor-implementer). Do not implement fixes.

Read:
- master-work-vault/RULES.md (Verifier role only)
- master-work-vault/phases/P00-repository-foundation/P00-WP03-local-dependencies.md
- master-work-vault/evidence/P00-WP03-draft.md
- master-work-vault/templates/evidence-record.md

Repo root (G-00 authorized path): /home/dtpm
Branch with uncommitted Implementer work: p00-wp03-local-dependencies
(Use the working tree as-is; do not commit, push, or change product/infra code.)

Rules:
- Work only this packet.
- Do not change master-work-vault/RULES.md or LEDGER.md (master owns those).
- Do not edit apps/, packages/, infra/, root scripts, .env.example, or product docs
  to “make it pass.”
- Re-run the verifier commands yourself; record observed output, not the draft’s claims.
- Write the completed evidence file at master-work-vault/evidence/P00-WP03.md
  (Verdict: pass | fail). Leave the draft file as-is.
- Map each acceptance check to observed evidence (packet Implementer + Verifier DoD).
- Confirm forbidden scope did not land (product/delivery schema beyond smoke,
  managed cloud DBs, Redis as assignment/financial truth, secrets, prior DTP copy,
  TDD §35 ORM locked as final, CI/WP04–WP06 scope, ledger marked done).
- Do not mark the ledger done.

Commands to re-run (minimum — from packet Verifier DoD):
  cd /home/dtpm
  # Prefer empty DB: tear down with volume remove, then bring up
  pnpm deps:down
  docker compose -f infra/local/compose.yaml down -v
  pnpm deps:up
  # wait until both services healthy
  docker compose -f infra/local/compose.yaml ps
  pnpm db:migrate
  docker compose -f infra/local/compose.yaml exec -T postgres \
    psql -U dtpm -d dtpm -c "SELECT PostGIS_version();"
  docker compose -f infra/local/compose.yaml exec -T redis redis-cli ping
  # confirm .env.example has no secrets (local defaults only; fake providers)
  # confirm CONTRIBUTING.md / infra/local/README.md document up/down + migrate
  pnpm format
  pnpm lint
  pnpm typecheck
  pnpm test
  # tear down or leave as documented
  pnpm deps:down

When finished, report: verdict, evidence file path, commands run with observed
results, acceptance mapping, forbidden-scope findings, and anything blocked.
```
