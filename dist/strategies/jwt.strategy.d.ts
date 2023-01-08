import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { FindUserDto } from 'src/auth/dto/findUserDto.dto';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate({ role, _id }: Pick<FindUserDto, 'role' | '_id'>): Promise<{
        role: string | undefined;
        _id: import("mongoose").Types.ObjectId | undefined;
    }>;
}
export {};
