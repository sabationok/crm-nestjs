import { CreateRefundDto } from './dto/create-refund.dto';
import { Refund } from './refund.model';
import { RefundsService } from './refunds.service';
export declare class RefundsController {
    private readonly refundsService;
    constructor(refundsService: RefundsService);
    getAll(): Promise<{
        message: string;
        data: Refund[];
    }>;
    create(dto: CreateRefundDto): Promise<{
        messsage: string;
        data: Refund;
    }>;
}
