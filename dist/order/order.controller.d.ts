import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order-create.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getAll(req: any): Promise<import("./order.model").Order[]>;
    create(dto: CreateOrderDto, req: any): Promise<{
        message: string;
        data: import("./order.model").Order;
    }>;
}
