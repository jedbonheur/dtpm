# G-00: Phase 0 activation

| Field | Value |
|---|---|
| ID | G-00 |
| Phase | Gate — before P00 coding |
| Status | ready |
| Depends on | none |
| Ledger | [LEDGER.md](../LEDGER.md) |
| Evidence | none |
| Citations | TDD §32 Phase 0, TDD §36.2, TDD §9, TDD §30.2 |

## Goal

Record everything TDD §36.2 requires so Phase 0 scaffolding may begin. No application code is written in this packet.

## Why this packet exists

TDD §36.2: Phase 0 implementation may begin only after a technical owner accepts the proposed shape, the exact repository path is recorded, fresh initialization is authorized, and branch/change-review policy is recorded in the new repository instructions.

Current known gaps (2026-10-28):

- Approved repository name is `dtpm`; **absolute filesystem path is not yet selected** (TDD §36.2).
- Technical owner Jed Bonheur is assigned; **Phase 0/1 technical acceptance is pending** (TDD §39).
- Phase 0 branch and change-review policy is **not yet recorded** in repository instructions (repository instructions do not exist until P00).

## Allowed files / packages

- `master-work-vault/gates/G-00-phase0-activation.md` (checklist updates)
- `master-work-vault/LEDGER.md` (master updates status after human evidence)
- After humans decide: a short note in this file’s Evidence section, not product code

Humans may also create later `docs/` or root instruction files in **P00-WP01**; G-00 only records the *decisions* those files must contain.

## Forbidden files / behaviors

- Any `apps/`, `packages/`, `infra/`, CI workflow, or lockfile
- Copying prior DTP code
- Declaring Phase 0 coding `ready` before every checklist item below is recorded

## Dependencies

None. This is the first assignable row.

## Interfaces this packet must not invent

Do not choose TDD §35 frameworks here. G-00 accepts the TDD-proposed monorepo, modular boundaries, quality baseline, and the *process* for later technology selection — not specific library versions.

## Implementer definition of done

This packet is primarily **human**. Master records; Master does not impersonate the technical owner.

- [ ] Technical owner is named and accepts: TypeScript monorepo, modular monolith, TDD §9 shape, quality baseline, and initial technology-selection process (TDD §36.2)
- [ ] Exact new repository absolute path is recorded and fresh initialization is authorized
- [ ] Confirmation: no prior DTP code/architecture/migrations/configuration will be copied
- [ ] Phase 0 branch name and change-review policy text is agreed so P00-WP01 can write it into repository instructions
- [ ] Product-owner Phase 0/1 scope approval is already on record (TDD §36.1 / §39 — 2026-10-28); do not re-litigate

## Verifier definition of done

Commands to run: none that compile code. Verifier is the master or a human checking the written record.

```text
# Confirm this file contains recorded values, not TODOs, for:
# - technical owner acceptance (name, date, statement)
# - absolute repo path
# - fresh-init authorization
# - branch + review policy text
```

Map results to TDD §36.2 bullets. Fail if any value is still “pending” or “TBD.”

## Constraints

- Human gates stay human
- Path may be this workspace once authorized; do not assume it without a recorded decision

## Recorded decisions

| Item | Value | Date | Who |
|---|---|---|---|
| Repository name | `dtpm` | 2026-10-28 | TDD §36.2 |
| Absolute path | pending | — | — |
| Fresh init authorized | pending | — | — |
| Technical owner acceptance | pending (Jed Bonheur assigned) | — | — |
| Default branch / review policy | pending | — | — |

## Worker brief

```text
You are recording G-00 (Phase 0 activation), not writing product code.
Read master-work-vault/RULES.md and master-work-vault/gates/G-00-phase0-activation.md.
Obtain and write the missing TDD §36.2 values into the Recorded decisions table.
Do not scaffold apps/packages.
Do not mark P00 packets done or ready except by asking the master to update LEDGER.md after this gate is complete.
Forbidden: any product implementation.
```
