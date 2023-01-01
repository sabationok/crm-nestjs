import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './user.model';
import { genSaltSync, hash, compare } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { SetUserRoleDto } from './dto/setUserRole.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async getAllUsers() {
    return this.userModel.find().exec();
  }

  async getUserById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async getCurrentUserInfo(email: string) {
    return this.findUserByEmail(email);
  }

  async createUser(dto: AuthDto) {
    const salt = genSaltSync(10);

    const newUser = new this.userModel({
      email: dto.email,
      passwordHash: await hash(dto.password, salt),
    });

    return newUser.save();
  }

  async updateUserById(id: string, updateDto: UpdateUserDto) {
    const updateData = {
      name: updateDto?.name,
      phone: updateDto?.phone,
    };

    const updatedUser = this.userModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return updatedUser;
  }

  async setUserRoleById(id: string, roleDto: SetUserRoleDto) {
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
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }

    return { email: user.email, role: user.role };
  }

  async login(email: string, role: string) {
    const payload = { email, role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
