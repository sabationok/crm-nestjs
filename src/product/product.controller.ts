import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserRequest } from 'src/decorators/request.decorator';
import { GetUser } from 'src/decorators/getUser.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guards';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/user.model';
import { UserStorage } from 'src/helpers/userStorage.helper';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('getAll')
  async getAll(@GetUser() user: User) {
    return this.productService.findAll();
  }

  @Get('getAllforAll')
  async getAllforAll(@UserRequest() req: any) {
    return this.productService.findAll();
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

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateProductDto, @GetUser() user: any) {
    try {
      const creator = await this.authService.getUserById(user._id);

      const newProduct = {
        creator: {
          _id: user._id,
          role: user.role,
          name: creator?.name,
        },
        ...dto,
      };
      Logger.log(creator?.email);

      const createdProduct = await this.productService.create(newProduct);

      if (!createdProduct) {
        throw new HttpException(
          'Помилка при створенні продукту',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        status: HttpStatus.CREATED,
        message: 'Створено новий продукт',
        data: createdProduct,
      };
    } catch (error) {
      Logger.log(error);
      throw new HttpException(
        'Помилка бази даних',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch('update/:productId')
  async patch(
    @Param('productId') productId: string,
    @Body() dto: UpdateProductDto,
    @GetUser() user: any,
  ) {
    const creator = await this.authService.getUserById(user._id);

    const updateProductData = {
      updator: {
        _id: user._id,
        user: creator?.role,
        name: creator?.name,
      },
      ...dto,
    };
    const updatedDoc = await this.productService.updateById(
      productId,
      updateProductData,
    );

    if (!updatedDoc) {
      throw new HttpException(
        'Продукт для оновлення, відсутній',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      status: HttpStatus.OK,
      message: `Оновлено "${productId}"`,
      data: updatedDoc,
      updateProductData,
    };
  }

  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: CreateProductDto) {}
}
