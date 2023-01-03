import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RefundDocument = HydratedDocument<Refund>;

@Schema({ _id: true, timestamps: true, versionKey: false })
export class Refund {
  @Prop()
  name?: string;

  @Prop()
  number?: string;

  @Prop()
  status?: string;
}

export const RefundModel = SchemaFactory.createForClass(Refund);
