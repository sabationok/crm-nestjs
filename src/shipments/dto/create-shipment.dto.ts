import {
  IsArray,
  IsString,
  IsBoolean,
  IsObject,
  IsOptional,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Types } from 'mongoose';

export class IShipmentContent {
  @IsObject()
  _id?: Types.ObjectId;
  @IsString()
  sku?: string;
  @IsNumber()
  price?: number;
  @IsNumber()
  quantity?: number;
  @IsNumber()
  summ?: number;
}

export class ShipmentDto {
  @IsObject()
  @IsOptional()
  owner?: string;
  @IsObject()
  creator?: Types.ObjectId;
  @IsObject()
  updator?: Types.ObjectId;
  @IsString()
  @IsOptional()
  transporterName?: string;
  @IsString()
  @IsOptional()
  transporterCode?: string;
  @IsString()
  @IsOptional()
  ttn?: string;
  // @IsString()
  // @IsOptional()
  // @ValidateNested()
  // status?: 'new' | 'inWork' | 'shipped' | 'awaiting' | 'delivered' | 'received';
  // @IsString()
  // @IsOptional()
  // @ValidateNested()
  // type?: 'selfPickup' | 'courier' | 'shipping';
  // @IsNumber()
  // @IsOptional()
  // declaredValue?: number;
  // @IsNumber()
  // @IsOptional()
  // contentTotalValue?: number;
  // @IsNumber()
  // @IsOptional()
  // cost?: number;
  // @IsArray()
  // @IsOptional()
  // @ValidateNested()
  // content?: IShipmentContent[];
  // @IsString()
  // @IsOptional()
  // comment: string;
  // @IsString()
  // @IsOptional()
  // destination: string;
}
