import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserRequest } from 'src/decorators/request.decorator';
import { GetUser } from 'src/decorators/getUser.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guards';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Get('getAll')
  async getAll(@GetUser() user: string) {
    return this.productService.findAll();
  }

  @Get('getAllforAll')
  async getAllforAll(@UserRequest() req: any) {
    return this.productService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: ProductModel, @UserRequest() req: any) {
    return this.productService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getBiId(@Param('id') id: string) {
    return this.productService.findByProductId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.productService.delete(id);

    if (!deletedDoc) {
      throw new HttpException('', HttpStatus.NOT_FOUND);
    }
  }

  // @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ProductModel) {
    const updatedDoc = await this.productService.updateById(id, dto);

    if (!updatedDoc) {
      throw new HttpException('', HttpStatus.NOT_FOUND);
    }
    return updatedDoc;
  }

  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: ProductModel) {}
}
