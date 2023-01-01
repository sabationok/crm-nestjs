import { ModelType } from '@typegoose/typegoose/lib/types';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './user.model';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { SetUserRoleDto } from './dto/setUserRole.dto';
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    constructor(userModel: ModelType<UserModel>, jwtService: JwtService);
    getAllUsers(): Promise<(import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getUserById(id: string): Promise<(import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    findUserByEmail(email: string): Promise<(import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    getCurrentUserInfo(email: string): Promise<(import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    createUser(dto: AuthDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateUserById(id: string, updateDto: UpdateUserDto): Promise<(import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    setUserRoleById(id: string, roleDto: SetUserRoleDto): Promise<(import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    validateUser(email: string, password: string): Promise<{
        email: string;
        role: import("./user.model").TUserRoles;
    }>;
    login(email: string, role: string): Promise<{
        access_token: string;
    }>;
}
