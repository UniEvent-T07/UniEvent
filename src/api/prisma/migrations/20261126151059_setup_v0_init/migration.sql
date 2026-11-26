-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('UNVERIFIED', 'ACTIVE', 'LOCKED');

-- CreateEnum
CREATE TYPE "OrganisationType" AS ENUM ('CLUB', 'APPROVAL_UNIT');

-- CreateEnum
CREATE TYPE "OrganisationStatus" AS ENUM ('ACTIVE', 'DISABLED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ATTENDEE', 'ORGANISER', 'APPROVER', 'CHECKER', 'ADMINISTRATOR');

-- CreateEnum
CREATE TYPE "ScopeType" AS ENUM ('CLUB', 'APPROVAL_UNIT', 'EVENT');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'CHANGES_REQUESTED', 'APPROVED', 'REJECTED', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "ReviewOutcome" AS ENUM ('APPROVED', 'REJECTED', 'CHANGES_REQUESTED');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('HOLDING', 'CONFIRMED', 'ISSUED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "PaymentExceptionKind" AS ENUM ('LATE_PAYMENT', 'MISMATCH', 'EXTRA_TRANSFER', 'ISSUANCE_FAILURE');

-- CreateEnum
CREATE TYPE "PaymentExceptionStatus" AS ENUM ('OPEN', 'RESOLVED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "display_name" VARCHAR(150) NOT NULL,
    "email" TEXT NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'UNVERIFIED',
    "email_verified_at" TIMESTAMPTZ(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organisations" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "OrganisationType" NOT NULL,
    "approval_unit_id" TEXT,
    "status" "OrganisationStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "organisations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_assignments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "scope_type" "ScopeType",
    "scope_id" TEXT,
    "revoked_at" TIMESTAMPTZ(3),

    CONSTRAINT "role_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "token_hash" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_activity_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMPTZ(3) NOT NULL,
    "revoked_at" TIMESTAMPTZ(3),

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "actor_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "target_type" TEXT NOT NULL,
    "target_id" TEXT NOT NULL,
    "scope_type" "ScopeType",
    "scope_id" TEXT,
    "result" TEXT NOT NULL,
    "occurred_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "club_id" TEXT NOT NULL,
    "approval_unit_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "event_start" TIMESTAMPTZ(3) NOT NULL,
    "event_end" TIMESTAMPTZ(3) NOT NULL,
    "location" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "poster" TEXT NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'DRAFT',

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review_rounds" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "round_number" INTEGER NOT NULL,
    "submitted_by_id" TEXT NOT NULL,
    "submitted_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_rounds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review_decisions" (
    "id" TEXT NOT NULL,
    "review_round_id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "decision" "ReviewOutcome" NOT NULL,
    "reason" TEXT,
    "decided_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_decisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_types" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price_vnd" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "per_account_limit" INTEGER NOT NULL,
    "sales_start" TIMESTAMPTZ(3) NOT NULL,
    "sales_end" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ticket_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" TEXT NOT NULL,
    "attendee_id" TEXT NOT NULL,
    "ticket_type_id" TEXT NOT NULL,
    "status" "ReservationStatus" NOT NULL,
    "price_vnd" INTEGER NOT NULL,
    "request_code" TEXT NOT NULL,
    "invoice_code" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMPTZ(3),
    "confirming_payment_receipt_id" TEXT,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allocations" (
    "id" TEXT NOT NULL,
    "ticket_type_id" TEXT NOT NULL,
    "reservation_id" TEXT,

    CONSTRAINT "allocations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_receipts" (
    "id" TEXT NOT NULL,
    "reservation_id" TEXT,
    "provider_reference" TEXT NOT NULL,
    "invoice_code" TEXT,
    "amount_vnd" INTEGER,
    "currency" TEXT,
    "evidence" JSONB,
    "received_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_receipts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_exceptions" (
    "id" TEXT NOT NULL,
    "reservation_id" TEXT,
    "payment_receipt_id" TEXT,
    "kind" "PaymentExceptionKind" NOT NULL,
    "status" "PaymentExceptionStatus" NOT NULL DEFAULT 'OPEN',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved_at" TIMESTAMPTZ(3),

    CONSTRAINT "payment_exceptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "external_refunds" (
    "id" TEXT NOT NULL,
    "payment_receipt_id" TEXT NOT NULL,
    "recorded_by_id" TEXT NOT NULL,
    "transfer_reference" TEXT NOT NULL,
    "amount_vnd" INTEGER NOT NULL,
    "refunded_at" TIMESTAMPTZ(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "transfer_evidence" TEXT NOT NULL,
    "payer_notification_evidence" TEXT NOT NULL,

    CONSTRAINT "external_refunds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" TEXT NOT NULL,
    "reservation_id" TEXT NOT NULL,
    "issued_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance_records" (
    "ticket_id" TEXT NOT NULL,
    "checked_in_at" TIMESTAMPTZ(3),
    "checked_out_at" TIMESTAMPTZ(3),

    CONSTRAINT "attendance_records_pkey" PRIMARY KEY ("ticket_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_code_key" ON "users"("code");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "organisations_code_key" ON "organisations"("code");

-- CreateIndex
CREATE INDEX "organisations_approval_unit_id_idx" ON "organisations"("approval_unit_id");

-- CreateIndex
CREATE INDEX "role_assignments_user_id_revoked_at_idx" ON "role_assignments"("user_id", "revoked_at");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_hash_key" ON "sessions"("token_hash");

-- CreateIndex
CREATE INDEX "sessions_user_id_revoked_at_idx" ON "sessions"("user_id", "revoked_at");

-- CreateIndex
CREATE INDEX "audit_logs_occurred_at_idx" ON "audit_logs"("occurred_at");

-- CreateIndex
CREATE INDEX "audit_logs_target_type_target_id_idx" ON "audit_logs"("target_type", "target_id");

-- CreateIndex
CREATE INDEX "events_club_id_status_idx" ON "events"("club_id", "status");

-- CreateIndex
CREATE INDEX "events_approval_unit_id_status_idx" ON "events"("approval_unit_id", "status");

-- CreateIndex
CREATE INDEX "events_status_event_start_idx" ON "events"("status", "event_start");

-- CreateIndex
CREATE UNIQUE INDEX "review_rounds_event_id_round_number_key" ON "review_rounds"("event_id", "round_number");

-- CreateIndex
CREATE UNIQUE INDEX "review_decisions_review_round_id_key" ON "review_decisions"("review_round_id");

-- CreateIndex
CREATE INDEX "ticket_types_event_id_sales_start_idx" ON "ticket_types"("event_id", "sales_start");

-- CreateIndex
CREATE UNIQUE INDEX "reservations_invoice_code_key" ON "reservations"("invoice_code");

-- CreateIndex
CREATE INDEX "reservations_ticket_type_id_attendee_id_status_idx" ON "reservations"("ticket_type_id", "attendee_id", "status");

-- CreateIndex
CREATE INDEX "reservations_status_expires_at_idx" ON "reservations"("status", "expires_at");

-- CreateIndex
CREATE UNIQUE INDEX "reservations_attendee_id_request_code_key" ON "reservations"("attendee_id", "request_code");

-- CreateIndex
CREATE UNIQUE INDEX "reservations_id_ticket_type_id_key" ON "reservations"("id", "ticket_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "reservations_confirming_payment_receipt_id_id_key" ON "reservations"("confirming_payment_receipt_id", "id");

-- CreateIndex
CREATE INDEX "allocations_ticket_type_id_reservation_id_idx" ON "allocations"("ticket_type_id", "reservation_id");

-- CreateIndex
CREATE UNIQUE INDEX "allocations_reservation_id_ticket_type_id_key" ON "allocations"("reservation_id", "ticket_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_receipts_provider_reference_key" ON "payment_receipts"("provider_reference");

-- CreateIndex
CREATE INDEX "payment_receipts_reservation_id_idx" ON "payment_receipts"("reservation_id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_receipts_id_reservation_id_key" ON "payment_receipts"("id", "reservation_id");

-- CreateIndex
CREATE INDEX "payment_exceptions_status_created_at_idx" ON "payment_exceptions"("status", "created_at");

-- CreateIndex
CREATE INDEX "payment_exceptions_reservation_id_idx" ON "payment_exceptions"("reservation_id");

-- CreateIndex
CREATE INDEX "payment_exceptions_payment_receipt_id_idx" ON "payment_exceptions"("payment_receipt_id");

-- CreateIndex
CREATE UNIQUE INDEX "external_refunds_transfer_reference_key" ON "external_refunds"("transfer_reference");

-- CreateIndex
CREATE INDEX "external_refunds_payment_receipt_id_idx" ON "external_refunds"("payment_receipt_id");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_reservation_id_key" ON "tickets"("reservation_id");

-- AddForeignKey
ALTER TABLE "organisations" ADD CONSTRAINT "organisations_approval_unit_id_fkey" FOREIGN KEY ("approval_unit_id") REFERENCES "organisations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_assignments" ADD CONSTRAINT "role_assignments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "organisations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_approval_unit_id_fkey" FOREIGN KEY ("approval_unit_id") REFERENCES "organisations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_rounds" ADD CONSTRAINT "review_rounds_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_rounds" ADD CONSTRAINT "review_rounds_submitted_by_id_fkey" FOREIGN KEY ("submitted_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_decisions" ADD CONSTRAINT "review_decisions_review_round_id_fkey" FOREIGN KEY ("review_round_id") REFERENCES "review_rounds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_decisions" ADD CONSTRAINT "review_decisions_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_types" ADD CONSTRAINT "ticket_types_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_attendee_id_fkey" FOREIGN KEY ("attendee_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_ticket_type_id_fkey" FOREIGN KEY ("ticket_type_id") REFERENCES "ticket_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_confirming_payment_receipt_id_id_fkey" FOREIGN KEY ("confirming_payment_receipt_id", "id") REFERENCES "payment_receipts"("id", "reservation_id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "allocations" ADD CONSTRAINT "allocations_ticket_type_id_fkey" FOREIGN KEY ("ticket_type_id") REFERENCES "ticket_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allocations" ADD CONSTRAINT "allocations_reservation_id_ticket_type_id_fkey" FOREIGN KEY ("reservation_id", "ticket_type_id") REFERENCES "reservations"("id", "ticket_type_id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "payment_receipts" ADD CONSTRAINT "payment_receipts_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "reservations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_exceptions" ADD CONSTRAINT "payment_exceptions_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "reservations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_exceptions" ADD CONSTRAINT "payment_exceptions_payment_receipt_id_fkey" FOREIGN KEY ("payment_receipt_id") REFERENCES "payment_receipts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "external_refunds" ADD CONSTRAINT "external_refunds_payment_receipt_id_fkey" FOREIGN KEY ("payment_receipt_id") REFERENCES "payment_receipts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "external_refunds" ADD CONSTRAINT "external_refunds_recorded_by_id_fkey" FOREIGN KEY ("recorded_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "reservations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- A confirming receipt is selected once, and the foreign key limits it to
-- receipts for the same reservation.
CREATE FUNCTION prevent_confirming_receipt_replacement()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    IF OLD.confirming_payment_receipt_id IS NOT NULL
        AND NEW.confirming_payment_receipt_id IS DISTINCT FROM OLD.confirming_payment_receipt_id
    THEN
        RAISE EXCEPTION 'Confirming Payment Receipt cannot be changed after confirmation'
            USING ERRCODE = 'check_violation';
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER reservations_keep_confirming_receipt
BEFORE UPDATE OF confirming_payment_receipt_id ON reservations
FOR EACH ROW EXECUTE FUNCTION prevent_confirming_receipt_replacement();
