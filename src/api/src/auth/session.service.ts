import { createHmac, randomBytes } from 'node:crypto';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import {
  UserStatus,
  type RoleAssignment,
} from '../../generated/prisma/client.js';
import { PrismaService } from '../prisma.service.js';

export const SESSION_COOKIE = 'unievent_session';
const idleMs = 30 * 60 * 1_000;
const lifetimeMs = 8 * 60 * 60 * 1_000;

type SessionUser = {
  id: string;
  displayName: string;
  roles: Pick<RoleAssignment, 'role' | 'scopeType' | 'scopeId'>[];
};

export type SessionRequest = Request & { sessionUser?: SessionUser };

const activeRoles = {
  where: { revokedAt: null },
  select: { role: true, scopeType: true, scopeId: true },
} as const;

const seedUser = {
  code: { startsWith: 'usr_' },
  email: { endsWith: '@unievent.example' },
} as const;

@Injectable()
export class SessionService {
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
    @Inject(ConfigService) private readonly config: ConfigService,
  ) {}

  ensureDevLogin() {
    if (
      process.env.NODE_ENV === 'production' ||
      this.config.get('DEV_LOGIN_ENABLED') !== 'true'
    ) {
      throw new NotFoundException();
    }
  }

  get cookieOptions() {
    return {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    } as const;
  }

  get cookieMaxAge() {
    return lifetimeMs;
  }

  tokenFrom(request: Request): string | undefined {
    const token: unknown = request.cookies?.[SESSION_COOKIE];
    return typeof token === 'string' && /^[A-Za-z0-9_-]{43}$/.test(token)
      ? token
      : undefined;
  }

  async listDevUsers() {
    const users = await this.prisma.user.findMany({
      where: seedUser,
      select: {
        id: true,
        code: true,
        displayName: true,
        roleAssignments: activeRoles,
      },
      orderBy: { code: 'asc' },
    });
    return users
      .filter((user) => user.id === user.code)
      .map(({ roleAssignments, ...user }) => ({
        ...user,
        roles: roleAssignments,
      }));
  }

  async signInDev(userCode: string, previousToken: string | undefined) {
    const user = await this.prisma.user.findFirst({
      where: {
        ...seedUser,
        code: { ...seedUser.code, equals: userCode },
        id: userCode,
      },
      select: { id: true, status: true },
    });
    if (user?.status !== UserStatus.ACTIVE) throw new UnauthorizedException();

    const token = randomBytes(32).toString('base64url');
    const now = new Date();
    await this.prisma.$transaction(async (tx) => {
      if (previousToken) {
        await tx.session.updateMany({
          where: { tokenHash: this.hash(previousToken), revokedAt: null },
          data: { revokedAt: now },
        });
      }
      await tx.session.create({
        data: {
          userId: user.id,
          tokenHash: this.hash(token),
          expiresAt: new Date(now.getTime() + lifetimeMs),
          lastActivityAt: now,
        },
      });
    });
    return token;
  }

  async authenticate(
    token: string | undefined,
  ): Promise<SessionUser | undefined> {
    if (!token) return;
    const now = new Date();
    const idleSince = new Date(now.getTime() - idleMs);
    const session = await this.prisma.session.findUnique({
      where: { tokenHash: this.hash(token) },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            status: true,
            roleAssignments: activeRoles,
          },
        },
      },
    });
    if (
      !session ||
      session.revokedAt ||
      session.expiresAt <= now ||
      session.lastActivityAt <= idleSince
    )
      return;

    if (session.user.status === UserStatus.LOCKED) {
      await this.prisma.session.updateMany({
        where: { userId: session.userId, revokedAt: null },
        data: { revokedAt: now },
      });
      throw new UnauthorizedException();
    }
    if (session.user.status !== UserStatus.ACTIVE) return;

    const touched = await this.prisma.session.updateMany({
      where: {
        id: session.id,
        revokedAt: null,
        expiresAt: { gt: now },
        lastActivityAt: { gt: idleSince },
        user: { status: UserStatus.ACTIVE },
      },
      data: { lastActivityAt: now },
    });
    if (touched.count === 0) return;
    return {
      id: session.user.id,
      displayName: session.user.displayName,
      roles: session.user.roleAssignments,
    };
  }

  async revoke(token: string | undefined) {
    if (!token) return;
    await this.prisma.session.updateMany({
      where: { tokenHash: this.hash(token), revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  private hash(token: string) {
    return createHmac(
      'sha256',
      this.config.getOrThrow<string>('SESSION_SECRET'),
    )
      .update(token)
      .digest('hex');
  }
}
