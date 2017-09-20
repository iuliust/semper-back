import { Module } from '@nestjs/common';

import { UserController } from './user/user.controller';

import { EntitiesModule } from '../modules/entities';
import { GraphQlModule } from '../modules/gql';
import { AuthModule } from '../modules/auth';

@Module({
  modules: [
    EntitiesModule,
    GraphQlModule,
    AuthModule,
  ],
  controllers: [ UserController ]
})
export class ApplicationModule {}