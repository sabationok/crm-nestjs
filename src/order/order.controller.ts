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

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('getAll')
  async getAll() {
    return this.orderService.findAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const order = await this.orderService.findById(id);

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, message: 'Found order', data: order };
  }

  @Patch('/:id/addContent')
  async addContentToOrder(
    @Body()
    dto: string[],
    // dto: {
    //   content: { _id: string; qty: number; price: number; total: number }[];
    // },
    @Param('id') id: string,
  ) {
    console.log(dto);

    const updatedOrder = await this.orderService.addContentItems(id, dto);

    if (!updatedOrder) {
      throw new HttpException('Not order for update', HttpStatus.NOT_FOUND);
    }

    console.log(updatedOrder);

    return updatedOrder;
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
