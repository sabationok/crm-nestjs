import { HydratedDocument, ObjectId } from 'mongoose';
export declare type DeliveryDocument = HydratedDocument<Delivery>;
export declare class Delivery {
    number: string;
    owner: ObjectId;
    transporter: string;
    deliveryPrice: number;
    status: 'new' | 'inRoad' | 'received' | 'shipped';
    contentTotalPrice: number;
    content: ObjectId[];
}
export declare const DeliveryModel: import("mongoose").Schema<Delivery, import("mongoose").Model<Delivery, any, any, any>, any, any>;
