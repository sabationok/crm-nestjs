import { IsArray, IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsBoolean()
  isApproved?: boolean;

  @IsBoolean()
  isVisible?: boolean;

  @IsString()
  createdByAuthorName?: string;

  @IsString()
  createdByAuthorId?: string;

  @IsString()
  createdByAuthorType?: string;

  @IsString()
  updatedByAuthorName?: string;

  @IsString()
  updatedByAuthorId?: string;

  @IsString()
  updatedByAuthorType?: string;

  @IsString()
  name?: string;

  @IsString()
  brand?: string;

  @IsNumber()
  price?: number;

  @IsNumber()
  cost?: number;

  @IsString()
  currency?: string;

  @IsNumber()
  sale?: number;

  @IsString()
  sectionId?: string;

  @IsString()
  section?: string;

  @IsString()
  parentCategoryId?: string;

  @IsString()
  parentCategory?: string;

  @IsString()
  categoryId?: string;

  @IsString()
  category?: string;

  @IsString()
  availability?: string;

  @IsString()
  description?: string;

  @IsString()
  innerComment?: string;

  @IsArray()
  images?: string[];
}
