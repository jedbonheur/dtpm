# Worker brief: {PACKET_ID}

Copy this file (or the packet’s Worker brief section) into the agent prompt. Assignment without a brief is invalid.

| Field         | Value                   |
| ------------- | ----------------------- |
| Packet        | {PACKET_ID} — {title}   |
| Role          | Implementer \| Verifier |
| Agent id      | {id}                    |
| Assigned by   | Master                  |
| Date          | {ISO date}              |
| Packet path   | {path}                  |
| Evidence path | {path}                  |

## Prompt

```text
You are the {Implementer|Verifier} for {PACKET_ID} ({title}).

Read:
- master-work-vault/RULES.md (your role only)
- {packet path}
- {evidence template or existing draft}

Rules:
- Work only this packet.
- Do not change master-work-vault/RULES.md or LEDGER.md (master owns those).
- You may add a draft or completed evidence file under master-work-vault/evidence/.
- Implementer: edit only allowed files listed in the packet.
- Verifier: do not implement fixes; run the verifier commands; pass or fail with observed output.
- Do not copy prior DTP code.
- Do not use real payments, real identity documents, live matching, live location, production, or customer data.
- Do not mark the ledger done.

When finished, report: files changed, commands run, results, and anything blocked.
```
