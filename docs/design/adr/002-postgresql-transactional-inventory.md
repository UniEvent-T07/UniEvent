# ADR-002 PostgreSQL persistence and transactional inventory

## Status

Proposed. K05 reviewer confirmation is pending in [issue #59](https://github.com/UniEvent-T07/UniEvent/issues/59).

## Context

The design must prevent overselling when 20 requests compete for the final unit (NFR-08, BR-14), enforce the event-wide configuration lock at the earliest configured `sales_start` (BR-12), co-commit required audit entries (BR-11, FR-F01-12) and calculate the BR-22 dashboard metrics from the underlying records.

## Decision

Use a normalised PostgreSQL schema with Prisma interactive transactions. Coordinate mutations with row-level locks (`SELECT ... FOR UPDATE` on Event, TicketType and Reservation) and partial or composite uniqueness constraints.

Compute available inventory by subtracting one unit for each unexpired `HOLDING` reservation, each `CONFIRMED` reservation whose allocation has not been released under BR-19, and each `ISSUED` reservation. Start from the configured TicketType quantity. Use the same retained-allocation rule for per-account limits and the pre-issuance check. A valid full refund of the confirming receipt before issuance releases its allocation and leaves the order `CONFIRMED` for reconciliation.

Compute availability and gross revenue from persisted business records. Attribute gross confirmed revenue to the first eligible receipt through the immutable same-order composite foreign key on `Reservation(confirming_payment_transaction_id, id)`.

## Alternatives considered

- Persisted stock and revenue counters could drift when confirmation races with expiry or an operator resolves an exception.
- A separate Redis lock service would add infrastructure. PostgreSQL row locks provide the coordination needed by the design.

## Consequences

- Historical order prices and routing remain available for reconciliation. Unique `Ticket.reservation_id` enforces one ticket per order. `AttendanceRecord.ticket_id` as its primary key enforces one attendance record per ticket.
- The design requires targeted composite and partial indexes plus a consistent lock order for expiry, confirmation, issuance and refund resolution. Capacity and concurrency still need PA4/PA5 verification.

## References

- [PA3 §3.6 Architecture Decision Records](https://docs.google.com/document/d/1g13DVzP7vUDTMa5gwSxnpXG_9OCu_Y_1doaSq1IT6w0/edit?tab=t.0#heading=h.33tze7dnbbv5)
- [PA3 §5.3.3 Constraints and Implementation Considerations](https://docs.google.com/document/d/1g13DVzP7vUDTMa5gwSxnpXG_9OCu_Y_1doaSq1IT6w0/edit?tab=t.0#heading=h.aaqykh6rhucv)
