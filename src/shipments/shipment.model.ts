import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Document } from 'mongoose';
import { User } from 'src/auth/user.model';

// export type ShipmentDocument = HydratedDocument<Shipment>;
export type ShipmentDocument = Shipment & Document;

@Schema({ _id: false, timestamps: false, versionKey: false })
export class ShipmentContent {
  @Prop({ type: Types.ObjectId })
  _id?: Types.ObjectId;
  @Prop()
  sku?: string;
  @Prop()
  price?: number;
  @Prop()
  quantity?: number;
  @Prop()
  summ?: number;
}

@Schema({ _id: true, timestamps: true, versionKey: false })
export class Shipment {
  @Prop({ type: Types.ObjectId, ref: 'Order' })
  owner?: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: User.name })
  creator?: User;
  // @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  // updator?: Types.ObjectId;
  // @Prop()
  // number?: string;
  @Prop()
  transporterName?: string;
  @Prop()
  transporterCode?: string;
  @Prop()
  ttn?: string;
  // @Prop({ default: 'new' })
  // status?: 'new' | 'inWork' | 'shipped' | 'awaiting' | 'delivered' | 'received';
  // @Prop({ default: 'selfPickup' })
  // type?: 'selfPickup' | 'courier' | 'shipping';
  // @Prop()
  // declaredValue?: number;
  // @Prop()
  // contentTotalValue?: number;
  // @Prop()
  // cost?: number;
  // @Prop()
  // content?: ShipmentContent[];
  // @Prop()
  // comment: string;
  // @Prop()
  // destination: string;
}

export const ShipmentModel = SchemaFactory.createForClass(Shipment);
