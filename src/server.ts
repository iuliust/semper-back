import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app/app.module';
import { INestApplication, RequestMethod, HttpStatus, HttpCode } from '@nestjs/common';

const port = Number(process.env.port) || 5000;

async function bootstrap(port: number) {
  const app: INestApplication = await NestFactory.create(ApplicationModule);
  await app.listen(port);
  console.log(`server is running at ${port}`);
}

bootstrap(port);