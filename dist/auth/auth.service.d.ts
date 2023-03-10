import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, Types } from 'mongoose';
import { TUserRoles, User, UserDocument, FindUser } from './user.model';
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    getAllUsers(projection?: string): Promise<FindUser[]>;
    getUserById(id: string | Types.ObjectId): Promise<FindUser | null>;
    findUserByEmail(email: string): Promise<FindUser | null>;
    getCurrentUserInfo(id: string): Promise<FindUser | null>;
    createUser(dto: AuthDto): Promise<User | null>;
    updateUserById(id: string, updateDto: UpdateUserDto): Promise<User | null>;
    setUserRoleById(id: string, role: TUserRoles): Promise<User | null>;
    validateUser(email: string, password: string): Promise<object | any>;
    logIn(_id?: string, role?: string, status?: string): Promise<User>;
    logOut(_id: string): Promise<User | null>;
}
