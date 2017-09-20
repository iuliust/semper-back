import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { json } from 'body-parser';

import { EntitiesModule } from '../entities/entities.module';
import { EnsureTokenMiddleware } from './ensure-token.middleware';
import { AuthController } from './auth.controller';

@Module({
    modules: [ EntitiesModule ],
    controllers: [ AuthController ],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void | MiddlewaresConsumer {
        return consumer.apply([json(), EnsureTokenMiddleware]).forRoutes(
            { path: '*', method: RequestMethod.ALL }
        );
    }

}
