import { Module } from '@nestjs/common';
import { RefundsController } from './refunds.controller';
import { RefundsService } from './refunds.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Refund, RefundModel } from './refund.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Refund.name,
        schema: RefundModel,
        collection: 'Refunds',
      },
    ]),
  ],
  controllers: [RefundsController],
  providers: [RefundsService],
})
export class RefundsModule {}
