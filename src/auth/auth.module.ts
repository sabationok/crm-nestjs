import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { User, UserModel } from './user.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/configs/jwt_config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  controllers: [AuthController],

  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserModel,
        collection: 'User',
      },
    ]),

    ConfigModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),

    PassportModule,
  ],

  providers: [AuthService, JwtStrategy],

  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
