import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
export declare type RefundDocument = HydratedDocument<Refund>;
export declare class Refund {
    name?: string;
    number?: string;
    status?: string;
}
export declare const RefundModel: mongoose.Schema<Refund, mongoose.Model<Refund, any, any, any>, any, any>;
