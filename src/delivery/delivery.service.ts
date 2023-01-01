import { Injectable } from '@nestjs/common';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { DeliveryModel } from './delivery.model';
import { CreateDeliveryDto } from './dto/create-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel(DeliveryModel)
    private readonly deliveryModel: ModelType<DeliveryModel>,
  ) {}

  async getHello(): Promise<string> {
    return 'Hello!';
  }

  async findAll(): Promise<DocumentType<any>> {
    return this.deliveryModel.find().exec();
  }

  async create(dto: CreateDeliveryDto): Promise<DocumentType<DeliveryModel>> {
    return this.deliveryModel.create(dto);
  }

  async delete(id: string): Promise<DocumentType<DeliveryModel> | null> {
    return this.deliveryModel.findByIdAndDelete(id).exec();
  }

  async updateById(
    id: string,
    dto: CreateDeliveryDto,
  ): Promise<DocumentType<DeliveryModel> | null> {
    return this.deliveryModel.findByIdAndUpdate(id, dto).exec();
  }

  async findById(id: string): Promise<DocumentType<DeliveryModel>[]> {
    return this.deliveryModel.find({ _id: id }).exec();
  }

  async findByOrderId(id: string): Promise<DocumentType<DeliveryModel>[]> {
    return this.deliveryModel.find({ owner: id }).exec();
  }
}
