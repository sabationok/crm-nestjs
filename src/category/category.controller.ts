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
import { CategoryModel } from './category.model';
import { CategoryService } from './category.service';
import { GetUser } from 'src/decorators/getUser.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryServise: CategoryService) {}

  @Get('getAll')
  async getAll(@GetUser() user: any) {
    const result = await this.categoryServise.findAll();

    user = { _id: 'df1sd5f13bsd5f13b', name: 'Antonio' };

    if (result.length === 0) {
      throw new HttpException(`Not found any categories`, HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, data: result, messsage: 'All categories' };
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
      data: result,
      messsage: `Children categories, parentId:${id}`,
    };
  }

  @Post('create')
  async create(@Body() dto: CategoryModel, @UserRequest() req: any) {
    const result = await this.categoryServise.create(dto);

    return {
      status: HttpStatus.OK,
      data: result,
      messsage: 'Created category',
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: CategoryModel,
    @UserRequest() req: any,
  ) {
    const result = await this.categoryServise.updateById(id, dto);

    return {
      status: HttpStatus.OK,
      data: result,
      messsage: 'Updated category',
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
      data: result,
      messsage: 'Deleted category',
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
      data: result,
      messsage: 'Deleted categories',
    };
  }
  // deleteManyByParentId
}
