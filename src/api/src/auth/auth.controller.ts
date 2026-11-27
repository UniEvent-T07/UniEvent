import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Header,
  HttpCode,
  Inject,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import {
  SESSION_COOKIE,
  SessionService,
  type SessionRequest,
} from './session.service.js';

@Controller()
export class AuthController {
  constructor(
    @Inject(SessionService) private readonly sessions: SessionService,
    @Inject(ConfigService) private readonly config: ConfigService,
  ) {}

  @Get('dev/users')
  @Header('Cache-Control', 'no-store')
  listDevUsers() {
    this.sessions.ensureDevLogin();
    return this.sessions.listDevUsers();
  }

  @Post('dev/login')
  @HttpCode(204)
  @Header('Cache-Control', 'no-store')
  async login(
    @Body('userCode') userCode: unknown,
    @Req() request: SessionRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.sessions.ensureDevLogin();
    this.verifyOrigin(request);
    if (
      typeof userCode !== 'string' ||
      userCode.length === 0 ||
      userCode.length > 150
    ) {
      throw new BadRequestException();
    }
    const token = await this.sessions.signInDev(
      userCode,
      this.sessions.tokenFrom(request),
    );
    response.cookie(SESSION_COOKIE, token, {
      ...this.sessions.cookieOptions,
      maxAge: this.sessions.cookieMaxAge,
    });
  }

  @Get('auth/me')
  @Header('Cache-Control', 'no-store')
  me(@Req() request: SessionRequest) {
    if (!request.sessionUser) throw new UnauthorizedException();
    return request.sessionUser;
  }

  @Post('auth/logout')
  @HttpCode(204)
  @Header('Cache-Control', 'no-store')
  async logout(
    @Req() request: SessionRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.verifyOrigin(request);
    await this.sessions.revoke(this.sessions.tokenFrom(request));
    response.clearCookie(SESSION_COOKIE, this.sessions.cookieOptions);
  }

  private verifyOrigin(request: SessionRequest) {
    const origin = request.get('origin');
    const webOrigin = this.config.get<string>(
      'WEB_ORIGIN',
      'http://localhost:3000',
    );
    if (origin && origin !== webOrigin) throw new ForbiddenException();
  }
}
