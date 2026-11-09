# Evidence: P00-WP05 (DRAFT — Implementer)

| Field       | Value                                       |
| ----------- | ------------------------------------------- |
| Packet      | P00-WP05                                    |
| Implementer | cursor-implementer (this session)           |
| Verifier    | {must differ from Implementer — not filled} |
| Date        | 2026-11-09                                  |
| Verdict     | pending Verifier                            |

## Commands run (Implementer observations — Verifier must re-run)

| Command                                                                 | Where        | Observed result                                                                                           |
| ----------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------- |
| `pnpm check:repo`                                                       | `/home/dtpm` | **pass** — `AGENTS.md`, `CONTRIBUTING.md`, and `packageManager` OK                                        |
| `pnpm format`                                                           | `/home/dtpm` | **pass** — Prettier check clean                                                                           |
| `pnpm lint`                                                             | `/home/dtpm` | **pass** — eslint exit 0 (includes `scripts/` Node globals)                                               |
| `pnpm typecheck`                                                        | `/home/dtpm` | **pass** — recursive typecheck across workspace                                                           |
| `pnpm test`                                                             | `/home/dtpm` | **pass** — 3 files / 15 tests                                                                             |
| `gitleaks detect --source . --verbose --redact` (v8.21.2, local binary) | `/home/dtpm` | **pass** — `5 commits scanned`; `no leaks found`                                                          |
| Inspect `.github/workflows/ci.yml`                                      | `/home/dtpm` | quality job: `build`, `check:repo`, `format`, `lint`, `typecheck`, `test`; secret-scan: gitleaks 8.21.2   |
| Read `CONTRIBUTING.md` CI section                                       | `/home/dtpm` | documents in-CI vs deferred TDD §30.2 layers; same local command set                                      |
| Clean-tree repro (`rm -rf */dist` then typecheck)                       | `/home/dtpm` | **fail** without build (TS2307 on `@dtpm/config` / `@dtpm/observability`); **pass** after `pnpm build`   |

GitHub Actions: first quality run failed without `pnpm build` (missing `dist/` exports). Workflow updated to match CONTRIBUTING setup. Verifier / Master should attach a green observed run before ledger `done`.

## Acceptance mapping

| Check                                            | Evidence                                                                                  | Observed (Implementer)       |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------- | ---------------------------- |
| CI invokes format, lint, typecheck               | `.github/workflows/ci.yml` quality job steps `pnpm format` / `lint` / `typecheck`         | pass (Verifier must inspect) |
| Secret scanning enabled                          | `secret-scan` job installs gitleaks `8.21.2` and runs `gitleaks detect`; local scan clean | pass (Verifier must re-run)  |
| Documented which §30.2 steps are not yet in CI   | `CONTRIBUTING.md` § CI (P00-WP05) table                                                   | pass (Verifier must inspect) |
| Draft evidence record                            | this file                                                                                 | present                      |
| Same command set as local (no second set)        | CI calls `pnpm build` / `check:repo` / `format` / `lint` / `typecheck` / `test`           | pass (Verifier must inspect) |
| Instruction / generated-file stub (§30.2 item 1) | `scripts/check-repo-instructions.mjs` + `pnpm check:repo`                                 | pass (Verifier must re-run)  |
| No production deploy / live vendor CI secrets    | workflow has no deploy jobs; gitleaks via public release binary                           | pass (Verifier must inspect) |

## Forbidden-scope scan (Implementer self-check)

| Risk                                                    | Observed                                                                 |
| ------------------------------------------------------- | ------------------------------------------------------------------------ |
| Production deploy jobs / paid infra                     | none                                                                     |
| Live vendor CI secrets / production credentials         | none                                                                     |
| Claiming full §30.2 matrix complete                     | none — deferred rows documented in CONTRIBUTING                          |
| Product domain / apps/packages behavior beyond CI needs | none — only eslint globals for `scripts/**` so instruction stub can lint |
| Prior DTP copy                                          | none                                                                     |
| LEDGER / RULES edited                                   | no — Implementer did not edit `LEDGER.md` or `RULES.md`                  |

## Paths added/changed

- `.github/workflows/ci.yml`
- `scripts/check-repo-instructions.mjs`
- `package.json` (`check:repo` script)
- `CONTRIBUTING.md` (CI section)
- `eslint.config.mjs` (Node globals for `scripts/**` only)
- `master-work-vault/evidence/P00-WP05-draft.md` (this file)

## Verifier notes

Suggested Verifier commands:

```text
cd /home/dtpm
pnpm check:repo
pnpm format
pnpm lint
pnpm typecheck
pnpm test
# secret scan (same version as CI):
gitleaks detect --source . --verbose --redact
# Inspect .github/workflows/ci.yml against CONTRIBUTING.md
# Prefer attaching an observed GitHub Actions run log for quality + secret-scan jobs
```

## Verdict rationale

Implementer DoD claimed complete locally. Ledger `done` requires a different Verifier, mapped observed evidence, and preferably an observed CI pipeline run (or Master/human exception per packet).
