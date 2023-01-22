import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { Shipment, ShipmentDocument } from './shipment.model';

@Injectable()
export class ShipmentsService {
  constructor(
    @InjectModel(Shipment.name)
    private readonly shipmentModel: Model<ShipmentDocument>,
  ) {}

  async findAll(): Promise<Shipment[]> {
    return this.shipmentModel.find().exec();
  }

  async findAllByOrderId(id: string) {
    return this.shipmentModel
      .find({ owner: id })
      .populate({ path: 'creator', select: 'role' })
      .populate({ path: 'owner', select: 'status' })
      .exec();
  }

  async create(dto: ShipmentDto) {
    return this.shipmentModel.create(dto);
  }

  async updateById(id: string, dto: UpdateShipmentDto) {
    return this.shipmentModel.findByIdAndUpdate(id, dto);
  }
}
