import { IsObject, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ShipmentDto } from './create-shipment.dto';

export class FindShipmentDto extends ShipmentDto {
  @IsObject()
  _id?: Types.ObjectId;

  @IsString()
  createdAt: Date;

  @IsString()
  updatedAt: Date;
}
