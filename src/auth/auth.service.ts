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
import { Model, Types } from 'mongoose';
import { IUserBaseDoc, TUserRoles, User, UserDocument } from './user.model';
import createHttpException from '../helpers/createHttpException';

export interface ITokenPayload {
  _id: string;
  role?: string;
  status?: string;
}

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
    return this.userModel.findById(id, '-passwordHash -access_token').exec();
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

  async validateUserByBearerToken(bearerToken: string) {
    const [bearer, token] = bearerToken.split(' ');
    if (bearer !== 'Bearer') {
      throw createHttpException({ statusCode: HttpStatus.UNAUTHORIZED });
    }

    const { _id } = this.jwtService.verify<ITokenPayload>(token);

    const user = await this.getUserById(_id);

    if (!user || !user.access_token || user.access_token !== token) {
      console.log('JwtAuthGuard: Access denied.');
      throw createHttpException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Користувач не знайдений',
        innerCode: HttpStatus.NOT_FOUND,
      });
    }
    return user;
  }

  async validateUser(email: string, password: string): Promise<IUserBaseDoc> {
    const user = await this.findUserByEmail(email);

    if (!user || !user.passwordHash) {
      throw createHttpException({
        statusCode: HttpStatus.NOT_FOUND,
        reason: USER_NOT_FOUND_ERROR,
      });
    }

    const isCorrectPassword = await compare(password, user.passwordHash);

    if (!isCorrectPassword) {
      throw createHttpException({
        statusCode: HttpStatus.UNAUTHORIZED,
        reason: WRONG_CREDENTIALS_ERROR,
      });
    }

    return user;
  }

  async logIn(dto: AuthDto): Promise<IUserBaseDoc> {
    const result = await this.validateUser(dto.email, dto.password);

    const payload: ITokenPayload = {
      _id: result._id.toString(),
      status: result.status,
      role: result.role,
    };

    const access_token = await this.jwtService.signAsync(payload);

    const loggedUser = await this.userModel.findByIdAndUpdate(
      payload._id,
      { access_token },
      { new: true },
    );

    if (!loggedUser) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }

    return loggedUser;
  }

  async logOut(_id: string): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(
      _id,
      { access_token: '' },
      { new: true },
    );
  }
}
