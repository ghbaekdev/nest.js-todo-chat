import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { RedisIoAdapter } from './redisIoAdapter';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const { port } = config.get('server');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);
  app.enableCors();
  await app.listen(port);
}
bootstrap();
