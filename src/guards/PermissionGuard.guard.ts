import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsService } from '../permissions/permissions.service';
import createError from '../helpers/createError';
import { FindUser } from '../auth/user.model';

// import * as bcrypt from 'bcrypt';

export interface ReqBodyWithAuthData {
  email: string;
  password: string;
}
export interface ReqWithUserData {
  user: FindUser;
  body: {
    email: string;
    password: string;
  };
}
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly permissionsService: PermissionsService,
  ) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req: ReqWithUserData = ctx.switchToHttp().getRequest();
    const { user } = req;

    const permission = await this.permissionsService.findOneByUserId(user._id);
    console.log(permission);

    if (!permission) {
      throw createError({ statusCode: HttpStatus.FORBIDDEN });
    }

    return true;
  }
}
// import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import * as bcrypt from 'bcrypt';
