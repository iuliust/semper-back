import { graphiqlExpress } from 'apollo-server-express/dist';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { graphqlExpress } from 'apollo-server-express';
import * as express from 'express';
import { INestApplication, RequestMethod, HttpStatus, HttpCode } from '@nestjs/common';

import { ApplicationModule } from './app';
import { schema } from './gql/schema';

const port = Number(process.env.port) || 5000;

async function bootstrap(port: number) {
  const expressApp = express();
  expressApp.use('/graphql', bodyParser.json(), graphqlExpress({
      schema,
    }))
    .use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql'
    }));
  const app: INestApplication = await NestFactory.create(ApplicationModule, expressApp);
  await app.listen(port);
  console.log(`server is now running at ${port}`);
}

bootstrap(port);