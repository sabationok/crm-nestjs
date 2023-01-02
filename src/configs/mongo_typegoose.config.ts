import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';
import { MongooseModuleOptions } from '@nestjs/mongoose/dist';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions(),
  };
};

const getMongoString = (configService: ConfigService) =>
  'mongodb+srv://' +
  configService.get('MONGO_DB_USER') +
  ':' +
  configService.get('MONGO_DB_PASSWORD') +
  '@' +
  configService.get('MONGO_DB_PROJECT') +
  '.mongodb.net/' +
  configService.get('MONGO_DB_NAME');

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
