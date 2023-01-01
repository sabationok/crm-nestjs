import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { OrderModel } from './order.model';
import { CreateOrderDto } from './dto/order-create.dto';
export declare class OrderService {
    private readonly orderModel;
    constructor(orderModel: ModelType<OrderModel>);
    getHello(): Promise<string>;
    findAll(): Promise<DocumentType<any>>;
    create(dto: CreateOrderDto): Promise<DocumentType<OrderModel>>;
    delete(id: string): Promise<DocumentType<OrderModel> | null>;
    updateById(id: string, dto: CreateOrderDto): Promise<DocumentType<OrderModel> | null>;
    findById(id: string): Promise<DocumentType<OrderModel>[]>;
    findByCreatorId(id: string): Promise<DocumentType<OrderModel>[]>;
    findByManagerId(id: string): Promise<DocumentType<OrderModel>[]>;
}
