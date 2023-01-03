import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { UserDto } from 'src/auth/dto/user.dto';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate({ email, role }: Pick<UserDto, 'email' | 'role'>): Promise<{
        email: string;
        role: string;
    }>;
}
export {};
