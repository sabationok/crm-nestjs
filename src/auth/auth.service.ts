import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { genSaltSync, hash, compare } from 'bcryptjs';
import {
  USER_NOT_FOUND_ERROR,
  WRONG_CREDENTIALS_ERROR,
} from './auth.constants';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TUserRoles, User, UserDocument } from './user.model';
import { FindUser } from './findUser.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('UserModel') private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async getAllUsers(): Promise<FindUser[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: string | Types.ObjectId): Promise<FindUser | null> {
    return this.userModel.findById(id).exec();
  }

  async findUserByEmail(email: string): Promise<FindUser | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async getCurrentUserInfo(email: string): Promise<FindUser | null> {
    return this.findUserByEmail(email);
  }

  async createUser(dto: AuthDto): Promise<User | null> {
    const salt = genSaltSync(10);

    const newUser = new this.userModel({
      email: dto.email,
      passwordHash: await hash(dto.password, salt),
    });

    return newUser.save();
  }

  async updateUserById(
    id: string,
    updateDto: UpdateUserDto,
  ): Promise<User | null> {
    const updatedUser = this.userModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    });

    return updatedUser;
  }

  async setUserRoleById(id: string, role: TUserRoles): Promise<User | null> {
    const updatedUser = this.userModel.findByIdAndUpdate(
      id,
      { role },
      { new: true },
    );

    return updatedUser;
  }

  async validateUser(email: string, password: string): Promise<object | any> {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }

    const isCorrectPassword = await compare(password, user.passwordHash);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_CREDENTIALS_ERROR);
    }

    return { email: user.email, role: user.role, _id: user._id };
  }

  async logIn(
    email?: string,
    role?: string,
    _id?: Types.ObjectId,
  ): Promise<User> {
    const payload = { role, _id };

    const access_token = await this.jwtService.signAsync(payload);

    const logedUser = await this.userModel.findByIdAndUpdate(
      _id,
      { access_token },
      { new: true },
    );

    if (!logedUser) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }

    return logedUser;
  }

  async logOut(_id: string): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(
      _id,
      { access_token: '' },
      { new: true },
    );
  }
}
