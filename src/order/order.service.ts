import { Injectable } from '@nestjs/common';

import { OrderDocument, OrderModel, Order } from './order.model';
import { CreateOrderDto } from './dto/order-create.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('OrderModel')
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async create(dto: CreateOrderDto): Promise<Order> {
    return this.orderModel.create(dto);
  }

  async delete(id: string): Promise<Order | null> {
    return this.orderModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateOrderDto): Promise<Order | null> {
    return this.orderModel.findByIdAndUpdate(id, dto).exec();
  }

  async findById(id: string): Promise<Order[]> {
    return this.orderModel.find({ _id: id }).exec();
  }

  async findByCreatorId(id: string): Promise<Order[]> {
    return this.orderModel.find({ creatorId: id }).exec();
  }

  async findByManagerId(id: string): Promise<Order[]> {
    return this.orderModel.find({ managerId: id }).exec();
  }
}
