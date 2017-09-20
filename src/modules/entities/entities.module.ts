import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { PhotoService, photoProviders } from './photo/';
import { UserService, userProviders } from  './user';

@Module({
    modules: [ DatabaseModule ],
    components: [
        ...photoProviders,
        PhotoService,
        ...userProviders,
        UserService,
    ],
    exports: [
        PhotoService,
        UserService,
    ],
})
export class EntitiesModule {}
