import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order-create.dto';
import { Shipment } from 'src/shipments/shipment.model';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('getAll')
  async getAll() {
    return this.orderService.findAll();
  }

  @Get('/:id/shipments')
  async getShimentsByOrderId(@Param('id') id: string) {
    const orderPopulated = await this.orderService.getOrderWithShipments(id);

    if (!orderPopulated) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return {
      status: HttpStatus.OK,
      message: 'Order with shipments',
      data: orderPopulated,
    };
  }

  @Patch('/:id/addShipment')
  async addSipmentToOrder(@Param('id') id: string) {}

  @Post('create')
  async create(@Body() dto: CreateOrderDto) {
    const newOrderData = {
      creator: '63ba350d7e5d95426e0fb2be',
      ...dto,
    };
    const newOrder = await this.orderService.create(newOrderData);

    if (!newOrder) {
      throw new HttpException(
        'Createing error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      status: HttpStatus.OK,
      message: 'Order created',
      data: newOrder,
    };
  }
}
