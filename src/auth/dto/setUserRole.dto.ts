import { IsString } from 'class-validator';
import { TUserRoles } from '../user.model';

export class SetUserRoleDto {
  @IsString()
  role: TUserRoles;
}
