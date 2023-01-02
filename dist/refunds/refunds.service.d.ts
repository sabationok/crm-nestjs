import { Model } from 'mongoose';
import { CreateRefundDto } from './dto/create-refund.dto';
import { Refund, RefundDocument } from './refund.model';
export declare class RefundsService {
    private refundModel;
    constructor(refundModel: Model<RefundDocument>);
    create(createRefundDto: CreateRefundDto): Promise<Refund>;
    findAll(): Promise<Refund[]>;
}
