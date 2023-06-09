import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '../guards/AuthGuard.guard';
import { createAppResponse } from '../helpers/createAppResponse';
import { GetUser } from '../decorators/getUser.decorator';
import { IUserBaseDoc } from '../auth/user.model';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { SetUserRoleDto } from '../auth/dto/setUserRole.dto';
import { ROLE_UPDATE_ERROR, ROLE_UPDATE_SUCCESS } from '../auth/auth.constants';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('getAll')
  async _getAll() {
    const users = await this.authService.getAllUsers(
      '-access_token -passwordHash',
    );

    if (users.length === 0) {
      throw new HttpException('Not found any users', HttpStatus.NOT_FOUND);
    }

    return {
      status: HttpStatus.OK,
      message: 'All users',
      data: users,
    };
  }

  @Get('getById/:id')
  async _getUserById(@Param('id') id: string) {
    const user = await this.authService.getUserById(id);

    if (!user) {
      throw new HttpException('Not found any user', HttpStatus.NOT_FOUND);
    }

    return {
      status: HttpStatus.OK,
      message: 'Found user',
      data: user,
    };
  }
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
}
