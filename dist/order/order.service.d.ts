import { OrderDocument, Order } from './order.model';
import { CreateOrderDto } from './dto/order-create.dto';
import { Model } from 'mongoose';
export declare class OrderService {
    private readonly orderModel;
    constructor(orderModel: Model<OrderDocument>);
    findAll(): Promise<Order[]>;
    create(dto: CreateOrderDto): Promise<Order>;
    delete(id: string): Promise<Order | null>;
    updateById(id: string, dto: CreateOrderDto): Promise<Order | null>;
    findById(id: string): Promise<Order[]>;
    findByCreatorId(id: string): Promise<Order[]>;
    findByManagerId(id: string): Promise<Order[]>;
}
