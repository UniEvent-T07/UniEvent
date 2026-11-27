import {
  ForbiddenException,
  Inject,
  Injectable,
  SetMetadata,
  UnauthorizedException,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Role, ScopeType } from '../../generated/prisma/client.js';
import { SessionService, type SessionRequest } from './session.service.js';

const rolesKey = Symbol('roles');
const scopeKey = Symbol('scope');
type RouteScope = { type: ScopeType; param: string };

export const Roles = (...roles: Role[]) => SetMetadata(rolesKey, roles);
export const Scope = (scope: RouteScope) => SetMetadata(scopeKey, scope);

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    @Inject(SessionService) private readonly sessions: SessionService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<SessionRequest>();
    request.sessionUser = await this.sessions.authenticate(
      this.sessions.tokenFrom(request),
    );
    return true;
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(@Inject(Reflector) private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride<Role[] | undefined>(
      rolesKey,
      [context.getHandler(), context.getClass()],
    );
    if (!roles) return true;

    const { sessionUser } = context.switchToHttp().getRequest<SessionRequest>();
    if (!sessionUser) throw new UnauthorizedException();
    if (
      !sessionUser.roles.some((assignment) => roles.includes(assignment.role))
    ) {
      throw new ForbiddenException();
    }
    return true;
  }
}

@Injectable()
export class ScopeGuard implements CanActivate {
  constructor(@Inject(Reflector) private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const handlers = [context.getHandler(), context.getClass()];
    const scope = this.reflector.getAllAndOverride<RouteScope | undefined>(
      scopeKey,
      handlers,
    );
    if (!scope) return true;

    const request = context.switchToHttp().getRequest<SessionRequest>();
    if (!request.sessionUser) throw new UnauthorizedException();

    const roles = this.reflector.getAllAndOverride<Role[] | undefined>(
      rolesKey,
      handlers,
    );
    const id = request.params[scope.param];
    const allowed =
      typeof id === 'string' &&
      request.sessionUser.roles.some(
        (assignment) =>
          assignment.scopeType === scope.type &&
          assignment.scopeId === id &&
          (!roles || roles.includes(assignment.role)),
      );
    if (!allowed) throw new ForbiddenException();
    return true;
  }
}
