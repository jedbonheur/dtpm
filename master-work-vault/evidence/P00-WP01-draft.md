# Evidence: P00-WP01 (DRAFT — Implementer)

| Field | Value |
|---|---|
| Packet | P00-WP01 |
| Implementer | cursor-implementer (this session) |
| Verifier | {must differ from Implementer — not filled} |
| Date | 2026-11-05 |
| Verdict | pending Verifier |

## Commands run (Implementer observations — Verifier must re-run)

| Command | Where | Observed result |
|---|---|---|
| `ls apps && ls packages` | `/home/dtpm` | apps: admin-web, api, driver-mobile, sender-web, worker; packages: application, auth, config, contracts, domain, i18n, observability, persistence, providers, testing |
| `corepack enable && pnpm install` | `/home/dtpm` | pass — 16 workspace projects; typescript + @types/node installed |
| `pnpm build` | `/home/dtpm` | pass — all 15 package/app builds via `tsc` |
| `pnpm start:api` | `/home/dtpm` | pass — prints health placeholder JSON `{ ok: true, service: "api", mode: "skeleton" }` |
| `pnpm start:worker` | `/home/dtpm` | pass — `dtpm worker stub` |
| `pnpm start:sender-web` | `/home/dtpm` | pass — `dtpm sender-web stub` |
| `grep` / read `AGENTS.md` + `CONTRIBUTING.md` | `/home/dtpm` | contain G-00 path `/home/dtpm`, technical owner acceptance, feature-branch + PR review policy (merge to `main` via PR, one approving review, no direct/force push to `main`, Implementer ≠ Verifier) |

## Acceptance mapping

| Check | Evidence | Observed (Implementer) |
|---|---|---|
| Workspace installs from this repo path | `pnpm install` | pass (Verifier must re-run) |
| All listed apps and packages exist as empty skeletons | `ls apps` / `ls packages` vs TDD §9 | pass (Verifier must re-run) |
| Repository instructions include branch and change-review policy from G-00 | `AGENTS.md`, `CONTRIBUTING.md` | pass (Verifier must re-run) |
| No product behavior | stub `src/index.ts` only; api health placeholder only | pass (Verifier must re-run) |
| Draft evidence record | this file | present |

## Forbidden-scope scan (Implementer self-check)

| Risk | Observed |
|---|---|
| Product files outside the packet allow-list | none observed; `docs/product` and `docs/technical` untouched |
| Secrets or live provider credentials | none; only `.env.example` with `DTPM_PROVIDERS_MODE=fake` |
| Prior DTP copy | none; fresh stubs only under `apps/` / `packages/` |
| Real payments, identity docs, location, production data | none |
| Live hosting under `infra/` | placeholder `infra/README.md` only |
| TDD §35 vendors locked as final | no; AGENTS.md notes pnpm/TS are Phase 0 baseline pending §35 |

## Verifier notes

Suggested Verifier commands (from packet):

```text
cd /home/dtpm
pnpm install
pnpm build
ls apps
ls packages
# confirm lists match TDD §9
# confirm AGENTS.md / CONTRIBUTING.md contain branch + review policy from G-00
# confirm no copied DTP history / no secrets
```

Do not treat this draft as a pass. Verifier must re-run commands and set Verdict.

## Verdict rationale

Not set. Implementer must not verify own packet.
