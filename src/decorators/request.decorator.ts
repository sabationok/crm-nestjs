import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    return req;
  },
);
