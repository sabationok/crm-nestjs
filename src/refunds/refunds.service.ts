import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRefundDto } from './dto/create-refund.dto';
import { Refund, RefundDocument } from './refund.model';

@Injectable()
export class RefundsService {
  constructor(
    @InjectModel(Refund.name) private refundModel: Model<RefundDocument>,
  ) {}

  async create(createRefundDto: CreateRefundDto): Promise<Refund> {
    return this.refundModel.create(createRefundDto);
  }

  async findAll(): Promise<Refund[]> {
    return this.refundModel.find().exec();
  }
}
