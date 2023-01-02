import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './configs/mongo.config';
import { OrderModule } from './order/order.module';

// import { FilesModule } from './files/files.module';
// import { TelegramModule } from './telegram/telegram.module';
// import { getTelegramConfig } from './configs/telegram.config';
// import { ScheduleModule } from '@nestjs/schedule';
// import { SitemapModule } from './sitemap/sitemap.module';
import { DeliveryModule } from './delivery/delivery.module';
import { CategoryModule } from './category/category.module';
import { RefundsModule } from './refunds/refunds.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
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
