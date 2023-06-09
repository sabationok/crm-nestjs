import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start(app: any, PORT: number, globalPrefix: string) {
  await app.listen(process.env.PORT || PORT, () =>
    Logger.log(
      `>>>>>>>>>>>> Server started. http://localhost:${PORT}/${globalPrefix} <<<<<<<<<<<<<<`,
    ),
  );
}
// async function startLocalServer(
//   app?: any,
//   PORT?: number,
//   globalPrefix?: string,
//   localIp?: string,
// ) {
//   if (!localIp) {
//     return;
//   }
//   await app.listen(process.env.PORT || PORT, localIp, () =>
//     console.log(`Server started. http://${localIp}:${PORT}/${globalPrefix}/`),
//   );
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await start(app, 5000, 'api');
}
bootstrap();
