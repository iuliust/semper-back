import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { graphqlExpress } from 'apollo-server-express';
import { graphiqlExpress } from 'apollo-server-express/dist';
import * as express from 'express';
import { INestApplication, RequestMethod, HttpStatus, HttpCode } from '@nestjs/common';

import { ApplicationModule } from './app';
import { schema } from './modules/gql/schema';

const port = Number(process.env.port) || 5000;

async function bootstrap(port: number) {
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(port);
  console.log(`server is now running at ${port}`);
}

bootstrap(port);