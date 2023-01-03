import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { UserRequest } from 'src/decorators/request.decorator';
import { CreateOrderDto } from './dto/order-create.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('getAll')
  async getAll(@UserRequest() req: any) {
    return this.orderService.findAll();
  }

  @Post('create')
  async create(@Body() dto: CreateOrderDto, @UserRequest() req: any) {
    return this.orderService.create(dto);
  }
}
