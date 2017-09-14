import { graphiqlExpress } from 'apollo-server-express/dist';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { graphqlExpress } from 'apollo-server-express';
import * as express from 'express';
import { ApplicationModule } from './app/app.module';
import { INestApplication, RequestMethod, HttpStatus, HttpCode } from '@nestjs/common';

const port = Number(process.env.port) || 5000;

async function bootstrap(port: number) {
  const expressApp = express();
  expressApp.use('/graphql', bodyParser.json(), graphqlExpress({
      schema: null,
    }))
    .use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql'
    }));
  const app: INestApplication = await NestFactory.create(ApplicationModule, expressApp);
  await app.listen(port);
  console.log(`server is running at ${port}`);
}

bootstrap(port);