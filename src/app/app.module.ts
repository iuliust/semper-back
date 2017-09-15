import { Module } from '@nestjs/common';

import { UserController } from './user/user.controller';
import { EntitiesModule } from '../modules/entities/entities.module';
import { GraphQlModule } from '../modules/gql/graphql.module';

@Module({
  modules: [
    EntitiesModule,
    GraphQlModule,
  ],
  controllers: [ UserController ]
})
export class ApplicationModule {}