import {
  IsArray,
  IsString,
  IsBoolean,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';
import {
  IProductAvailabilityInfo,
  IProductPriceInfo,
} from './create-product.dto';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  approvedStatus?: 'success' | 'pending' | 'reject';

  @IsOptional()
  @IsBoolean()
  visibilityStatus?: boolean;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  priceInfo?: IProductPriceInfo;

  @IsOptional()
  @IsString()
  categoryId?: Types.ObjectId;

  @IsOptional()
  @IsObject()
  @ValidateNested()
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
