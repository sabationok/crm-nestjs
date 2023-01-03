import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ProductModel',
        schema: ProductModel,
        collection: 'Products',
      },
    ]),
    ConfigModule,
  ],
  providers: [ProductService],
})
export class ProductModule {}
