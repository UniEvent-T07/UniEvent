import { Controller, Get, type INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'node:crypto';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { Role, ScopeType, UserStatus } from '../generated/prisma/client.js';
import { AppModule } from '../src/app.module.js';
import { AuditService } from '../src/audit.service.js';
import { Roles, Scope } from '../src/auth/authorization.js';
import { configureApp } from '../src/configure-app.js';
import { PrismaService } from '../src/prisma.service.js';

@Controller('test/clubs')
class ClubTestController {
  @Get(':clubId')
  @Roles(Role.ORGANISER)
  @Scope({ type: ScopeType.CLUB, param: 'clubId' })
  showClub() {
    return { allowed: true };
  }
}

describe('Setup v0 API (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  let audit: AuditService;
  const organiserA = 'usr_organiser_club_a';
  const organiserB = 'usr_organiser_club_b';
  const scopedRoute = '/api/test/clubs/org_club_a';

  const anonymous = () => request(app.getHttpServer());

  async function signIn(code: string) {
    const signedIn = await anonymous()
      .post('/api/dev/login')
      .send({ userCode: code })
      .expect(204);
    const cookies: unknown = signedIn.headers['set-cookie'];
    if (!Array.isArray(cookies) || typeof cookies[0] !== 'string') {
      throw new Error('Expected a session cookie');
    }
    const cookie = cookies[0];
    expect(cookie).toContain('HttpOnly');
    expect(cookie).toContain('SameSite=Lax');
    expect(cookie).not.toContain('Secure');
    return cookie.split(';')[0];
  }

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [ClubTestController],
    }).compile();
    app = module.createNestApplication();
    configureApp(app);
    await app.init();
    prisma = app.get(PrismaService);
    audit = app.get(AuditService);
  });

  beforeEach(() => vi.stubEnv('DEV_LOGIN_ENABLED', 'true'));
  afterEach(() => vi.unstubAllEnvs());
  afterAll(async () => app?.close());

  it('reports API health', async () => {
    await anonymous().get('/api/health').expect(200, { status: 'ok' });
  });

  it('lists seeded users and allows an organiser to access their club and session', async () => {
    const users = await anonymous()
      .get('/api/dev/users')
      .expect(200)
      .expect('Cache-Control', 'no-store');
    expect(users.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: organiserA })]),
    );

    const cookie = await signIn(organiserA);
    await anonymous()
      .get(scopedRoute)
      .set('Cookie', cookie)
      .expect(200, { allowed: true });
    const me = await anonymous()
      .get('/api/auth/me')
      .set('Cookie', cookie)
      .expect(200);
    expect(me.body).toEqual({
      id: organiserA,
      displayName: 'Club A Organiser',
      roles: [{ role: 'ORGANISER', scopeType: 'CLUB', scopeId: 'org_club_a' }],
    });
  });

  it('rejects an organiser from another club', async () => {
    const cookie = await signIn(organiserB);
    await anonymous().get(scopedRoute).set('Cookie', cookie).expect(403);
  });

  it('rejects a guest on a scoped route', async () => {
    await anonymous().get(scopedRoute).expect(401);
    await anonymous().get('/api/auth/me').expect(401);
  });

  it('rejects a locked fixture account', async () => {
    const result = await anonymous()
      .post('/api/dev/login')
      .send({ userCode: 'usr_attendee_locked' })
      .expect(401);
    expect(result.get('Set-Cookie')).toBeUndefined();
  });

  it('rejects and revokes an existing session when the account is locked', async () => {
    const cookie = await signIn(organiserA);
    await prisma.user.update({
      where: { id: organiserA },
      data: { status: UserStatus.LOCKED },
    });
    try {
      await anonymous().get(scopedRoute).set('Cookie', cookie).expect(401);
    } finally {
      await prisma.user.update({
        where: { id: organiserA },
        data: { status: UserStatus.ACTIVE },
      });
    }
    await anonymous().get('/api/auth/me').set('Cookie', cookie).expect(401);
  });

  it('disables dev login and the fixture list when the flag is unset', async () => {
    vi.stubEnv('DEV_LOGIN_ENABLED', undefined);
    await anonymous().get('/api/dev/users').expect(404);
    await anonymous()
      .post('/api/dev/login')
      .send({ userCode: organiserA })
      .expect(404);
  });

  it('disables dev login in production even when the flag is enabled', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    await anonymous().get('/api/dev/users').expect(404);
    await anonymous()
      .post('/api/dev/login')
      .send({ userCode: organiserA })
      .expect(404);
  });

  it('revokes the session and clears the cookie on logout', async () => {
    const cookie = await signIn(organiserA);
    const response = await anonymous()
      .post('/api/auth/logout')
      .set('Cookie', cookie)
      .expect(204);
    expect(response.get('Set-Cookie')?.[0]).toContain('unievent_session=;');
    await anonymous().get('/api/auth/me').set('Cookie', cookie).expect(401);
  });

  it('rolls back audit entries with the caller transaction', async () => {
    const targetId = randomUUID();
    const abort = new Error('roll back the caller transaction');
    await expect(
      prisma.$transaction(async (tx) => {
        await audit.record(tx, {
          actorId: organiserA,
          action: 'TEST_TRANSACTION',
          targetType: 'Test',
          targetId,
          scopeType: ScopeType.CLUB,
          scopeId: 'org_club_a',
          result: 'SUCCESS',
        });
        expect(await tx.auditLog.count({ where: { targetId } })).toBe(1);
        throw abort;
      }),
    ).rejects.toThrow(abort);
    expect(await prisma.auditLog.count({ where: { targetId } })).toBe(0);
  });
});
