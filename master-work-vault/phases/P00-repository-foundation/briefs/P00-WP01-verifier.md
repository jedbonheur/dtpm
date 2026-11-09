# Worker brief: P00-WP01

| Field          | Value                                                                            |
| -------------- | -------------------------------------------------------------------------------- |
| Packet         | P00-WP01 — Fresh monorepo skeleton                                               |
| Role           | Verifier                                                                         |
| Agent id       | cursor-verifier-p00-wp01                                                         |
| Assigned by    | Master                                                                           |
| Date           | 2026-11-05                                                                       |
| Packet path    | master-work-vault/phases/P00-repository-foundation/P00-WP01-monorepo-skeleton.md |
| Draft evidence | master-work-vault/evidence/P00-WP01-draft.md                                     |
| Evidence path  | master-work-vault/evidence/P00-WP01.md                                           |

## Prompt

```text
You are the Verifier for P00-WP01 (Fresh monorepo skeleton).

Your agent id is cursor-verifier-p00-wp01. You must differ from the Implementer
(cursor-implementer). Do not implement fixes.

Read:
- master-work-vault/RULES.md (Verifier role only)
- master-work-vault/phases/P00-repository-foundation/P00-WP01-monorepo-skeleton.md
- master-work-vault/evidence/P00-WP01-draft.md
- master-work-vault/templates/evidence-record.md
- TDD §9 apps/packages list (docs/technical/TDD.md) for the skeleton checklist

Repo root (G-00 authorized path): /home/dtpm

Rules:
- Work only this packet.
- Do not change master-work-vault/RULES.md or LEDGER.md (master owns those).
- Do not edit apps/, packages/, infra/, CI, or product docs to “make it pass.”
- Re-run the verifier commands yourself; record observed output, not the draft’s claims.
- Write the completed evidence file at master-work-vault/evidence/P00-WP01.md
  (Verdict: pass | fail). Leave the draft file as-is.
- Map each acceptance check to observed evidence.
- Confirm forbidden scope did not land (product behavior, secrets, prior DTP copy,
  live hosting, §35 vendors locked as final).
- Do not mark the ledger done.

Commands to re-run (minimum):
  cd /home/dtpm
  pnpm install
  pnpm build
  ls apps
  ls packages
  # confirm lists match TDD §9
  # confirm AGENTS.md / CONTRIBUTING.md contain G-00 branch + review policy
  # confirm no copied DTP history / no secrets
Also re-check stub starts if useful for “no product behavior”:
  pnpm start:api
  pnpm start:worker
  pnpm start:sender-web

When finished, report: verdict, evidence file path, commands run with observed
results, acceptance mapping, forbidden-scope findings, and anything blocked.
```
