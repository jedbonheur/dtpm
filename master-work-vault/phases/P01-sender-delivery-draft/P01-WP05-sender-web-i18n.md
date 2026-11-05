# P01-WP05: Sender web draft UI, reload, French and English

| Field | Value |
|---|---|
| ID | P01-WP05 |
| Phase | 1 |
| Status | blocked |
| Depends on | P01-WP02, P01-WP03 |
| Ledger | [LEDGER.md](../../LEDGER.md) |
| Evidence | none |
| Citations | TDD §5 TD-003, §25.2, §32 Phase 1, §36.1; UX sender draft (UF as approved in G-01) |

## Goal

Sender web lets an authenticated sender create and retrieve a valid draft; the draft survives reload; UI strings appear in French and English via i18n keys (no hard-coded user-facing strings).

## Why this packet exists

TDD §36.1 UI + locale outcome. TDD §4 bilingual product.

## Allowed files / packages

- `apps/sender-web`
- `packages/i18n` keys for Phase 1 screens
- Web integration tests for FR/EN

## Forbidden files / behaviors

- Hard-coded user-facing strings
- Driver mobile product UI
- Payment/publish screens

## Dependencies

API create/get + validation exist. G-01 product-design screen approval or bounded exception must be linked.

## Interfaces this packet must not invent

Use contracts from `packages/contracts`. Locale preference persistence per TDD §25.2 if a preference exists; otherwise document request-level locale for this slice.

## Implementer definition of done

- [ ] Create + retrieve in UI
- [ ] Reload shows the draft
- [ ] FR and EN keys, no hard-coded copy
- [ ] Draft evidence

## Verifier definition of done

```text
{web integration or focused UI tests FR and EN}
{reload persistence}
```

Map: TDD §36.1 “through the UI”, “survives reload”, “French and English.”

## Worker brief

```text
You are the Implementer for P01-WP05.
Read RULES.md (Implementer) and this packet.
Build sender-web draft create/retrieve with reload and FR/EN i18n keys.
No payments. Do not mark ledger done.
```
