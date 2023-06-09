import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserRequest } from 'src/decorators/UserReq.decorator';
import { CategoryService } from './category.service';
import { GetUser } from 'src/decorators/getUser.decorator';
import { CreateCategoryDto } from './dto/create-category.dto';
import { TelegramService } from 'src/telegram/telegram.service';
import createError from '../helpers/createError';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly telegramService: TelegramService,
  ) {}

  @Get('getAll')
  async getAll(@GetUser() user: any) {
    const result = await this.categoryService.findAll();

    if (result.length === 0) {
      throw createError({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found any categories`,
      });
    }

    return {
      status: HttpStatus.OK,
      message: 'All categories',
      data: result,
    };
  }

  @Get('getByParentId/:id')
  async getByParentId(@Param('id') id: string) {
    const result = await this.categoryService.findByOwnerId(id);

    if (result.length === 0) {
      throw new HttpException(
        `Not found any children categories of this category, parentId:${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: HttpStatus.OK,
      message: `Children categories, parentId:${id}`,
      data: result,
    };
  }

  @Get(':id')
  async getById(@Param('id') id: string, @GetUser() user: any) {
    const result = await this.categoryService.findById(id);

    console.log('id', id);

    if (!result) {
      throw new HttpException(
        `Not found any category with id:${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      user,
      status: HttpStatus.OK,
      message: `Children categories, parentId:${id}`,
      data: result,
    };
  }

  @Post('create')
  async create(@Body() dto: CreateCategoryDto, @UserRequest() req: any) {
    const result = await this.categoryService.create(dto);

    return {
      status: HttpStatus.OK,
      message: 'Created category',
      data: result,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: CreateCategoryDto,
    @UserRequest() req: any,
  ) {
    const result = await this.categoryService.updateById(id, dto);

    return {
      status: HttpStatus.OK,
      message: 'Updated category',
      data: result,
    };
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string, @UserRequest() req: any) {
    const result = await this.categoryService.delete(id);

    if (!result) {
      throw new HttpException(
        'Not found category for deleting',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      status: HttpStatus.OK,
      message: 'Deleted category',
      data: result,
    };
  }

  @Delete('clearById/:id')
  async clearById(@Param('id') id: string, @UserRequest() req: any) {
    const result = await this.categoryService.deleteManyByParentId(id);

    if (!result) {
      throw new HttpException(
        'Not found category for deleting',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      status: HttpStatus.OK,
      message: 'Deleted categories',
      data: result,
    };
  }
}
