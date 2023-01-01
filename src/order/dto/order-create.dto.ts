import { IsArray, IsObject, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export interface IPaymentinfo {
  type: string;

  status: string;
}
export class CreateOrderDto {
  @IsString()
  number: string;

  @IsString()
  type: string;

  @IsString()
  status: string;

  @IsObject()
  payment: IPaymentinfo;

  @IsArray()
  content: ObjectId[];

  @IsArray()
  deliveries: ObjectId[];
}
