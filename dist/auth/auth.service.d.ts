import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { SetUserRoleDto } from './dto/setUserRole.dto';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.model';
import { FindUser, FindUserDocument } from './findUser.model';
export declare class AuthService {
    private readonly userModel;
    private readonly findUserModel;
    private readonly jwtService;
    constructor(userModel: Model<UserDocument>, findUserModel: Model<FindUserDocument>, jwtService: JwtService);
    getAllUsers(): Promise<FindUser[]>;
    getUserById(id: string): Promise<FindUser | null>;
    findUserByEmail(email: string): Promise<FindUser | null>;
    getCurrentUserInfo(email: string): Promise<FindUser | null>;
    createUser(dto: AuthDto): Promise<User | null>;
    updateUserById(id: string, updateDto: UpdateUserDto): Promise<User | null>;
    setUserRoleById(id: string, roleDto: SetUserRoleDto): Promise<User | null>;
    validateUser(email: string, password: string): Promise<{
        email: string;
        role: import("./user.model").TUserRoles | undefined;
        _id: Types.ObjectId | undefined;
    }>;
    logIn(email?: string, role?: string, _id?: Types.ObjectId): Promise<{
        access_token: string;
    }>;
    logOut(_id: string): Promise<(import("mongoose").Document<unknown, any, User> & User & {
        _id: Types.ObjectId;
    } & {
        _id: Types.ObjectId;
    }) | null>;
}
