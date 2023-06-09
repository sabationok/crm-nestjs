import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdatePermissionDto {
  @IsOptional()
  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  owner?: Types.ObjectId;

  @IsOptional()
  @IsString()
  user?: Types.ObjectId;

  @IsOptional()
  @IsString()
  company?: Types.ObjectId;

  @IsOptional()
  @IsString()
  role?: Types.ObjectId;

  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;
}
