# P05-WP03: Background location permissions

| Field      | Value                           |
| ---------- | ------------------------------- |
| ID         | P05-WP03                        |
| Phase      | 5                               |
| Status     | blocked                         |
| Depends on | P02-WP06; location/privacy gate |
| Citations  | TDD §19.1, §36.4                |

## Goal

Native-capable driver app explains and records background-location permission states. No production tracking of real users without gates.

## Worker brief

```text
Implementer for P05-WP03. Permission states only until ingest packet. Start only if ready.
```
