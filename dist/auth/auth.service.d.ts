import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { SetUserRoleDto } from './dto/setUserRole.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    getCurrentUserInfo(email: string): Promise<User | null>;
    createUser(dto: AuthDto): Promise<User | null>;
    updateUserById(id: string, updateDto: UpdateUserDto): Promise<User | null>;
    setUserRoleById(id: string, roleDto: SetUserRoleDto): Promise<User | null>;
    validateUser(email: string, password: string): Promise<{
        email: string;
        role: import("./user.model").TUserRoles;
    }>;
    login(email: string, role: string): Promise<{
        access_token: string;
    }>;
}
