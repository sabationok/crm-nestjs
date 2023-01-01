import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { DeliveryModel } from './delivery.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [DeliveryController],

  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: DeliveryModel,
        schemaOptions: {
          collection: 'Deliveries',
        },
      },
    ]),
    ConfigModule,
  ],

  providers: [DeliveryService],
})
export class DeliveryModule {}
