import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order, OrderModel } from './order.model';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [OrderController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderModel,
        // collection: 'Orders',
      },
    ]),
    ConfigModule,
  ],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
