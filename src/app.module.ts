import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongo.config';

import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { DeliveryModule } from './delivery/delivery.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { RefundsModule } from './refunds/refunds.module';

// import { FilesModule } from './files/files.module';
// import { TelegramModule } from './telegram/telegram.module';
// import { getTelegramConfig } from './configs/telegram.config';
// import { ScheduleModule } from '@nestjs/schedule';
// import { SitemapModule } from './sitemap/sitemap.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),

    AuthModule,

    ProductModule,

    OrderModule,

    DeliveryModule,

    CategoryModule,

    RefundsModule,
  ],
  providers: [],
})
export class AppModule {}
