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
    getAll(): Promise<import("./user.model").User[]>;
    getUserById(userId: string): Promise<{
        status: HttpStatus;
        data: import("./user.model").User | null;
        message: string;
    }>;
    updateUserById(id: string, updateDto: UpdateUserDto): Promise<{
        status: HttpStatus;
        data: import("./user.model").User;
        message: string;
    }>;
    getCurrentUser(user: any): Promise<{
        status: HttpStatus;
        data: any;
        message: string;
    }>;
    getCurrentUserInfo(user: any): Promise<{
        status: HttpStatus;
        data: {
            status: import("./user.model").TUserStatus;
            role: import("./user.model").TUserRoles;
            email: string;
            name: string;
            phone: string;
        };
        message: string;
    }>;
    setUserRoleById(id: string, roleDto: SetUserRoleDto): Promise<{
        status: HttpStatus;
        data: import("./user.model").User;
        message: string;
    }>;
    register(dto: AuthDto): Promise<{
        status: HttpStatus;
        message: string;
        newUser: import("./user.model").User | null;
    }>;
    login({ email, password }: AuthDto): Promise<{
        status: HttpStatus;
        message: string;
        loginDdata: {
            access_token: string;
        };
    }>;
}
