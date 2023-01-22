import {
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
  UseGuards,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { FindUserDto } from 'src/auth/dto/findUserDto.dto';
import { User } from 'src/auth/user.model';
import { GetUser } from 'src/decorators/getUser.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guards';
import { OrderService } from 'src/order/order.service';
import { ShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { ShipmentsService } from './shipments.service';

@Controller('shipments')
export class ShipmentsController {
  constructor(
    private readonly shipmentsService: ShipmentsService,
    private readonly orderService: OrderService,
    private readonly authService: AuthService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Get('getAll')
  async getAll(@GetUser() user: User) {
    const sipments = await this.shipmentsService.findAll();

    if (!sipments) {
      throw new HttpException('Not found any products', HttpStatus.NOT_FOUND);
    }

    return {
      status: HttpStatus.OK,
      message: 'Found shipments',
      data: sipments,
    };
  }

  // @UseGuards(JwtAuthGuard)
  @Get('getAllByOrderId/:id')
  async getAllByOrderId(@GetUser() user: User, @Param('id') id: string) {
    const shipments = await this.shipmentsService.findAllByOrderId(id);

    if (shipments.length === 0) {
      throw new HttpException(
        `Not found any shipments for ID:${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      status: HttpStatus.OK,
      message: 'Found shipments',
      data: shipments,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('createForOrder/:orderId')
  async create(
    @GetUser() user: FindUserDto,
    @Body() dto: ShipmentDto,
    @Param('orderId') orderId: string,
  ) {
    const order = await this.orderService.findById(orderId);

    if (!order) {
      throw new HttpException(
        'Not found order for update',
        HttpStatus.NOT_FOUND,
      );
    }

    const newShipmentData = {
      owner: orderId,
      creator: user._id,
      ...dto,
    };

    const newShipment = await this.shipmentsService.create(newShipmentData);

    if (!newShipment) {
      throw new HttpException(
        `Creating error`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const updatedOrder = await this.orderService.addShipment(
      orderId,
      newShipment._id.toString(),
    );

    return {
      status: HttpStatus.OK,
      message: 'Created shipment',
      data: newShipment,
      orderShipments: updatedOrder?.shipments,
    };
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateById(
    @GetUser() user: User,
    @Param() { id }: any,
    @Body() dto: UpdateShipmentDto,
  ) {
    const updatedShipment = await this.shipmentsService.updateById(id, dto);

    if (!updatedShipment) {
      throw new HttpException(
        `Updating error`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      status: HttpStatus.OK,
      message: 'Update shipment',
      data: updatedShipment,
    };
  }
}
