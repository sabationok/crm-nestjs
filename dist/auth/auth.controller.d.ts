/// <reference types="mongoose" />
import { HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SetUserRoleDto } from './dto/setUserRole.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAll(): Promise<(import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./user.model").UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getUserById(userId: string): Promise<{
        status: HttpStatus;
        data: (import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./user.model").UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
            _id: import("mongoose").Types.ObjectId;
        }) | null;
        message: string;
    }>;
    updateUserById(id: string, updateDto: UpdateUserDto): Promise<{
        status: HttpStatus;
        data: import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./user.model").UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
            _id: import("mongoose").Types.ObjectId;
        };
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
            _id: import("mongoose").Types.ObjectId;
            createdAt: Date | undefined;
            updatedAt: Date | undefined;
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
        data: import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./user.model").UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
    }>;
    register(dto: AuthDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./user.model").UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    login({ email, password }: AuthDto): Promise<{
        access_token: string;
    }>;
}
