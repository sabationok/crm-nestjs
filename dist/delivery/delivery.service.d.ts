import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { DeliveryModel } from './delivery.model';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
export declare class DeliveryService {
    private readonly deliveryModel;
    constructor(deliveryModel: ModelType<DeliveryModel>);
    getHello(): Promise<string>;
    findAll(): Promise<DocumentType<any>>;
    create(dto: CreateDeliveryDto): Promise<DocumentType<DeliveryModel>>;
    delete(id: string): Promise<DocumentType<DeliveryModel> | null>;
    updateById(id: string, dto: CreateDeliveryDto): Promise<DocumentType<DeliveryModel> | null>;
    findById(id: string): Promise<DocumentType<DeliveryModel>[]>;
    findByOrderId(id: string): Promise<DocumentType<DeliveryModel>[]>;
}
