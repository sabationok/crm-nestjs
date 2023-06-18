import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from 'src/telegram/telegram.interface';
import { Logger } from '@nestjs/common';

export const getTelegramConfig = (
  configService: ConfigService,
): ITelegramOptions => {
  const token = configService.get('TG_BOT_TOKEN');

  if (!token) {
    Logger.log('TG_BOT_TOKEN не задано');
  }
  return {
    chadId: configService.get('TG_CHAT_ID') ?? '',
    token,
  };
};
