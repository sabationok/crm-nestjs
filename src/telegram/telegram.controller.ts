import { Body, Controller, Inject, Post } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}
  @Post('notify')
  async sendMessage(
    @Body() body: { message: string; chatId: string | undefined },
  ) {
    const { message, chatId } = body;
    // const messageDto =
    //   `name ${dto.name}\n` +
    //   `owner ${dto.owner}\n` +
    //   `ownerName ${dto.ownerName}\n` +
    //   `section ${dto.section}\n` +
    //   `sectionName ${dto.sectionName}\n` +
    //   `isSection ${dto.isSection}\n` +
    //   `isArchived ${dto.isArchived}\n`;

    return await this.telegramService.sendMessage(message, chatId);
  }
}
