import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';
import { ITelegramOptions } from './telegram.interface';

@Injectable()
export class TelegramService {
  bot: Telegraf;
  options: ITelegramOptions;

  constructor(@Inject(TELEGRAM_MODULE_OPTIONS) options: ITelegramOptions) {
    this.options = options;
    this.bot = new Telegraf(options.token);
  }

  async sendMessage(message: string, chadId: string = this.options.chadId) {
    return this.bot.telegram.sendMessage(chadId, message);
  }
}
