import { HydratedDocument } from 'mongoose';
export declare type RefundDocument = HydratedDocument<Refund>;
export declare class Refund {
    name?: string;
    number?: string;
    status?: string;
}
export declare const RefundModel: import("mongoose").Schema<Refund, import("mongoose").Model<Refund, any, any, any>, any, any>;
