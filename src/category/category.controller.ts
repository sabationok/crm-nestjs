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
import { UserRequest } from 'src/decorators/request.decorator';
import { CategoryService } from './category.service';
import { GetUser } from 'src/decorators/getUser.decorator';
import { CreateCategoryDto } from './dto/create-category.dt';
import { TelegramService } from 'src/telegram/telegram.service';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryServise: CategoryService,
    private readonly telegramService: TelegramService,
  ) {}

  @Get('getAll')
  async getAll(@GetUser() user: any) {
    const result = await this.categoryServise.findAll();

    user = { _id: 'df1sd5f13bsd5f13b', name: 'Antonio' };

    if (result.length === 0) {
      throw new HttpException(`Not found any categories`, HttpStatus.NOT_FOUND);
    }

    const tgRes = await this.telegramService.sendMessage(
      `Знайдено категорій: ${result.length}`,
    );
    return {
      status: HttpStatus.OK,
      messsage: 'All categories',
      data: result,
      tgRes,
    };
  }

  @Get('getByParentId/:id')
  async getByParentId(@Param('id') id: string) {
    const result = await this.categoryServise.findByOwnerId(id);

    if (result.length === 0) {
      throw new HttpException(
        `Not found any children categories of this category, parentId:${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: HttpStatus.OK,
      data: result,
      messsage: `Children categories, parentId:${id}`,
    };
  }

  @Get(':id')
  async getById(@Param('id') id: string, @GetUser() user: any) {
    const result = await this.categoryServise.findById(id);

    if (!result) {
      throw new HttpException(
        `Not found any category with id:${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      user,
      status: HttpStatus.OK,
      messsage: `Children categories, parentId:${id}`,
      data: result,
    };
  }

  @Post('create')
  async create(@Body() dto: CreateCategoryDto, @UserRequest() req: any) {
    const result = await this.categoryServise.create(dto);

    return {
      status: HttpStatus.OK,
      messsage: 'Created category',
      data: result,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: CreateCategoryDto,
    @UserRequest() req: any,
  ) {
    const result = await this.categoryServise.updateById(id, dto);

    return {
      status: HttpStatus.OK,
      messsage: 'Updated category',
      data: result,
    };
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string, @UserRequest() req: any) {
    const result = await this.categoryServise.delete(id);

    if (!result) {
      throw new HttpException(
        'Not found category for deleting',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      status: HttpStatus.OK,
      messsage: 'Deleted category',
      data: result,
    };
  }

  @Delete('clearById/:id')
  async clearById(@Param('id') id: string, @UserRequest() req: any) {
    const result = await this.categoryServise.deleteManyByParentId(id);

    if (!result) {
      throw new HttpException(
        'Not found category for deleting',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      status: HttpStatus.OK,
      messsage: 'Deleted categories',
      data: result,
    };
  }
}
