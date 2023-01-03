import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  Query,
  ValidationPipe,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/decorators/getUser.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guards';

import { ALREADY_REGISTERED_ERROR } from './auth.constants';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SetUserRoleDto } from './dto/setUserRole.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('getAllUsers')
  async getAll() {
    return this.authService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('getUserById')
  async getUserById(@Query('userId') userId: string) {
    const result = await this.authService.getUserById(userId);

    return { status: HttpStatus.OK, data: result, message: 'Found user' };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('updateUserById/:id')
  async updateUserById(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserDto,
  ) {
    const result = await this.authService.updateUserById(id, updateDto);

    if (!result) {
      throw new HttpException(
        'Not found user for update ',
        HttpStatus.NOT_FOUND,
      );
    }
    return { status: HttpStatus.OK, data: result, message: 'Updating success' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('getCurrentUser')
  async getCurrentUser(@GetUser() user: any) {
    return {
      status: HttpStatus.OK,
      data: user,
      message: 'Current user',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('getCurrentUserInfo')
  async getCurrentUserInfo(@GetUser() user: any) {
    const result = await this.authService.getCurrentUserInfo(user.email);

    if (!result) {
      throw new HttpException('', HttpStatus.NOT_FOUND);
    }

    const userInfo = {
      status: result?.status,
      role: result?.role,
      email: result?.email,
      name: result?.name,
      phone: result?.phone,
    };

    const managerInfo = {
      ...userInfo,
      vendors: result?.vendors,
    };
    return {
      status: HttpStatus.OK,
      data: result?.role === 'MANAGER' ? managerInfo : userInfo,
      message: 'Current user info',
    };
  }

  @Patch('setUserRoleById/:id')
  async setUserRoleById(
    @Param('id') id: string,
    @Body() roleDto: SetUserRoleDto,
  ) {
    const result = await this.authService.setUserRoleById(id, roleDto);

    if (!result) {
      throw new HttpException(
        'Not found user for update ',
        HttpStatus.NOT_FOUND,
      );
    }
    return { status: HttpStatus.OK, data: result, message: 'Updating success' };
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto) {
    const oldUser = await this.authService.findUserByEmail(dto.email);

    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }
    return this.authService.createUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() { email, password }: AuthDto) {
    const validatedUser = await this.authService.validateUser(email, password);

    if (!validatedUser) {
      throw new HttpException('', HttpStatus.UNAUTHORIZED);
    }

    return this.authService.login(email, validatedUser.role);
  }
}
