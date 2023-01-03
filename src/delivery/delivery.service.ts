import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Delivery, DeliveryDocument, DeliveryModel } from './delivery.model';
import { CreateDeliveryDto } from './dto/create-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel('DeliveryModel')
    private readonly deliveryModel: Model<DeliveryDocument>,
  ) {}

  async findAll(): Promise<Delivery[]> {
    return this.deliveryModel.find().exec();
  }

  async create(dto: CreateDeliveryDto): Promise<Delivery> {
    return this.deliveryModel.create(dto);
  }

  async delete(id: string): Promise<Delivery | null> {
    return this.deliveryModel.findByIdAndDelete(id).exec();
  }

  async updateById(
    id: string,
    dto: CreateDeliveryDto,
  ): Promise<Delivery | null> {
    return this.deliveryModel.findByIdAndUpdate(id, dto).exec();
  }

  async findById(id: string): Promise<Delivery[]> {
    return this.deliveryModel.find({ _id: id }).exec();
  }

  async findByOrderId(id: string): Promise<Delivery[]> {
    return this.deliveryModel.find({ owner: id }).exec();
  }
}
