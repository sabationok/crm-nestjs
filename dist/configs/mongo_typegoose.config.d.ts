import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose/dist';
export declare const getMongoConfig: (configService: ConfigService) => Promise<MongooseModuleOptions>;
