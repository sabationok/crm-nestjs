import { Injectable } from '@nestjs/common';

import { OrderDocument, OrderModel, Order } from './order.model';
import { CreateOrderDto } from './dto/order-create.dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
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

  async findById(id: string): Promise<Order | null> {
    return this.orderModel.findById(id).exec();
  }

  async findByCreatorId(id: string): Promise<Order[]> {
    return this.orderModel.find({ creatorId: id }).exec();
  }

  async findByManagerId(id: string): Promise<Order[]> {
    return this.orderModel.find({ managerId: id }).exec();
  }

  async addShipment(orderId: string, shipmentId: string) {
    return this.orderModel.findByIdAndUpdate(
      orderId,
      { $addToSet: { shipments: shipmentId } },
      { new: true },
    );
  }
  async removeShipment(orderId: string, shipmentId: string) {
    return this.orderModel.findByIdAndUpdate(
      orderId,
      { $pull: { shipments: shipmentId } },
      { new: true },
    );
  }
  async getOrderWithShipments(orderId: string) {
    return (
      this.orderModel
        .findById(orderId)
        .populate({ path: 'shipments', select: 'ttn' })
        // .populate({ path: 'creator', select: 'role' })
        .exec()
    );
  }
}
