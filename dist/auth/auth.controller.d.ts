/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { HttpStatus } from '@nestjs/common';
import { TelegramService } from 'src/telegram/telegram.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SetUserRoleDto } from './dto/setUserRole.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserBaseDoc } from './user.model';
export declare class AuthController {
    private readonly authService;
    private readonly telegramService;
    constructor(authService: AuthService, telegramService: TelegramService);
    getAll(): Promise<import("../helpers/createAppResponse").IAppSuccessResponse<{}, (import("mongoose").Document<unknown, any, import("./user.model").User> & Omit<import("./user.model").User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>>;
    getUserById(user: IUserBaseDoc): Promise<import("../helpers/createAppResponse").IAppSuccessResponse<{}, IUserBaseDoc>>;
    updateUserById(id: string, updateDto: UpdateUserDto): Promise<import("../helpers/createAppResponse").IAppSuccessResponse<{}, import("./user.model").User>>;
    setUserRoleById(id: string, roleDto: SetUserRoleDto): Promise<{
        status: HttpStatus;
        message: string;
        data: {
            email: string;
            role: import("./user.model").TUserRoles | undefined;
        };
    }>;
    getCurrentById({ access_token, email }: IUserBaseDoc): Promise<import("../helpers/createAppResponse").IAppSuccessResponse<{}, {
        access_token: string | undefined;
        email: string;
    }>>;
    getCurrentUserInfo(user: any): Promise<{
        status: HttpStatus;
        message: string;
        data: IUserBaseDoc;
    }>;
    register(dto: AuthDto): Promise<{
        status: HttpStatus;
        message: string;
        newUser: import("./user.model").User | null;
    }>;
    registerByAdmin(dto: AuthDto): Promise<{
        status: HttpStatus;
        message: string;
        newUser: import("./user.model").User | null;
    }>;
    signIn({ email, password }: AuthDto, req: any): Promise<import("../helpers/createAppResponse").IAppSuccessResponse<{}, {
        access_token: string | undefined;
    }>>;
    signOut(user: any): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
