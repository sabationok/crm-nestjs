import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCategoryDto {
  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsObject()
  owner?: Types.ObjectId;

  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;
}
