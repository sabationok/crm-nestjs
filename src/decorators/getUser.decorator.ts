import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IReqWithUserData } from '../guards/AuthGuard.guard';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req: IReqWithUserData = ctx.switchToHttp().getRequest();

    return req.user;
  },
);
