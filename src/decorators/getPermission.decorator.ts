import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IReqWithPermissionData } from '../guards/PermissionGuard.guard';

export const GetPermission = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req: IReqWithPermissionData = ctx.switchToHttp().getRequest();

    return req.permission;
  },
);
