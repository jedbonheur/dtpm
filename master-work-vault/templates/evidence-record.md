# Evidence: {PACKET_ID}

| Field | Value |
|---|---|
| Packet | {PACKET_ID} |
| Implementer | {agent id} |
| Verifier | {agent id; must differ from Implementer} |
| Date | {ISO date} |
| Verdict | pass \| fail |

## Commands run

| Command | Where | Observed result |
|---|---|---|
| {cmd} | {cwd} | pass / fail + short output or log path |

Claims without a command row are invalid.

## Acceptance mapping

| Check | Evidence | Observed |
|---|---|---|
| {packet DoD or AC-xxx} | {test name / log} | pass / fail / not run |

## Forbidden-scope scan

| Risk | Observed |
|---|---|
| Product files outside the packet allow-list | none / {paths} |
| Secrets or live provider credentials | none / {paths} |
| Prior DTP copy | none / {note} |
| Real payments, identity docs, location, production data | none / {note} |

## Verifier notes

{gaps, flakiness, follow-up packets}

## Verdict rationale

Pass only if every mapped check has observed passing evidence and forbidden-scope scan is clean.
