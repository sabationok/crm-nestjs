import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';
export declare const getMongoConfig: (configService: ConfigService) => Promise<TypegooseModuleOptions>;
