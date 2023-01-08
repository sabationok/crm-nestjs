import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FindUserDto } from 'src/auth/dto/findUserDto.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExparation: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
  async validate({ role, _id }: Pick<FindUserDto, 'role' | '_id'>) {
    return { role, _id };
  }
}
