import { Controller, Get, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongo.config';
import { getTelegramConfig } from './configs/telegramConfig';
import { RolesModule } from './roles/roles.module';
import { TelegramModule } from './telegram/telegram.module';

// import { FilesModule } from './files/files.module';
// import { TelegramModule } from './telegram/telegram.module';
// import { getTelegramConfig } from './configs/telegram.config';
// import { ScheduleModule } from '@nestjs/schedule';
// import { SitemapModule } from './sitemap/sitemap.module';
import { PermissionsModule } from './permissions/permissions.module';
import { AuthModule } from './auth/auth.module';

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

    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTelegramConfig,
    }),

    AuthModule,
    PermissionsModule,
    RolesModule,

    // UsersModule,
    // ProductModule,
    // CategoryModule,
    // OrderModule,
    // OrderItemsModule,
    // ShipmentsModule,
    // RefundsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
