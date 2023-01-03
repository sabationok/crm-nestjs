import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { DeliveryModel } from './delivery.model';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [DeliveryController],

  imports: [
    MongooseModule.forFeature([
      {
        name: 'DeliveryModel',
        schema: DeliveryModel,
        collection: 'Deliveries',
      },
    ]),

    ConfigModule,
  ],

  providers: [DeliveryService],
})
export class DeliveryModule {}
