import { IsObject, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class FindUserDto {
  @IsObject()
  userId?: Types.ObjectId;

  @IsString()
  email?: string;

  @IsString()
  login?: string;

  @IsString()
  role?: string;
}
