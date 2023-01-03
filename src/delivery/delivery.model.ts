import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type DeliveryDocument = HydratedDocument<Delivery>;

@Schema({ _id: true, timestamps: true, versionKey: false })
export class Delivery {
  @Prop({ default: null })
  number: string;

  @Prop({ default: null, type: () => Object })
  owner: ObjectId;

  @Prop({ default: null })
  transporter: string;

  @Prop({ default: 0 })
  deliveryPrice: number;

  @Prop({ default: 'new' })
  status: 'new' | 'inRoad' | 'received' | 'shipped';

  @Prop({ default: 0 })
  contentTotalPrice: number;

  @Prop({ default: [], type: () => [Object] })
  content: ObjectId[];
}

export const DeliveryModel = SchemaFactory.createForClass(Delivery);
