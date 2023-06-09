import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RouteAction, RouteActions } from '../decorators/RouteAction.decorator';
import { AuthGuard } from '../guards/AuthGuard.guard';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { GetUser } from '../decorators/getUser.decorator';
import { User } from '../auth/user.model';

@Controller('permissions')
@UseGuards(AuthGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}
  @Post('create')
  @RouteAction(RouteActions.CREATE_PERMISSION)
  async create(@Body() body: CreatePermissionDto, @GetUser() user: User) {
    return this.permissionsService.create('testCompanyId', body);
  }
}
