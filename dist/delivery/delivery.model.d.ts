import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectId } from 'mongoose';
export interface DeliveryModel extends Base {
}
export declare class DeliveryModel extends TimeStamps {
    number: string;
    owner: ObjectId;
    transporter: string;
    deliveryPrice: number;
    status: 'new' | 'inRoad' | 'received' | 'shipped';
    contentTotalPrice: number;
    content: ObjectId[];
}
