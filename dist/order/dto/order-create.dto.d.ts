import { ObjectId } from 'mongoose';
export interface IPaymentinfo {
    type: string;
    status: string;
}
export declare class CreateOrderDto {
    number: string;
    type: string;
    status: string;
    payment: IPaymentinfo;
    content: ObjectId[];
    deliveries: ObjectId[];
}
