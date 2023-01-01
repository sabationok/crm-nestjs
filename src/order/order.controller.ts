import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { UserRequest } from 'src/decorators/request.decorator';

import { OrderModel } from './order.model';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('getAll')
  async getAll(@UserRequest() req: any) {
    return this.orderService.findAll();
  }

  @Post('create')
  async create(@Body() dto: OrderModel, @UserRequest() req: any) {
    console.log(dto);
    return this.orderService.create(dto);
  }
}
