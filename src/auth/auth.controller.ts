import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/decorators/getUser.decorator';
import { TelegramService } from 'src/telegram/telegram.service';
import {
  ALREADY_REGISTERED_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  ROLE_UPDATE_ERROR,
  ROLE_UPDATE_SUCCESS,
  UNAUTHORIZED_USER,
} from './auth.constants';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SetUserRoleDto } from './dto/setUserRole.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../guards/AuthGuard.guard';
import { createAppResponse } from '../helpers/createAppResponse';
import { IUserBaseDoc } from './user.model';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly telegramService: TelegramService,
  ) {}

  @Get('getAllUsers')
  @UseGuards(AuthGuard)
  async getAll() {
    const users = await this.authService.getAllUsers();
    return createAppResponse({
      statusCode: HttpStatus.OK,
      message: 'All users',
      data: {
        meta: {},
        data: users,
      },
    });
  }

  @Get('getUserById')
  @UseGuards(AuthGuard)
  async getUserById(@GetUser() user: IUserBaseDoc) {
    return createAppResponse({
      statusCode: HttpStatus.OK,
      message: 'Found user',
      data: {
        meta: {},
        data: user,
      },
    });
  }
  @Patch('updateUserById/:id')
  @UseGuards(AuthGuard)
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
    return createAppResponse({
      statusCode: HttpStatus.OK,
      message: 'Updating success',
      data: {
        meta: {},
        data: result,
      },
    });
  }

  @Patch('setUserRoleById/:id')
  async setUserRoleById(
    @Param('id') id: string,
    @Body() roleDto: SetUserRoleDto,
  ) {
    const userForUpdate = await this.authService.getUserById(id);

    if (userForUpdate?.role === roleDto?.role) {
      throw new HttpException(ROLE_UPDATE_ERROR, HttpStatus.NOT_FOUND);
    }

    const updatedUser = await this.authService.setUserRoleById(
      id,
      roleDto?.role,
    );

    if (!updatedUser) {
      throw new HttpException(
        ROLE_UPDATE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const data = {
      email: updatedUser?.email,
      role: updatedUser?.role,
    };

    return {
      status: HttpStatus.OK,
      message: ROLE_UPDATE_SUCCESS(updatedUser?.email, updatedUser?.role),
      data,
    };
  }

  @Get('getCurrent')
  @UseGuards(AuthGuard)
  async getCurrentById(@GetUser() { access_token, email }: IUserBaseDoc) {
    return createAppResponse({
      statusCode: HttpStatus.OK,
      message: 'Found user',
      data: {
        meta: {},
        data: { access_token, email },
      },
    });
  }

  @Get('getCurrentUserInfo')
  async getCurrentUserInfo(@GetUser() user: any) {
    const userInfo = await this.authService.getCurrentUserInfo(user._id);

    if (!userInfo) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return {
      status: HttpStatus.OK,
      message: 'Current user info',
      data: userInfo,
    };
  }

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

  @Post('signUpByAdmin')
  async registerByAdmin(@Body() dto: AuthDto) {
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

  @Post('signIn')
  async signIn(@Body() { email, password }: AuthDto, @Req() req: any) {
    const result = await this.authService.validateUser(email, password);

    if (!result) {
      throw new HttpException(UNAUTHORIZED_USER, HttpStatus.UNAUTHORIZED);
    }

    const loggedUser = await this.authService.logIn(
      result._id,
      result.role,
      result.status,
    );

    this.telegramService.sendMessage(`Авторизовано користувача: ${email} `);

    console.log('loggedUser', result);

    return createAppResponse({
      statusCode: HttpStatus.OK,
      message: LOGIN_SUCCESS,
      data: {
        meta: {},
        data: { access_token: loggedUser.access_token },
      },
    });
  }

  @HttpCode(200)
  @Post('signOut')
  async signOut(@GetUser() user: any) {
    const logOutUser = await this.authService.logOut(user._id);

    await this.telegramService.sendMessage(
      `Користувач завершив сеанс (${logOutUser?.email})`,
    );

    return { status: HttpStatus.OK, message: LOGOUT_SUCCESS };
  }
}
