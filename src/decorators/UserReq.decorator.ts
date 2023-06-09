import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

interface IUser {
  _id: string;
  name: string;
}
interface IUserRequest extends Request {
  user: IUser;
}

export const UserRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IUserRequest =>
    ctx.switchToHttp().getRequest() as IUserRequest,
);
