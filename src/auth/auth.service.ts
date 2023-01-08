import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { genSaltSync, hash, compare } from 'bcryptjs';
import {
  USER_NOT_FOUND_ERROR,
  WRONG_CREDENTIALS_ERROR,
} from './auth.constants';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { SetUserRoleDto } from './dto/setUserRole.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('UserModel') private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async getCurrentUserInfo(email: string): Promise<User | null> {
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
    const updateData = {
      name: updateDto?.name,
      phone: updateDto?.phone,
    };

    const updatedUser = this.userModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return updatedUser;
  }

  async setUserRoleById(
    id: string,
    roleDto: SetUserRoleDto,
  ): Promise<User | null> {
    const updatedUser = this.userModel.findByIdAndUpdate(id, roleDto, {
      new: true,
    });

    return updatedUser;
  }

  async validateUser(email: string, password: string) {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }

    const isCorrectPassword = await compare(password, user.passwordHash);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_CREDENTIALS_ERROR);
    }

    return { email: user.email, role: user.role };
  }

  async login(email: string, role?: string) {
    const payload = { email, role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
