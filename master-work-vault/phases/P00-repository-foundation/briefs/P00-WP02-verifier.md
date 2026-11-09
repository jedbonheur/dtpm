# Worker brief: P00-WP02

| Field          | Value                                                                          |
| -------------- | ------------------------------------------------------------------------------ |
| Packet         | P00-WP02 — Format, lint, typecheck, unit tests                                 |
| Role           | Verifier                                                                       |
| Agent id       | cursor-verifier-p00-wp02                                                       |
| Assigned by    | Master                                                                         |
| Date           | 2026-11-05                                                                     |
| Packet path    | master-work-vault/phases/P00-repository-foundation/P00-WP02-quality-tooling.md |
| Draft evidence | master-work-vault/evidence/P00-WP02-draft.md                                   |
| Evidence path  | master-work-vault/evidence/P00-WP02.md                                         |

## Prompt

```text
You are the Verifier for P00-WP02 (Format, lint, typecheck, unit tests).

Your agent id is cursor-verifier-p00-wp02. You must differ from the Implementer
(cursor-implementer). Do not implement fixes.

Read:
- master-work-vault/RULES.md (Verifier role only)
- master-work-vault/phases/P00-repository-foundation/P00-WP02-quality-tooling.md
- master-work-vault/evidence/P00-WP02-draft.md
- master-work-vault/templates/evidence-record.md

Repo root (G-00 authorized path): /home/dtpm

Rules:
- Work only this packet.
- Do not change master-work-vault/RULES.md or LEDGER.md (master owns those).
- Do not edit apps/, packages/, infra/, CI, or product docs to “make it pass.”
- Re-run the verifier commands yourself; record observed output, not the draft’s claims.
- Write the completed evidence file at master-work-vault/evidence/P00-WP02.md
  (Verdict: pass | fail). Leave the draft file as-is.
- Map each acceptance check to observed evidence (TDD §30.2 steps 2–4 locally).
- Confirm forbidden scope did not land (product domain tests, DB/E2E stacks,
  CI/secrets, prior DTP copy, §35 vendors locked as final).
- Do not mark the ledger done.

Commands to re-run (minimum — from packet Verifier DoD):
  cd /home/dtpm
  pnpm format
  pnpm lint
  pnpm typecheck
  pnpm test
Also confirm:
  # CONTRIBUTING.md / AGENTS.md document the four commands
  # typecheck ran on every app and package (none skipped)
  # no product *.test.ts / *.spec.ts; no .github CI added by this packet

When finished, report: verdict, evidence file path, commands run with observed
results, acceptance mapping, forbidden-scope findings, and anything blocked.
```
