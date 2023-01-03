import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderModel } from './order.model';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [OrderController],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'OrderModel',
        schema: OrderModel,
        collection: 'Orders',
      },
    ]),
    ConfigModule,
  ],
  providers: [OrderService],
})
export class OrderModule {}
