import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleModel } from './role.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Role.name,
        schema: RoleModel,
        collection: 'Products',
      },
    ]),
  ],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [],
})
export class RolesModule {}
