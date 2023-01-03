import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModel } from './category.model';

@Module({
  controllers: [CategoryController],

  imports: [
    MongooseModule.forFeature([
      {
        name: 'CategoryModel',
        schema: CategoryModel,
        collection: 'Categories',
      },
    ]),
    ConfigModule,
  ],

  providers: [CategoryService],
})
export class CategoryModule {}
