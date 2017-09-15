import * as bodyParser from 'body-parser';
import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { schema } from './schema';

import { GraphQlController } from './graphql.controller';

@Module({
    controllers: [ GraphQlController ],
})
export class GraphQlModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void | MiddlewaresConsumer {
        return consumer.apply([bodyParser.json(), graphqlExpress({schema})])
            .forRoutes({ path: '/graphql', method: RequestMethod.ALL })
            .apply(graphiqlExpress({ endpointURL: '/graphql' }))
            .forRoutes({ path: '/graphiql', method: RequestMethod.ALL });
    }
}
