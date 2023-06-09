import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, Types } from 'mongoose';
import { IUserBaseDoc, TUserRoles, User, UserDocument } from './user.model';
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    getAllUsers(projection?: string): Promise<UserDocument[]>;
    getUserById(id: string | Types.ObjectId): Promise<IUserBaseDoc | null>;
    findUserByEmail(email: string): Promise<IUserBaseDoc | null>;
    getCurrentUserInfo(id: string): Promise<IUserBaseDoc | null>;
    createUser(dto: AuthDto): Promise<User | null>;
    updateUserById(id: string, updateDto: UpdateUserDto): Promise<User | null>;
    setUserRoleById(id: string, role: TUserRoles): Promise<User | null>;
    validateUser(email: string, password: string): Promise<object | any>;
    logIn(_id?: string, role?: string, status?: string): Promise<User>;
    logOut(_id: string): Promise<User | null>;
}
