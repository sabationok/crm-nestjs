import { IsObject, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class FindUserDto {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  login?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsObject()
  _id?: Types.ObjectId;

  @IsOptional()
  @IsString()
  access_token?: string;
}
