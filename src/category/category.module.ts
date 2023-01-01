import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryModel } from './category.model';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  controllers: [CategoryController],

  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: CategoryModel,
        schemaOptions: {
          collection: 'Categories',
        },
      },
    ]),
    ConfigModule,
  ],

  providers: [CategoryService],
})
export class CategoryModule {}
