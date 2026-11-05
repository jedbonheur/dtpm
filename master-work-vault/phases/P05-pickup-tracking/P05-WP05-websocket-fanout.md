# P05-WP05: Authorized WebSocket fan-out

| Field | Value |
|---|---|
| ID | P05-WP05 |
| Phase | 5 |
| Status | blocked |
| Depends on | P05-WP04 |
| Citations | TDD §8, §19.3, §22 |

## Goal

Authorized senders receive tracking events over WebSockets. Polling is fallback only (TDD §34.5). WebSockets are not business truth.

## Worker brief

```text
Implementer for P05-WP05. Authorized fan-out. Start only if ready.
```
