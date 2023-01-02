import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRefundDto } from './dto/create-refund.dto';
import { Refund } from './refund.model';
import { RefundsService } from './refunds.service';

@Controller('refunds')
export class RefundsController {
  constructor(private readonly refundsService: RefundsService) {}

  @Get('getAll')
  async getAll() {
    const data = await this.refundsService.findAll();
    return {
      message: 'All refunds',
      data,
    };
  }

  @Post('create')
  async create(@Body() dto: CreateRefundDto) {
    const data = await this.refundsService.create(dto);

    return { messsage: 'Created', data };
  }
}
