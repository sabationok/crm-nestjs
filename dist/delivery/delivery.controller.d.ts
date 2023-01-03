import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
export declare class DeliveryController {
    private readonly deliveryServise;
    constructor(deliveryServise: DeliveryService);
    getAll(req: any): Promise<import("./delivery.model").Delivery[]>;
    getByOderId(id: string): Promise<import("./delivery.model").Delivery[]>;
    create(dto: CreateDeliveryDto, req: any): Promise<import("./delivery.model").Delivery>;
}
