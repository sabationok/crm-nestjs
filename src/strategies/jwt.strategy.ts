import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserModel } from 'src/auth/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExparation: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
  async validate({ email, role }: Pick<UserModel, 'email' | 'role'>) {
    return { email, role };
  }
}
