import { OrderService } from './order.service';
import { OrderModel } from './order.model';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getAll(req: any): Promise<any>;
    create(dto: OrderModel, req: any): Promise<import("@typegoose/typegoose").DocumentType<OrderModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
}
