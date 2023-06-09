import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import createHttpException from '../helpers/createHttpException';
import { UserDocument } from '../auth/user.model';
import { Request } from 'express';

export interface IReqWithAuthData extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface IReqWithUserData extends Omit<IReqWithAuthData, 'body'> {
  user: Partial<UserDocument>;
  body: any;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req: IReqWithUserData = ctx.switchToHttp().getRequest();

    const authorization = req.headers.authorization;
    if (!authorization) {
      throw createHttpException({ statusCode: HttpStatus.UNAUTHORIZED });
    }
    const user = await this.authService.validateUserByBearerToken(
      authorization,
    );

    console.log('JwtAuthGuard: Access granted.', user.email);
    req.user = user;
    return true;
  }
}
