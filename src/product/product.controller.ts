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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserRequest } from 'src/decorators/UserReq.decorator';
import { GetUser } from 'src/decorators/getUser.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guards';
import { ProductService } from './product.service';
import { AuthService } from 'src/auth/auth.service';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from 'src/auth/user.model';
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
    const products = await this.productService.findAll();

    if (!products) {
      throw new HttpException('Not found any products', HttpStatus.NOT_FOUND);
    }

    return {
      status: HttpStatus.OK,
      message: 'Found products',
      data: products,
    };
  }

  @Get('getAllforAll')
  async getAllforAll(@UserRequest() req: any) {
    return this.productService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getBiId(@Param('id') { id }: any) {
    const product = await this.productService.findByProductId(id);

    if (!product) {
      throw new HttpException('Not found product', HttpStatus.NOT_FOUND);
    }

    return {
      status: HttpStatus.OK,
      message: 'Found product',
      data: product,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.productService.delete(id);

    if (!deletedDoc) {
      throw new HttpException('Not product for deleting', HttpStatus.NOT_FOUND);
    }

    return {
      status: HttpStatus.OK,
      message: 'Deleting success',
      data: deletedDoc,
    };
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
