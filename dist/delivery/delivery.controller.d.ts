import { DeliveryModel } from './delivery.model';
import { DeliveryService } from './delivery.service';
export declare class DeliveryController {
    private readonly deliveryServise;
    constructor(deliveryServise: DeliveryService);
    getAll(req: any): Promise<any>;
    getByOderId(id: string): Promise<import("@typegoose/typegoose").DocumentType<DeliveryModel, import("@typegoose/typegoose/lib/types").BeAnObject>[]>;
    create(dto: DeliveryModel, req: any): Promise<import("@typegoose/typegoose").DocumentType<DeliveryModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
}
