import { Controller, Get, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongo.config';
import { getTelegramConfig } from './configs/telegramConfig';

import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { RefundsModule } from './refunds/refunds.module';
import { TelegramModule } from './telegram/telegram.module';

// import { FilesModule } from './files/files.module';
// import { TelegramModule } from './telegram/telegram.module';
// import { getTelegramConfig } from './configs/telegram.config';
// import { ScheduleModule } from '@nestjs/schedule';
// import { SitemapModule } from './sitemap/sitemap.module';
import { UsersModule } from './users/users.module';

@Controller('/')
export class AppController {
  @Get()
  async getHello() {
    return 'Hello my friend';
  }
}

@Module({
  imports: [
    ConfigModule.forRoot(),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),

    AuthModule,

    RolesModule,

    ProductModule,

    OrderModule,

    CategoryModule,

    RefundsModule,

    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTelegramConfig,
    }),

    ShipmentsModule,

    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
