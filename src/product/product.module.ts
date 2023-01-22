import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ProductController } from './product.controller';
import { Product, ProductModel } from './product.model';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductModel,
        collection: 'Products',
      },
    ]),

    AuthModule,

    ConfigModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
