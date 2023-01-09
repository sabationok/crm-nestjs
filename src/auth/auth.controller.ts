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
  Req,
} from '@nestjs/common';
import { GetUser } from 'src/decorators/getUser.decorator';
import { UserRequest } from 'src/decorators/request.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guards';
import { UserStorage } from 'src/helpers/userStorage.helper';
import { TelegramService } from 'src/telegram/telegram.service';
import {
  ALREADY_REGISTERED_ERROR,
  LOGIN_SUCCESS,
  UNAUTHORIZED_USER,
  LOGOUT_SUCCESS,
  ROLE_UPDATE_SUCCESS,
  ROLE_UPDATE_ERROR,
  LOGOUT_ERROR,
} from './auth.constants';
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

  @UsePipes(new ValidationPipe())
  // @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get('getCurrentUser')
  async getCurrentUser(@GetUser() user: any, @Req() req: any) {
    const currentUser = await this.authService.getUserById(user._id);

    const data = { ...user, status: currentUser?.status };

    return {
      status: HttpStatus.OK,
      message: 'Current user',
      data: req.userInfo,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('getCurrentUserInfo')
  async getCurrentUserInfo(@GetUser() user: any) {
    const userInfo = await this.authService.getCurrentUserInfo(user.email);

    if (!userInfo) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const addInfo: any = {
      _id: userInfo?._id,
      status: userInfo?.status,
      role: userInfo?.role,
      email: userInfo?.email,
      name: userInfo?.name,
      phone: userInfo?.phone,
      user,
    };

    if (addInfo?.role === 'MANAGER') {
      addInfo.managerInfo = user?.manager;
    }
    if (userInfo?.role === 'VENDOR') {
      addInfo.venroInfo = user?.vendor;
    }
    return {
      status: HttpStatus.OK,
      message: 'Current user info',
      data: { userInfo, addInfo },
    };
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
  async signIn(@Body() { email, password }: AuthDto, @Req() req: any) {
    const result = await this.authService.validateUser(email, password);

    if (!result) {
      throw new HttpException(UNAUTHORIZED_USER, HttpStatus.UNAUTHORIZED);
    }

    const loggedUser = await this.authService.logIn(
      email,
      result.role,
      result._id,
    );

    req.loggedUser = loggedUser;

    await this.telegramService.sendMessage(
      `Авторизовано користувача: ${email} `,
    );

    return {
      status: HttpStatus.OK,
      message: LOGIN_SUCCESS,
      data: {
        access_token: loggedUser.access_token,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
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
