import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsService } from '../permissions/permissions.service';
import createHttpException from '../helpers/createHttpException';
import { IReqWithUserData } from './AuthGuard.guard';
import { PermissionDocument } from '../permissions/permission.model';
import mongoose from 'mongoose';

// import * as bcrypt from 'bcrypt';

export interface ReqBodyWithAuthData {
  email: string;
  password: string;
}
export interface IReqWithPermissionData extends IReqWithUserData {
  permission: Partial<PermissionDocument>;
}
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly permissionsService: PermissionsService,
  ) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req: IReqWithPermissionData = ctx.switchToHttp().getRequest();
    const [id] = req.baseUrl.replace('/api/', '').split('/');
    console.log('PermissionGuard', req);

    if (!mongoose.isValidObjectId(id)) {
      throw createHttpException({ statusCode: HttpStatus.FORBIDDEN });
    }

    const permission = await this.permissionsService.getById(id);

    if (!permission) {
      throw createHttpException({ statusCode: HttpStatus.FORBIDDEN });
    }

    console.log(permission);
    req.permission = permission;
    return true;
  }
}
// import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import * as bcrypt from 'bcrypt';
