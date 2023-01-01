import { Injectable } from '@nestjs/common';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { OrderModel } from './order.model';
import { CreateOrderDto } from './dto/order-create.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderModel) private readonly orderModel: ModelType<OrderModel>,
  ) {}

  async getHello(): Promise<string> {
    return 'Hello!';
  }

  async findAll(): Promise<DocumentType<any>> {
    return this.orderModel.find().exec();
  }

  async create(dto: CreateOrderDto): Promise<DocumentType<OrderModel>> {
    return this.orderModel.create(dto);
  }

  async delete(id: string): Promise<DocumentType<OrderModel> | null> {
    return this.orderModel.findByIdAndDelete(id).exec();
  }

  async updateById(
    id: string,
    dto: CreateOrderDto,
  ): Promise<DocumentType<OrderModel> | null> {
    return this.orderModel.findByIdAndUpdate(id, dto).exec();
  }

  async findById(id: string): Promise<DocumentType<OrderModel>[]> {
    return this.orderModel.find({ _id: id }).exec();
  }

  async findByCreatorId(id: string): Promise<DocumentType<OrderModel>[]> {
    return this.orderModel.find({ creatorId: id }).exec();
  }

  async findByManagerId(id: string): Promise<DocumentType<OrderModel>[]> {
    return this.orderModel.find({ managerId: id }).exec();
  }
}
