import { HttpStatus } from '@nestjs/common';
import { TelegramService } from 'src/telegram/telegram.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SetUserRoleDto } from './dto/setUserRole.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class AuthController {
    private readonly authService;
    private readonly telegramService;
    constructor(authService: AuthService, telegramService: TelegramService);
    getAll(): Promise<import("./findUser.model").FindUser[]>;
    getUserById(userId: string): Promise<{
        status: HttpStatus;
        data: import("./findUser.model").FindUser | null;
        message: string;
    }>;
    updateUserById(id: string, updateDto: UpdateUserDto): Promise<{
        status: HttpStatus;
        data: import("./user.model").User;
        message: string;
    }>;
    getCurrentUser(user: any): Promise<{
        status: HttpStatus;
        message: string;
        data: any;
    }>;
    getCurrentUserInfo(user: any): Promise<{
        status: HttpStatus;
        message: string;
        data: {
            userInfo: import("./findUser.model").FindUser;
            addInfo: any;
        };
    }>;
    setUserRoleById(id: string, roleDto: SetUserRoleDto): Promise<{
        status: HttpStatus;
        message: string;
        data: import("./user.model").User;
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
    signIn({ email, password }: AuthDto): Promise<{
        status: HttpStatus;
        message: string;
        data: {
            access_token: string;
        };
    }>;
    signOut(user: any): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
