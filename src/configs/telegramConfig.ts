import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from 'src/telegram/telegram.interface';

export const getTelegramConfig = (
  configService: ConfigService,
): ITelegramOptions => {
  const token = configService.get('TG_BOT_TOKEN');

  if (!token) {
    throw new Error('TG_BOT_TOKEN не задано');
  }
  return {
    chadId: configService.get('TG_CHAT_ID') ?? '',
    token,
  };
};
