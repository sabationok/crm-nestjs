import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import createHttpException from '../helpers/createHttpException';
import * as bcrypt from 'bcryptjs';
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
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req: IReqWithUserData = ctx.switchToHttp().getRequest();
    const { email, password } = req.body;

    const user = await this.authService.findUserByEmail(email);

    if (!user) {
      throw createHttpException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Користувач не знайдений',
        innerCode: HttpStatus.NOT_FOUND,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw createHttpException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Невірний email або пароль',
        innerCode: HttpStatus.UNAUTHORIZED,
      });
    }
    console.log('AuthGuard: Access granted.', user.email);
    req.user = user;
    return true;
  }
}
