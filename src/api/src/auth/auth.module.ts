import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from './auth.controller.js';
import { RolesGuard, ScopeGuard, SessionGuard } from './authorization.js';
import { SessionService } from './session.service.js';

@Module({
  controllers: [AuthController],
  providers: [
    SessionService,
    { provide: APP_GUARD, useClass: SessionGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_GUARD, useClass: ScopeGuard },
  ],
})
export class AuthModule {}
