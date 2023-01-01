import { ObjectId } from 'mongoose';
export declare class CreateDeliveryDto {
    number: string;
    owner: ObjectId;
    deliveryPrice: number;
    transporter: string;
    status: string;
    contentTotalPrice: number;
    content: ObjectId[];
}
