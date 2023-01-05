import { ModuleMetadata } from '@nestjs/common/interfaces';

export interface ITelegramOptions {
  chadId: string;
  token: string;
}

export interface ITelegramModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<ITelegramOptions> | ITelegramOptions;
  inject: any[];
}
