# P01-WP01: Auth0 Development identity and sender auth boundary

| Field      | Value                                                               |
| ---------- | ------------------------------------------------------------------- |
| ID         | P01-WP01                                                            |
| Phase      | 1                                                                   |
| Status     | ready                                                               |
| Depends on | G-01                                                                |
| Ledger     | [LEDGER.md](../../LEDGER.md)                                        |
| Evidence   | none                                                                |
| Citations  | TDD §10 Identity, §12.1, §23, §32 Phase 1, §35.5, §36.1, PRD FR-001 |

## Goal

Senders authenticate through **Auth0 (Development tenant)** using OpenID Connect authorization code + PKCE. The API maps `sub` to a `users` row, issues an httpOnly session cookie, and exposes a `SenderPrincipal` for authorization. CI uses mocked Auth0/OIDC (no live Auth0 network). No Auth0 Production tenant. No local/fake login adapter.

## Why this packet exists

Phase 1 requires a sender authentication boundary (TDD §23, §32). G-01 records Auth0 Development as the identity provider (TDD §35.5).

## Allowed files / packages

- `packages/auth` principal types and sender helpers
- `packages/providers` Auth0/OIDC identity adapter
- `packages/config` Auth0 env keys (required when identity is enabled)
- `packages/persistence` `users` table (`idp_subject` unique) per TDD §12.1
- `apps/api` login redirect, callback, logout, session cookie, `requireAuth`
- Tests: unauthenticated rejection; Auth0 adapter with mocked token/JWKS (no live Auth0 in CI)

## Forbidden files / behaviors

- Auth0 Production tenant
- Public signup
- Real customer PII
- Driver verification documents
- Live Auth0 network calls in CI
- Payments, matching, location, production hosting
- Admin impersonation without audit (out of scope)

## Dependencies

G-01 done. Security/privacy and TDD §35.5 identity provider recorded by @bonheurjed.

## Interfaces this packet must not invent

Use typed config and error envelope from P00. Identity module must not own driver verification policy (TDD §10). Do not put Auth0 types in `packages/auth`.

## Implementer definition of done

- [ ] Prisma migration: `users` table (`id`, unique `idp_subject`, synthetic email, preferred locale, standing, `created_at`) per TDD §12.1 — first product schema in `packages/persistence`
- [ ] Auth0 Development OIDC (authorization code + PKCE); callback sets httpOnly, SameSite session cookie
- [ ] Auth0 `sub` upserted to `users` → `SenderPrincipal`; unknown Auth0 users rejected
- [ ] No local/fake login adapter; CI/unit tests mock Auth0/OIDC (no live Auth0 network)
- [ ] Unauthenticated API calls fail with the shared error envelope
- [ ] Authenticated sender principal available to downstream packets
- [ ] Auth0 client secrets in local env only — not committed
- [ ] Draft evidence

## Verifier definition of done

```text
{Auth0 adapter unit/API tests with mocked token/JWKS — no live Auth0 in CI}
{authenticated sender principal available after successful callback path}
{unauthenticated requests return the shared error envelope}
```

Map: TDD §36.1 “authenticated sender”; PRD FR-001; G-01 `P01-TC01-local-auth-sender`.

## Constraints

TDD §36.4: no identity documents, no public signup, no production, no real customer data. Seeded synthetic Auth0 users only.

## Worker brief

```text
You are the Implementer for P01-WP01.
Read RULES.md (Implementer) and this packet.
Add the users table migration in packages/persistence (idp_subject unique).
Implement Auth0 Development OIDC (authorization code + PKCE) with an
httpOnly session cookie and users.idp_subject mapping.
Do not implement a local/fake login adapter. Mock Auth0 in CI.
No Auth0 Production tenant. No public signup. No identity documents.
Do not commit secrets. Do not mark ledger done.
```
