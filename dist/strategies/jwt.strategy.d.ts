import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { FindUserDto } from 'src/auth/dto/findUserDto.dto';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate({ _id, role, status, }: Pick<FindUserDto, '_id' | 'role' | 'status'>): Promise<{
        _id: import("mongoose").Types.ObjectId | undefined;
        role: string | undefined;
        status: string | undefined;
    }>;
}
export {};
