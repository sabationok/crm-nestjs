import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { OrderModule } from 'src/order/order.module';
import { Shipment, ShipmentModel } from './shipment.model';
import { ShipmentsController } from './shipments.controller';
import { ShipmentsService } from './shipments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Shipment.name,
        schema: ShipmentModel,
        // collection: 'Shipments',
      },
    ]),

    AuthModule,

    ConfigModule,

    OrderModule,
  ],
  controllers: [ShipmentsController],
  providers: [ShipmentsService],
})
export class ShipmentsModule {}
