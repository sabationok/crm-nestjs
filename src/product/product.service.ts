import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async create(dto: CreateProductDto): Promise<Product> {
    return this.productModel.create(dto);
  }

  async delete(id: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateProductDto): Promise<Product | null> {
    return this.productModel.findByIdAndUpdate(id, dto).exec();
  }

  async findByProductId(id: string): Promise<Product[]> {
    return this.productModel.find({ _id: id }).exec();
  }
}
