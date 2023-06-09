import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { compare, genSaltSync, hash } from 'bcryptjs';
import {
  USER_NOT_FOUND_ERROR,
  WRONG_CREDENTIALS_ERROR,
} from './auth.constants';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { TUserRoles, User, UserDocument } from './user.model';
import createError from '../helpers/createError';

export interface IBase {
  _id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserBase extends IBase {
  email?: string;
  passwordHash?: string;
  login?: string;
  name?: string;
  phone?: string;
  role?: TUserRoles;
  status?: string;
  manager?: { vendors?: Types.ObjectId[] };
  vendor?: { manager?: Types.ObjectId };
  access_token?: string;
}

export interface IUserBaseDoc extends HydratedDocument<IUserBase> {}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async getAllUsers(projection?: string): Promise<UserDocument[]> {
    return this.userModel.find({}, projection);
  }

  async getUserById(id: string | Types.ObjectId): Promise<IUserBaseDoc | null> {
    return this.userModel.findById(id).populate({ path: 'vendor' }).exec();
  }

  async findUserByEmail(email: string): Promise<IUserBaseDoc | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async getCurrentUserInfo(id: string): Promise<IUserBaseDoc | null> {
    return this.userModel.findById(id, '-passwordHash -access_token');
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

    if (!user || !user.passwordHash) {
      throw createError({
        statusCode: HttpStatus.NOT_FOUND,
        reason: USER_NOT_FOUND_ERROR,
      });
    }

    const isCorrectPassword = await compare(password, user.passwordHash);

    if (!isCorrectPassword) {
      throw createError({
        statusCode: HttpStatus.UNAUTHORIZED,
        reason: WRONG_CREDENTIALS_ERROR,
      });
    }

    return user;
  }

  async logIn(_id?: string, role?: string, status?: string): Promise<User> {
    const payload = { _id, role, status };

    console.log('payload', payload);

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
