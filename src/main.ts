import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// const globalPrefix = 'api';
async function start(app: any, PORT: number, globalPrefix: string) {
  await app.listen(PORT);

  console.log(`Server started. http://localhost:${PORT}/${globalPrefix}/`);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  // await app.listen(3030);
  await start(app, 3030, 'api');
  // console.log(`Server started. http://localhost:${3030}/${'api'}/`);
}
bootstrap();
