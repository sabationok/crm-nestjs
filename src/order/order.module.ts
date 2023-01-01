import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderModel } from './order.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [OrderController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: OrderModel,
        schemaOptions: {
          collection: 'Orders',
        },
      },
    ]),
    ConfigModule,
  ],
  providers: [OrderService],
})
export class OrderModule {}
