import { Injectable } from '@nestjs/common';
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
  async validate({
    _id,
    role,
    status,
  }: Pick<FindUserDto, '_id' | 'role' | 'status'>) {
    return { _id, role, status };
  }
}
