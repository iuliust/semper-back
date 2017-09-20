// import { PhotoService } from '../entities/photo/photo.service';
// import { UserService } from '../entities/user/user.service';
import * as bodyParser from 'body-parser';
import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';

import { typeDefs } from './config/typedefs';
import { UserService, PhotoService } from '../entities';
import { EntitiesModule } from '../entities/entities.module';

import { GraphQlController } from './graphql.controller';

@Module({
    controllers: [ GraphQlController ],
    modules: [ EntitiesModule ],
})
export class GraphQlModule implements NestModule {
    schema: GraphQLSchema;

    constructor(private userService: UserService,
                private photoServive: PhotoService,
            ) {
        const resolvers = {
            Query: {
                photos: () => this.photoServive.listAllPhotos(),
                users: () => this.userService.listAllUsers(),
            },
        };

        this.schema = makeExecutableSchema({
            typeDefs,
            resolvers,
        });
    }
    
    configure(consumer: MiddlewaresConsumer): void | MiddlewaresConsumer {
        return consumer.apply([bodyParser.json(), graphqlExpress({schema: this.schema})])
            .forRoutes({ path: '/graphql', method: RequestMethod.ALL })
            .apply(graphiqlExpress({ endpointURL: '/graphql' }))
            .forRoutes({ path: '/graphiql', method: RequestMethod.GET });
    }
}
