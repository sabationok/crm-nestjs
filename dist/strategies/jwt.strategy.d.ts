import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { UserModel } from 'src/auth/user.model';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate({ email, role }: Pick<UserModel, 'email' | 'role'>): Promise<{
        email: string;
        role: import("src/auth/user.model").TUserRoles;
    }>;
}
export {};
