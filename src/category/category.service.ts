import { Injectable } from '@nestjs/common';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CategoryModel } from './category.model';
import { CreateCategoryDto } from './dto/create-category.dt';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryModel)
    private readonly categoryModel: ModelType<CategoryModel>,
  ) {}

  async getHello(): Promise<string> {
    return 'Hello!';
  }

  async findAll(): Promise<DocumentType<any>> {
    return this.categoryModel.find().exec();
  }

  async create(dto: CreateCategoryDto): Promise<DocumentType<CategoryModel>> {
    return this.categoryModel.create(dto);
  }

  async delete(id: string): Promise<DocumentType<CategoryModel> | null> {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }

  async updateById(
    id: string,
    dto: CreateCategoryDto,
  ): Promise<DocumentType<CategoryModel> | null> {
    return this.categoryModel.findByIdAndUpdate(id, dto).exec();
  }

  async findById(id: string): Promise<DocumentType<CategoryModel>[]> {
    return this.categoryModel.find({ _id: id }).exec();
  }

  async findByOwnerId(id: string): Promise<DocumentType<CategoryModel>[]> {
    return this.categoryModel.find({ owner: id }).exec();
  }
}
