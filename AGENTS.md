# Agent instructions — dtpm

Montreal Immediate Delivery Marketplace. Repository path authorized by G-00: `/home/dtpm`.

## Phase 0 activation (G-00)

**Technical owner acceptance (2026-11-05, @jed_bonheur):**  
Jed Bonheur accepts for Phase 0: TypeScript monorepo at `/home/dtpm`; modular monolith per TDD §6/§9; quality baseline (format/lint/typecheck/tests) as Phase 0 process; TDD §35 vendors remain pending approval. No prior DTP code/architecture/migrations/config will be copied.

**Fresh initialization:** Authorized. Do not copy prior DTP code, architecture, migrations, or configuration.

## Branch and change-review policy (G-00)

Feature branches such as `p00-wp01-monorepo-skeleton`. Merge to `main` only via pull request with at least one approving review. No direct commits or force-pushes to `main`. Packet Implementer and Verifier must be different agents.

## Repository shape (TDD §9)

Empty apps and packages only until later packets add behavior. Do not invent extra apps or a microservice split.

## Tooling note

`pnpm` workspaces and TypeScript are the Phase 0 baseline for installable skeletons. Specific framework/vendor choices under TDD §35 remain pending approval — do not treat them as final.

## Constraints (TDD §36.4)

No real payments, real identity documents, live matching, live location, production hosting, public signup, or real customer data. Fake providers / local-test identity only until separately gated.
