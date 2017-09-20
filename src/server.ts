import { NestFactory } from '@nestjs/core';

import { ApplicationModule, environment } from './app';

Object.assign(process.env, environment);

const port = Number(process.env.port) || 5000;

async function bootstrap(port: number) {
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(port);
  console.log(`server is now running at ${port}`);
}

bootstrap(port);