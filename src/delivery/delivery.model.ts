import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectId } from 'mongoose';

export interface DeliveryModel extends Base {}
export class DeliveryModel extends TimeStamps {
  @prop({ default: null })
  number: string;

  @prop({ default: null })
  owner: ObjectId;

  @prop({ default: null })
  transporter: string;

  @prop({ default: 0 })
  deliveryPrice: number;

  @prop({ default: 'new' })
  status: 'new' | 'inRoad' | 'received' | 'shipped';

  @prop({ default: 0 })
  contentTotalPrice: number;

  @prop({ default: [] })
  content: ObjectId[];
}
