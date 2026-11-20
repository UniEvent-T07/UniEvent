# ADR-001 Modular monolith and WebSocket updates

## Status

Proposed. K05 reviewer confirmation is pending in [issue #59](https://github.com/UniEvent-T07/UniEvent/issues/59).

## Context

UniEvent must deliver F01–F08 in weeks 8–10 with four students and free-tier hosting (PA2 Table 3.4). The design must co-commit business mutations with audit entries (BR-11), issue free tickets atomically (BR-14), protect capacity under concurrency (NFR-08) and refresh connected organiser dashboards within five seconds (NFR-05).

## Decision

Use a Next.js client and a single NestJS backend organised as a modular monolith. Keep the ten components from CMP-AUTH through CMP-REPORTING inside the backend. Use controllers and guards at the boundary, services for orchestration, domain rules for business invariants, and Prisma repositories for persistence. Use the integrated Socket.IO gateway for live dashboard updates.

## Alternatives considered

- Microservices would introduce cross-service transaction coordination for reservations, issuance and auditing, add latency to the NFR-01 scan path and increase hosting demands.
- Next.js serverless API routes alone would complicate persistent WebSocket connections and the reservation expiry worker (FR-F05-02).

## Consequences

- Backend components can share PostgreSQL transactions and TypeScript types. Calls between modules stay in the same process.
- Components share a Node.js runtime and database connection pool. Module boundaries and targeted indexes need to be maintained.

## References

- [PA3 §3.6 Architecture Decision Records](https://docs.google.com/document/d/1g13DVzP7vUDTMa5gwSxnpXG_9OCu_Y_1doaSq1IT6w0/edit?tab=t.0#heading=h.33tze7dnbbv5)
