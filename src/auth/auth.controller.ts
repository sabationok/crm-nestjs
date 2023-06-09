import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/decorators/getUser.decorator';
import { TelegramService } from 'src/telegram/telegram.service';
import {
  ALREADY_REGISTERED_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from './auth.constants';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { createAppResponse } from '../helpers/createAppResponse';
import { IUserBase, IUserBaseDoc } from './user.model';
import { JwtAuthGuard } from '../guards/JwtAuthGuard.guard';
import createHttpException from '../helpers/createHttpException';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly telegramService: TelegramService,
  ) {}

  @Get('getCurrent')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async getCurrentUserInfo(@GetUser() user: IUserBase) {
    const newUser: Partial<IUserBase> = user;

    return createAppResponse({
      statusCode: HttpStatus.OK,
      message: 'Current user info',
      data: {
        meta: {},
        data: newUser,
      },
    });
  }

  @Post('signUp')
  async register(@Body() dto: AuthDto) {
    const oldUser = await this.authService.findUserByEmail(dto.email);

    if (oldUser) {
      throw createHttpException({
        statusCode: HttpStatus.CONFLICT,
        message: ALREADY_REGISTERED_ERROR,
      });
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
  async signIn(@Body() { email, password }: AuthDto) {
    const loggedUser = await this.authService.logIn({ email, password });

    this.telegramService.sendMessage(`Авторизовано користувача: ${email} `);

    console.log('loggedUser', loggedUser);

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
