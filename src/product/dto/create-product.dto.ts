import { IsArray, IsString, IsBoolean, IsObject } from 'class-validator';
import { ObjectId } from 'mongoose';

export interface IProductPriceInfo {
  price?: number;
  cost?: number;
  currency?: string;
  sale?: number;
  isCommission?: boolean;
}
export interface Section {
  id: ObjectId;
  name: string;
}
export interface Category {
  ownerId?: ObjectId;
  owner?: string;
  id: ObjectId;
  name: string;
}
export interface IProductCategoryInfo {
  section: Section;

  category: Category;
}
export interface IProductAvailabilityInfo {
  availability: 'available' | 'notAvailable' | 'awaiting';
  standartOrder?: boolean;
  standartOrderTime?: number;
  specialOrder?: boolean;
  specialOrderTime?: number;
}
export class CreateProductDto {
  @IsBoolean()
  isApproved?: boolean;

  @IsBoolean()
  isVisible?: boolean;

  @IsString()
  sku?: string;

  @IsString()
  name?: string;

  @IsString()
  brand?: string;

  @IsObject()
  priceInfo?: IProductPriceInfo;

  @IsObject()
  categoryInfo?: IProductCategoryInfo;

  @IsObject()
  availabilityInfo?: IProductAvailabilityInfo;

  @IsString()
  description?: string;

  @IsString()
  innerComment?: string;

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
