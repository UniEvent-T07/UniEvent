import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, ReviewOutcome, UserStatus, type Prisma } from '../generated/prisma/client.js';

const connectionString = process.env.DATABASE_URL ?? process.env.DIRECT_URL;
if (!connectionString) {
  throw new Error('Set DATABASE_URL or DIRECT_URL to seed the database.');
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
const now = Date.now();
const minute = 60_000;
const day = 24 * 60;
const at = (minutes: number) => new Date(now + minutes * minute);
const paidPrice = 50_000;

async function seed(tx: Prisma.TransactionClient) {
  const users: Prisma.UserCreateManyInput[] = [
    { id: 'usr_attendee', displayName: 'Attendee' },
    { id: 'usr_attendee_check_in', displayName: 'Checked-in Attendee' },
    { id: 'usr_attendee_check_out', displayName: 'Checked-out Attendee' },
    { id: 'usr_attendee_locked', displayName: 'Locked Attendee', status: UserStatus.LOCKED },
    { id: 'usr_attendee_unverified', displayName: 'Unverified Attendee', status: UserStatus.UNVERIFIED },
    { id: 'usr_organiser_club_a', displayName: 'Club A Organiser' },
    { id: 'usr_organiser_club_b', displayName: 'Club B Organiser' },
    { id: 'usr_approver_unit_a', displayName: 'Unit A Approver' },
    { id: 'usr_organiser_approver_a', displayName: 'Club A Organiser and Unit A Approver' },
    { id: 'usr_checker_evt', displayName: 'Paid Event Checker' },
    { id: 'usr_checker_other_evt', displayName: 'Free Event Checker' },
    { id: 'usr_admin', displayName: 'Administrator' },
  ].map(({ id, displayName, status = UserStatus.ACTIVE }) => ({
    id,
    code: id,
    displayName,
    email: id + '@unievent.example',
    status,
    emailVerifiedAt: status === 'UNVERIFIED' ? null : at(-30 * day),
  }));

  for (const user of users) {
    await tx.user.upsert({ where: { code: user.code }, create: user, update: user });
  }

  const organisations: (Prisma.OrganisationCreateManyInput & { id: string })[] = [
    { id: 'org_unit_a', code: 'org_unit_a', name: 'Approval Unit A', type: 'APPROVAL_UNIT' },
    { id: 'org_unit_b', code: 'org_unit_b', name: 'Approval Unit B', type: 'APPROVAL_UNIT' },
    { id: 'org_club_a', code: 'org_club_a', name: 'Club A', type: 'CLUB', approvalUnitId: 'org_unit_a' },
    { id: 'org_club_b', code: 'org_club_b', name: 'Club B', type: 'CLUB', approvalUnitId: 'org_unit_b' },
    { id: 'org_club_disabled', code: 'org_club_disabled', name: 'Disabled Club', type: 'CLUB', approvalUnitId: 'org_unit_a', status: 'DISABLED' },
  ];

  for (const organisation of organisations) {
    await tx.organisation.upsert({
      where: { id: organisation.id },
      create: organisation,
      update: organisation,
    });
  }

  const events: Pick<Prisma.EventUncheckedCreateInput, 'status' | 'title'>[] = [
    { status: 'DRAFT', title: 'Draft Event' },
    { status: 'SUBMITTED', title: 'Submitted Event' },
    { status: 'CHANGES_REQUESTED', title: 'Event Awaiting Changes' },
    { status: 'APPROVED', title: 'Approved Event Without Tickets' },
    { status: 'APPROVED', title: 'Approved Event Ready to Publish' },
    { status: 'REJECTED', title: 'Rejected Event' },
    { status: 'PUBLISHED', title: 'Published Paid Event' },
    { status: 'PUBLISHED', title: 'Published Free Event' },
    { status: 'PUBLISHED', title: 'Published Presale Event' },
    { status: 'PUBLISHED', title: 'Published Event With Sales Closed' },
  ];
  const eventIds = [
    'evt_draft',
    'evt_submitted',
    'evt_changes_requested',
    'evt_approved_no_tickets',
    'evt_approved_ready',
    'evt_rejected',
    'evt_published_paid',
    'evt_published_free',
    'evt_published_presale',
    'evt_published_sales_closed',
  ];

  for (const [index, event] of events.entries()) {
    const id = eventIds[index];
    const data = {
      ...event,
      id,
      clubId: 'org_club_a',
      approvalUnitId: 'org_unit_a',
      description: 'UniEvent Setup v0 fixture for ' + event.title + '.',
      eventStart: at(3 * day),
      eventEnd: at(3 * day + 120),
      location: 'Demo Hall',
      capacity: 100,
      poster: '/fixtures/event-poster.png',
    };
    await tx.event.upsert({ where: { id }, create: data, update: data });
  }

  const assignments: (Prisma.RoleAssignmentCreateManyInput & { id: string })[] = [
    { id: 'ra_attendee', userId: 'usr_attendee', role: 'ATTENDEE' },
    { id: 'ra_attendee_check_in', userId: 'usr_attendee_check_in', role: 'ATTENDEE' },
    { id: 'ra_attendee_check_out', userId: 'usr_attendee_check_out', role: 'ATTENDEE' },
    { id: 'ra_attendee_locked', userId: 'usr_attendee_locked', role: 'ATTENDEE' },
    { id: 'ra_attendee_unverified', userId: 'usr_attendee_unverified', role: 'ATTENDEE' },
    { id: 'ra_organiser_a', userId: 'usr_organiser_club_a', role: 'ORGANISER', scopeType: 'CLUB', scopeId: 'org_club_a' },
    { id: 'ra_organiser_b', userId: 'usr_organiser_club_b', role: 'ORGANISER', scopeType: 'CLUB', scopeId: 'org_club_b' },
    { id: 'ra_approver_a', userId: 'usr_approver_unit_a', role: 'APPROVER', scopeType: 'APPROVAL_UNIT', scopeId: 'org_unit_a' },
    { id: 'ra_conflict_organiser', userId: 'usr_organiser_approver_a', role: 'ORGANISER', scopeType: 'CLUB', scopeId: 'org_club_a' },
    { id: 'ra_conflict_approver', userId: 'usr_organiser_approver_a', role: 'APPROVER', scopeType: 'APPROVAL_UNIT', scopeId: 'org_unit_a' },
    { id: 'ra_checker_paid', userId: 'usr_checker_evt', role: 'CHECKER', scopeType: 'EVENT', scopeId: 'evt_published_paid' },
    { id: 'ra_checker_free', userId: 'usr_checker_other_evt', role: 'CHECKER', scopeType: 'EVENT', scopeId: 'evt_published_free' },
    { id: 'ra_admin', userId: 'usr_admin', role: 'ADMINISTRATOR' },
  ];

  for (const assignment of assignments) {
    const data = { scopeType: null, scopeId: null, revokedAt: null, ...assignment };
    await tx.roleAssignment.upsert({
      where: { id: assignment.id },
      create: data,
      update: data,
    });
  }

  const rounds = [
    { id: 'rr_awaiting', eventId: 'evt_submitted' },
    { id: 'rr_changes', eventId: 'evt_changes_requested' },
    { id: 'rr_approved', eventId: 'evt_approved_no_tickets' },
    { id: 'rr_approved_ready', eventId: 'evt_approved_ready' },
    { id: 'rr_rejected', eventId: 'evt_rejected' },
    { id: 'rr_paid', eventId: 'evt_published_paid' },
    { id: 'rr_free', eventId: 'evt_published_free' },
    { id: 'rr_presale', eventId: 'evt_published_presale' },
    { id: 'rr_sales_closed', eventId: 'evt_published_sales_closed' },
  ];

  for (const round of rounds) {
    const data = {
      ...round,
      roundNumber: 1,
      submittedById: 'usr_organiser_club_a',
      submittedAt: at(-10 * day),
    };
    await tx.reviewRound.upsert({ where: { id: round.id }, create: data, update: data });
  }

  const decisions: (Prisma.ReviewDecisionCreateManyInput & { id: string })[] = [
    { id: 'rd_changes', reviewRoundId: 'rr_changes', decision: ReviewOutcome.CHANGES_REQUESTED, reason: 'Clarify the venue setup.' },
    { id: 'rd_approved', reviewRoundId: 'rr_approved', decision: ReviewOutcome.APPROVED },
    { id: 'rd_approved_ready', reviewRoundId: 'rr_approved_ready', decision: ReviewOutcome.APPROVED },
    { id: 'rd_rejected', reviewRoundId: 'rr_rejected', decision: ReviewOutcome.REJECTED, reason: 'The requested venue is unavailable.' },
    { id: 'rd_paid', reviewRoundId: 'rr_paid', decision: ReviewOutcome.APPROVED },
    { id: 'rd_free', reviewRoundId: 'rr_free', decision: ReviewOutcome.APPROVED },
    { id: 'rd_presale', reviewRoundId: 'rr_presale', decision: ReviewOutcome.APPROVED },
    { id: 'rd_sales_closed', reviewRoundId: 'rr_sales_closed', decision: ReviewOutcome.APPROVED },
  ].map((decision) => ({
    ...decision,
    approverId: 'usr_approver_unit_a',
    decidedAt: at(-9 * day),
  }));

  for (const decision of decisions) {
    await tx.reviewDecision.upsert({
      where: { id: decision.id },
      create: decision,
      update: decision,
    });
  }

  const ticketTypes = [
    { id: 'tt_before_lock', eventId: 'evt_approved_ready', name: 'Advance', salesStart: at(day), salesEnd: at(2 * day), priceVnd: paidPrice },
    { id: 'tt_presale', eventId: 'evt_published_presale', name: 'Presale', salesStart: at(day), salesEnd: at(2 * day), priceVnd: paidPrice },
    { id: 'tt_locked', eventId: 'evt_published_paid', name: 'Standard', salesStart: at(-day), salesEnd: at(2 * day), priceVnd: paidPrice },
    { id: 'tt_locked_future', eventId: 'evt_published_paid', name: 'Standard Later', salesStart: at(day), salesEnd: at(2 * day), priceVnd: paidPrice },
    { id: 'tt_free_open', eventId: 'evt_published_free', name: 'Free', salesStart: at(-day), salesEnd: at(2 * day), priceVnd: 0 },
    { id: 'tt_sales_closed', eventId: 'evt_published_sales_closed', name: 'Sales Closed', salesStart: at(-2 * day), salesEnd: at(-day), priceVnd: paidPrice },
  ];

  const quantity = 12;
  for (const ticketType of ticketTypes) {
    const data = { ...ticketType, quantity, perAccountLimit: 5 };
    await tx.ticketType.upsert({
      where: { id: ticketType.id },
      create: data,
      update: data,
    });
  }

  const reservations = [
    { id: 'res_holding_fresh', status: 'HOLDING', age: 5, allocation: 1 },
    { id: 'res_holding_expired', status: 'HOLDING', age: 16, allocation: 2 },
    { id: 'res_expired', status: 'EXPIRED', age: 120 },
    { id: 'res_confirmed_unissued', status: 'CONFIRMED', age: 60, allocation: 3 },
    { id: 'res_confirmed_refunded', status: 'CONFIRMED', age: 100 },
    { id: 'res_issued_paid', status: 'ISSUED', age: 180, allocation: 4 },
    { id: 'res_issued_free', status: 'ISSUED', age: 120, allocation: 1 },
    { id: 'res_issued_for_check_in', status: 'ISSUED', age: 200, allocation: 5, owner: 'usr_attendee_check_in' },
    { id: 'res_issued_for_check_out', status: 'ISSUED', age: 240, allocation: 6, owner: 'usr_attendee_check_out' },
  ] as const;
  const allocationOwners = new Map<string, string>();
  const invoiceFor = (reservationId: string) => 'invoice_' + reservationId;

  for (const reservation of reservations) {
    const free = reservation.id === 'res_issued_free';
    const ticketTypeId = free ? 'tt_free_open' : 'tt_locked';
    const data = {
      id: reservation.id,
      status: reservation.status,
      attendeeId: 'owner' in reservation ? reservation.owner : 'usr_attendee',
      ticketTypeId,
      priceVnd: free ? 0 : paidPrice,
      requestCode: 'request_' + reservation.id,
      invoiceCode: free ? null : invoiceFor(reservation.id),
      createdAt: at(-reservation.age),
      expiresAt: free ? null : at(15 - reservation.age),
    };

    await tx.reservation.upsert({
      where: { id: reservation.id },
      create: data,
      update: data,
    });
    if ('allocation' in reservation) {
      allocationOwners.set(ticketTypeId + '_' + reservation.allocation, reservation.id);
    }
  }

  for (const ticketType of ticketTypes) {
    for (let i = 1; i <= quantity; i++) {
      const key = ticketType.id + '_' + i;
      const id = ticketType.id === 'tt_locked' && i === quantity ? 'alloc_available' : 'alloc_' + key;
      const reservationId = allocationOwners.get(key) ?? null;
      await tx.allocation.upsert({
        where: { id },
        create: { id, ticketTypeId: ticketType.id, reservationId },
        update: { reservationId },
      });
    }
  }

  const receipts = [
    { id: 'rcpt_confirming', reservationId: 'res_confirmed_unissued', age: 58, confirming: true },
    { id: 'rcpt_confirming_refunded', reservationId: 'res_confirmed_refunded', age: 98, confirming: true },
    { id: 'rcpt_confirming_paid', reservationId: 'res_issued_paid', age: 178, confirming: true },
    { id: 'rcpt_check_in', reservationId: 'res_issued_for_check_in', age: 198, confirming: true },
    { id: 'rcpt_check_out', reservationId: 'res_issued_for_check_out', age: 238, confirming: true },
    { id: 'rcpt_late', reservationId: 'res_expired', age: 104, confirming: false },
    { id: 'rcpt_mismatch', reservationId: 'res_holding_fresh', age: 4, confirming: false, amountVnd: paidPrice - 1_000 },
    { id: 'rcpt_extra', reservationId: 'res_issued_paid', age: 170, confirming: false },
  ];

  for (const receipt of receipts) {
    const data = {
      id: receipt.id,
      reservationId: receipt.reservationId,
      providerReference: 'sepay_fixture_' + receipt.id,
      invoiceCode: invoiceFor(receipt.reservationId),
      amountVnd: receipt.amountVnd ?? paidPrice,
      currency: 'VND',
      receivedAt: at(-receipt.age),
      evidence: {
        notificationType: 'ORDER_PAID',
        orderStatus: 'CAPTURED',
        transactionStatus: 'APPROVED',
        transactionType: 'PAYMENT',
        paymentMethod: 'BANK_TRANSFER',
      },
    };
    await tx.paymentReceipt.upsert({ where: { id: receipt.id }, create: data, update: data });
    if (receipt.confirming) {
      await tx.reservation.update({
        where: { id: receipt.reservationId },
        data: { confirmingPaymentReceiptId: receipt.id },
      });
    }
  }

  const externalRefund = {
    id: 'refund_full',
    paymentReceiptId: 'rcpt_confirming_refunded',
    recordedById: 'usr_admin',
    transferReference: 'external_transfer_refund_full',
    amountVnd: paidPrice,
    refundedAt: at(-75),
    reason: 'Full external refund for an unissued Reservation.',
    transferEvidence: 'fixture:bank-transfer/refund_full',
    payerNotificationEvidence: 'fixture:payer-notice/refund_full',
  };
  await tx.externalRefund.upsert({
    where: { id: externalRefund.id },
    create: externalRefund,
    update: externalRefund,
  });

  const exceptions: (Prisma.PaymentExceptionCreateManyInput & { id: string })[] = [
    { id: 'pex_late_payment', reservationId: 'res_expired', paymentReceiptId: 'rcpt_late', kind: 'LATE_PAYMENT', createdAt: at(-104) },
    { id: 'pex_mismatch', reservationId: 'res_holding_fresh', paymentReceiptId: 'rcpt_mismatch', kind: 'MISMATCH', createdAt: at(-4) },
    { id: 'pex_extra', reservationId: 'res_issued_paid', paymentReceiptId: 'rcpt_extra', kind: 'EXTRA_TRANSFER', createdAt: at(-170) },
    { id: 'pex_issuance_failure', reservationId: 'res_confirmed_unissued', paymentReceiptId: 'rcpt_confirming', kind: 'ISSUANCE_FAILURE', createdAt: at(-57) },
    { id: 'pex_resolved_retry', reservationId: 'res_issued_paid', paymentReceiptId: 'rcpt_confirming_paid', kind: 'ISSUANCE_FAILURE', status: 'RESOLVED', createdAt: at(-177), resolvedAt: at(-175) },
    { id: 'pex_resolved_refund', reservationId: 'res_confirmed_refunded', paymentReceiptId: 'rcpt_confirming_refunded', kind: 'ISSUANCE_FAILURE', status: 'RESOLVED', createdAt: at(-97), resolvedAt: at(-74) },
  ];

  for (const exception of exceptions) {
    const data = { status: 'OPEN' as const, resolvedAt: null, ...exception };
    await tx.paymentException.upsert({
      where: { id: exception.id },
      create: data,
      update: data,
    });
  }

  const tickets = [
    { id: 'tkt_issued_unchecked', reservationId: 'res_issued_paid', issuedAt: at(-175) },
    { id: 'tkt_issued_free', reservationId: 'res_issued_free', issuedAt: at(-120) },
    { id: 'tkt_checked_in', reservationId: 'res_issued_for_check_in', issuedAt: at(-197), checkedInAt: at(-50) },
    { id: 'tkt_checked_out', reservationId: 'res_issued_for_check_out', issuedAt: at(-237), checkedInAt: at(-100), checkedOutAt: at(-50) },
  ];

  for (const { checkedInAt = null, checkedOutAt = null, ...ticket } of tickets) {
    await tx.ticket.upsert({ where: { id: ticket.id }, create: ticket, update: ticket });
    const attendance = { ticketId: ticket.id, checkedInAt, checkedOutAt };
    await tx.attendanceRecord.upsert({
      where: { ticketId: ticket.id },
      create: attendance,
      update: attendance,
    });
  }

  const auditEntries = [
    {
      id: 'audit_payment_resolution',
      actorId: 'usr_admin',
      action: 'PAYMENT_EXCEPTION_RESOLVED',
      targetType: 'PaymentException',
      targetId: 'pex_resolved_refund',
      scopeType: 'EVENT' as const,
      scopeId: 'evt_published_paid',
      result: 'SUCCESS',
      occurredAt: at(-74),
    },
    {
      id: 'audit_csv_export',
      actorId: 'usr_organiser_club_a',
      action: 'CSV_EXPORTED',
      targetType: 'Event',
      targetId: 'evt_published_paid',
      scopeType: 'EVENT' as const,
      scopeId: 'evt_published_paid',
      result: 'SUCCESS',
      occurredAt: at(-1),
    },
  ];

  for (const entry of auditEntries) {
    await tx.auditLog.upsert({ where: { id: entry.id }, create: entry, update: {} });
  }
}

prisma.$transaction(seed, { timeout: 30_000 })
  .then(() => console.log('UniEvent Setup v0 fixtures seeded.'))
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
