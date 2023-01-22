import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/guards/jwt.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('getAll')
  async getAll() {
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
  async getUserbyId(@Param('id') id: string) {
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
}
