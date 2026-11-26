import { Injectable } from '@nestjs/common';
import type { Prisma } from '../generated/prisma/client.js';

type AuditEvent = Pick<
  Prisma.AuditLogUncheckedCreateInput,
  | 'actorId'
  | 'action'
  | 'targetType'
  | 'targetId'
  | 'scopeType'
  | 'scopeId'
  | 'result'
>;

@Injectable()
export class AuditService {
  record(tx: Prisma.TransactionClient, event: AuditEvent) {
    return tx.auditLog.create({ data: event });
  }
}
