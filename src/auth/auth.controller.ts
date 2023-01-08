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
import { UserRequest } from 'src/decorators/request.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guards';
import { TelegramService } from 'src/telegram/telegram.service';

import { ALREADY_REGISTERED_ERROR } from './auth.constants';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SetUserRoleDto } from './dto/setUserRole.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly telegramService: TelegramService,
  ) {}

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
      message: 'Current user',
      data: user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('getCurrentUserInfo')
  async getCurrentUserInfo(@GetUser() user: any, @UserRequest() req: any) {
    const result = await this.authService.getCurrentUserInfo(user.email);

    if (!result) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const userInfo: any = {
      status: result?.status,
      role: result?.role,
      email: result?.email,
      name: result?.name,
      phone: result?.phone,
    };

    if (result?.role === 'MANAGER') {
      userInfo.managerInfo = result?.manager;
    }
    if (result?.role === 'VENDOR') {
      userInfo.venroInfo = result?.vendor;
    }
    return {
      status: HttpStatus.OK,
      message: 'Current user info',
      data: userInfo,
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
    return { status: HttpStatus.OK, message: 'Updating success', data: result };
  }

  @UsePipes(new ValidationPipe())
  @Post('signUp')
  async register(@Body() dto: AuthDto) {
    const oldUser = await this.authService.findUserByEmail(dto.email);

    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }
    const newUser = await this.authService.createUser(dto);

    await this.telegramService.sendMessage(
      `Зареєстровано нового користувача: ${newUser}`,
    );
    return { status: HttpStatus.OK, message: 'New user rigister', newUser };
  }

  @UsePipes(new ValidationPipe())
  @Post('signUpByAdmin')
  async registerByAdmin(@Body() dto: AuthDto) {
    console.log(dto);
    const oldUser = await this.authService.findUserByEmail(dto.email);

    if (oldUser) {
      throw new HttpException(ALREADY_REGISTERED_ERROR, HttpStatus.CONFLICT);
    }
    const newUser = await this.authService.createUser(dto);

    await this.telegramService.sendMessage(
      `Зареєстровано нового користувача адміністратором: ${newUser}`,
    );
    return { status: HttpStatus.OK, message: 'New user rigister', newUser };
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('signIn')
  async login(@Body() { email, password }: AuthDto) {
    const result = await this.authService.validateUser(email, password);

    if (!result) {
      throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED);
    }

    const loginData = await this.authService.login(email);

    await this.telegramService.sendMessage(
      `Авторизовано користувача: ${email}`,
    );

    return { status: HttpStatus.OK, message: 'Login success', data: loginData };
  }
}
