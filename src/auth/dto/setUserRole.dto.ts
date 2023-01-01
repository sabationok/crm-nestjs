import { IsString } from 'class-validator';

export class SetUserRoleDto {
  @IsString()
  role: string;
}
