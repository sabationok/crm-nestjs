import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UserModel } from 'src/auth/user.model';
import { getJwtConfig } from 'src/configs/jwt_config';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { ProductController } from './product.controller';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ProductModel',
        schema: ProductModel,
        collection: 'Products',
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'UserModel',
        schema: UserModel,
        collection: 'User',
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    PassportModule,
    AuthModule,
    ConfigModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, AuthService],
})
export class ProductModule {}
