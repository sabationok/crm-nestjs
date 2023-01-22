import { HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order-create.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getAll(): Promise<import("./order.model").Order[]>;
    getShimentsByOrderId(id: string): Promise<{
        status: HttpStatus;
        message: string;
        data: import("./order.model").Order & import("mongoose").Document<any, any, any> & {
            _id: any;
        };
    }>;
    addSipmentToOrder(id: string): Promise<void>;
    create(dto: CreateOrderDto): Promise<{
        status: HttpStatus;
        message: string;
        data: import("./order.model").Order;
    }>;
}
