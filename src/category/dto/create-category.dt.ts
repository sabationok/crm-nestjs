import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsObject()
  owner?: Types.ObjectId;

  @IsOptional()
  @IsString()
  ownerName?: string;

  @IsOptional()
  @IsObject()
  section?: Types.ObjectId;

  @IsOptional()
  @IsString()
  sectionName?: string;

  @IsOptional()
  @IsBoolean()
  isSection?: boolean;

  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;
}
