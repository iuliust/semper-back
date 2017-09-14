import { Module } from '@nestjs/common';

import { UserController } from './user/user.controller';
import { EntitiesModule } from '../entities/entities.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  modules: [
    EntitiesModule,
  ],
  controllers: [ UserController ]
})
export class ApplicationModule {}