import { prop } from '@typegoose/typegoose';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateDeliveryDto {
  @IsString()
  number: string;

  @IsObject()
  owner: ObjectId;

  @IsNumber()
  deliveryPrice: number;

  @prop()
  transporter: string;

  @IsString()
  status: string;

  @IsNumber()
  contentTotalPrice: number;

  @IsArray()
  @ValidateNested()
  @IsObject({ each: true })
  content: ObjectId[];
}