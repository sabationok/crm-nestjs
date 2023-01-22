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
    getAll(): Promise<{
        status: HttpStatus;
        message: string;
        data: import("./user.model").FindUser[];
    }>;
    getUserById(userId: string): Promise<{
        status: HttpStatus;
        message: string;
        data: import("./user.model").FindUser | null;
    }>;
    updateUserById(id: string, updateDto: UpdateUserDto): Promise<{
        status: HttpStatus;
        message: string;
        data: import("./user.model").User;
    }>;
    setUserRoleById(id: string, roleDto: SetUserRoleDto): Promise<{
        status: HttpStatus;
        message: string;
        data: {
            email: string;
            role: import("./user.model").TUserRoles | undefined;
        };
    }>;
    getCurrentUser(user: any, req: any): Promise<{
        status: HttpStatus;
        message: string;
        data: any;
    }>;
    getCurrentUserInfo(user: any): Promise<{
        status: HttpStatus;
        message: string;
        data: import("./user.model").FindUser;
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
    signIn({ email, password }: AuthDto, req: any): Promise<{
        status: HttpStatus;
        message: string;
        data: {
            access_token: string | undefined;
        };
    }>;
    signOut(user: any): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
