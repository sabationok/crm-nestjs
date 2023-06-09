import { HttpStatus } from '@nestjs/common';
import { TelegramService } from 'src/telegram/telegram.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { IUserBase, IUserBaseDoc } from './user.model';
export declare class AuthController {
    private readonly authService;
    private readonly telegramService;
    constructor(authService: AuthService, telegramService: TelegramService);
    getCurrentById({ access_token, email }: IUserBaseDoc): Promise<import("../helpers/createAppResponse").IAppSuccessResponse<{}, {
        access_token: string | undefined;
        email: string;
    }>>;
    getCurrentUserInfo(user: IUserBase): Promise<import("../helpers/createAppResponse").IAppSuccessResponse<{}, Partial<IUserBase>>>;
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
    signIn({ email, password }: AuthDto): Promise<import("../helpers/createAppResponse").IAppSuccessResponse<{}, {
        access_token: string | undefined;
    }>>;
    signOut(user: any): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
