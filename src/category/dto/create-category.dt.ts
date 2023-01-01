import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsObject()
  owner?: ObjectId;

  @IsOptional()
  @IsString()
  ownerName?: string;

  @IsOptional()
  @IsBoolean()
  isSection?: boolean;
}
