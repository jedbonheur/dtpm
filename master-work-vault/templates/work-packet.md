# {PACKET_ID}: {title}

| Field      | Value                                                                              |
| ---------- | ---------------------------------------------------------------------------------- |
| ID         | {PACKET_ID}                                                                        |
| Phase      | {P00–P08 or gate}                                                                  |
| Status     | blocked \| ready \| assigned \| in_progress \| verify \| changes_requested \| done |
| Depends on | {IDs that must be done}                                                            |
| Ledger     | [LEDGER.md](../../LEDGER.md)                                                       |
| Evidence   | {path or none}                                                                     |

## Goal

One sentence: the observable outcome of this packet.

## Why this packet exists

Cite TDD/PRD/UX sections. Do not paste those documents.

## Allowed files / packages

List paths the Implementer may create or edit.

## Forbidden files / behaviors

List paths and product behaviors that are out of scope, including TDD §36.4 exclusions when relevant.

## Dependencies

What “upstream done” means in evidence terms (commands, artifacts, approvals).

## Interfaces this packet must not invent

Reuse existing contracts, modules, and error envelopes. Name them.

## Implementer definition of done

- [ ] Scope limited to allowed files
- [ ] Tests/builds/migrations named by this packet exist and pass locally
- [ ] Draft evidence record started
- [ ] No secrets, live providers, or copied prior DTP code

## Verifier definition of done

Commands to run:

```text
{commands}
```

Map results to:

- {acceptance check or AC}

Fail the packet if any command was not run or any mapped check lacks observed evidence.

## Constraints

- Fresh repository / no prior DTP copy (TDD §36.2)
- Fake providers / local-test identity unless the packet explicitly names a sandbox
- No production, real payments, real identity documents, live location, or customer data

## Worker brief

Paste into an Implementer prompt. Keep this section current when the packet changes.

```text
You are the Implementer for {PACKET_ID}.
Read master-work-vault/RULES.md roles for Implementer only.
Read this packet in full. Do not expand scope.
Do not mark the packet done. Produce a draft evidence record for a Verifier.
Forbidden: {summary}.
```
