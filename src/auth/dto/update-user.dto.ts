import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;
}
