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
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.model';
import { FindUser, FindUserDocument } from './findUser.model';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('UserModel') private readonly userModel: Model<UserDocument>,
    @InjectModel('FindUserModel')
    private readonly findUserModel: Model<FindUserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async getAllUsers(): Promise<FindUser[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<FindUser | null> {
    return this.userModel.findById(id).exec();
  }

  async findUserByEmail(email: string): Promise<FindUser | null> {
    return this.findUserModel.findOne({ email }).exec();
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

    return { email: user.email, role: user.role, _id: user._id };
  }

  async logIn(email?: string, role?: string, _id?: Types.ObjectId) {
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

    return {
      access_token,
    };
  }

  async logOut(_id: string) {
    const userForLogOut = await this.getUserById(_id);

    return this.userModel.findByIdAndUpdate(
      _id,
      { access_token: '' },
      { new: true },
    );
  }
}
