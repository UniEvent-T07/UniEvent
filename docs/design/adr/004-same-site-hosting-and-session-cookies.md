# ADR-004 Same-site hosting through a Vercel API rewrite

## Status

Proposed. Decided during PA4 planning on 2026-11-25. Kiệt reviews it in the Setup v0 PR.

## Context

PA5 staging (E1) hosts the Next.js web app on Vercel, the NestJS API on Render and PostgreSQL on Supabase. The default domains `*.vercel.app` and `*.onrender.com` are separate sites. NFR-02 requires Secure, HttpOnly and SameSite session cookies with CSRF protection. Browsers treat a session cookie set by `*.onrender.com` on a page served from `*.vercel.app` as third-party. iPhone Safari blocks third-party cookies by default, and NFR-03 and NFR-01 require F07 scanning on iPhone Safari.

## Decision

- The browser calls REST endpoints only at the same-origin path `/api/*` on the web domain. A Vercel rewrite proxies `/api/*` to the Render API. The API sets a first-party `Secure; HttpOnly; SameSite=Lax` session cookie.
- Vercel rewrites do not proxy WebSocket upgrades, so the F08 dashboard's Socket.IO client connects directly to the Render API. It authenticates with a short-lived token from an authenticated `/api` REST call, and the gateway re-checks the token's scope.
- The SePay IPN calls the Render API URL directly, because it is server to server and carries no session.
- Business logic stays in NestJS under ADR-001. The web app does not use Next.js API routes or server actions for business operations.

## Alternatives considered

- A custom domain with `app.` and `api.` subdomains would make both sites same-site without a proxy. It costs money and needs DNS setup, which the schedule does not allow.
- Bearer tokens in browser storage would avoid cookies but violate NFR-02 and expose tokens to scripts.
- Cloudflare Pages for the web app requires a static export or an adapter. It was replaced by Vercel so that Next.js runs without restrictions.

## Consequences

- Every REST call, including F07 scans, takes an extra hop through Vercel. NFR-01 (2 s per scan) must be measured on E1 through the rewrite.
- The free tiers of Render and Supabase sleep or pause when idle. Before every NFR or acceptance session, call `/api/health` and run a warm-up pass that is not counted. Upgrade Render for the acceptance day if latency still fails.
- Prisma uses `DATABASE_URL` through the Supabase pooler with `?pgbouncer=true` and `DIRECT_URL` for migrations.
- Verify the platform behaviour above (cookie forwarding through the rewrite, sleep timers) against the providers' current docs while setting up staging, and update this ADR if it differs.

## References

- [ADR-001 Modular monolith and WebSocket updates](001-modular-monolith.md)
- [ADR-003 Single-channel SePay and two-transaction fulfilment](003-sepay-payment-fulfilment.md)
