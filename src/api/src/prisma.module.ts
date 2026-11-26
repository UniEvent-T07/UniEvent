import { Global, Module } from '@nestjs/common';
import { AuditService } from './audit.service.js';
import { PrismaService } from './prisma.service.js';

@Global()
@Module({
  providers: [PrismaService, AuditService],
  exports: [PrismaService, AuditService],
})
export class PrismaModule {}
