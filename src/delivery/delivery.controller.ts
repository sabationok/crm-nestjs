import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserRequest } from 'src/decorators/request.decorator';
import { DeliveryModel } from './delivery.model';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryServise: DeliveryService) {}

  @Get('getAll')
  async getAll(@UserRequest() req: any) {
    return this.deliveryServise.findAll();
  }

  @Get('getByOrderId/:id')
  async getByOderId(@Param('id') id: string) {
    const result = await this.deliveryServise.findByOrderId(id);

    if (result.length === 0) {
      throw new HttpException(
        `Not found any deliveries to order, orderId:${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  @Post('create')
  async create(@Body() dto: DeliveryModel, @UserRequest() req: any) {
    return this.deliveryServise.create(dto);
  }
}
