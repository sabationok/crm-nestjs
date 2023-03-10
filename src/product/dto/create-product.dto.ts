import {
  IsArray,
  IsString,
  IsBoolean,
  IsObject,
  IsOptional,
} from 'class-validator';
import { ObjectId, Types } from 'mongoose';

export interface IProductPriceInfo {
  price?: number;
  cost?: number;
  currency?: string;
  sale?: number;
  isCommission?: boolean;
  cashbackId?: number;
}

export interface ICategory {
  _id: ObjectId;
  category: string;
  owner?: string;
  ownerName?: Types.ObjectId;
  section?: string;
  sectionName?: Types.ObjectId;
}

export interface IProductAvailabilityInfo {
  availability: 'available' | 'notAvailable' | 'awaiting';
  standartOrder?: boolean;
  standartOrderTime?: number;
  specialOrder?: boolean;
  specialOrderTime?: number;
}

export class CreateProductDto {
  @IsString()
  approvedStatus?: 'success' | 'pending' | 'reject';

  @IsBoolean()
  visibilityStatus?: boolean;

  @IsString()
  sku?: string;

  @IsString()
  name?: string;

  @IsString()
  brand?: string;

  @IsObject()
  priceInfo?: IProductPriceInfo;

  // @IsObject()
  // categoryInfo?: ICategory;

  @IsString()
  categoryId?: Types.ObjectId;

  @IsOptional()
  @IsObject()
  availabilityInfo?: IProductAvailabilityInfo;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  innerComment?: string;

  @IsOptional()
  @IsArray()
  images?: string[];
}

// @MinLength(32, {
//   message: 'EIC code must be at least 32 characters',
//   context: {
//     errorCode: 1003,
//     developerNote: 'The validated string must contain 32 or more characters.',
//   },
// })
