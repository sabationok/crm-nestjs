import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePermissionDto {
  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  user?: Types.ObjectId;

  @IsString()
  company?: Types.ObjectId;

  @IsString()
  role?: Types.ObjectId;

  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;
}
