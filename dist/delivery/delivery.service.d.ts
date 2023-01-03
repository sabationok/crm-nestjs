import { Model } from 'mongoose';
import { Delivery, DeliveryDocument } from './delivery.model';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
export declare class DeliveryService {
    private readonly deliveryModel;
    constructor(deliveryModel: Model<DeliveryDocument>);
    findAll(): Promise<Delivery[]>;
    create(dto: CreateDeliveryDto): Promise<Delivery>;
    delete(id: string): Promise<Delivery | null>;
    updateById(id: string, dto: CreateDeliveryDto): Promise<Delivery | null>;
    findById(id: string): Promise<Delivery[]>;
    findByOrderId(id: string): Promise<Delivery[]>;
}
