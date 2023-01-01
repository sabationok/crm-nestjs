import { IsBoolean, IsObject, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsObject()
  owner: ObjectId;

  @IsString()
  ownerName: string;

  @IsBoolean()
  isSection: boolean;
}
