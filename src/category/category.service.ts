import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.model';
import { CreateCategoryDto } from './dto/create-category.dt';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findById(id: string): Promise<Category | null> {
    return this.categoryModel.findById(id).exec();
  }

  async findByOwnerId(id: string): Promise<Category[]> {
    return this.categoryModel.find({ owner: id }).exec();
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    return this.categoryModel.create(dto);
  }

  async delete(id: string): Promise<Category | null> {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }

  async deleteManyByParentId(id: string): Promise<object | any> {
    return this.categoryModel.deleteMany({ owner: id });
  }

  async updateById(
    id: string,
    dto: CreateCategoryDto,
  ): Promise<Category | null> {
    return this.categoryModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
