import { IsDate, IsObject, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateUserDto {
  @IsOptional()
  @IsObject()
  _id?: Types.ObjectId;

  @IsOptional()
  @IsDate()
  createdAt?: string;

  @IsOptional()
  @IsString()
  passwordHash?: string | undefined;

  @IsOptional()
  @IsDate()
  updatedAt?: string;

  @IsOptional()
  @IsString()
  access_token?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  role?: string;
}
