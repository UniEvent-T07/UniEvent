# ADR-003 Single-channel SePay and two-transaction fulfilment

## Status

Proposed. K05 reviewer confirmation is pending in [issue #59](https://github.com/UniEvent-T07/UniEvent/issues/59).

## Context

Under PA2 BR-16–BR-20, paid reservations use one authorised SePay Payment Gateway channel for BANK_TRANSFER VietQR in VND. The system must independently authenticate callbacks, process duplicates idempotently, retain late-payment evidence and preserve timely confirmation if ticket issuance fails (FR-F05-05, FR-F06-05, NFR-08).

## Decision

Use `PaymentProviderPort` with `SePayGatewayAdapter` for live acceptance and `MockPaymentAdapter` for deterministic CI. Confirm settlement only from an independently authenticated and matched IPN.

- **TX-A** deduplicates the provider reference, locks the Reservation and allocation, checks BR-17 and BR-20, and persists the matched receipt. An eligible confirmation atomically records the first confirming receipt and changes `HOLDING` to `CONFIRMED`.
- **TX-B** rechecks the retained allocation and issues or reuses the single HMAC-SHA256-signed ticket. It commits the ticket and `CONFIRMED` to `ISSUED` transition before starting email delivery outside the transaction.

The PA2 BR-20 rule requires the first eligible confirmation to commit strictly before the original expiry. Serialising TX-A and the expiry worker on the same reservation lock is part of the design. Demonstrating the actual commit boundary remains an open implementation item. The PA3 §8 proposal to use the final eligibility check under lock as the cutoff is pending team approval.

## Alternatives considered

- Combining receipt persistence, ticket generation and mail delivery in one transaction could roll back confirmed payment evidence after a downstream failure or hold database locks during a network call.
- Treating browser redirect parameters as settlement proof would violate FR-F05-05 and BR-17.

## Consequences

- If TX-B fails before issuing a ticket, record `ISSUANCE_FAILURE` and allow the Administrator to retry issuance under UC-19. The confirmed payment and its retained allocation survive the failure.
- If email delivery fails after issuance, the ticket remains available in My Tickets, and the Administrator can resend the same ticket through the operations tool.
- The unique reservation reference prevents duplicate tickets. The confirming receipt link keeps extra and late transfers out of BR-22 gross confirmed revenue.

## References

- [PA3 §3.6 Architecture Decision Records](https://docs.google.com/document/d/1g13DVzP7vUDTMa5gwSxnpXG_9OCu_Y_1doaSq1IT6w0/edit?tab=t.0#heading=h.33tze7dnbbv5)
- [PA3 §4.4.3 SEQ-03](https://docs.google.com/document/d/1g13DVzP7vUDTMa5gwSxnpXG_9OCu_Y_1doaSq1IT6w0/edit?tab=t.0#heading=h.jpfn7kgu1f4n)
- [PA3 §8 change register](https://docs.google.com/document/d/1g13DVzP7vUDTMa5gwSxnpXG_9OCu_Y_1doaSq1IT6w0/edit?tab=t.0#heading=h.dq5n5difhrno)
