import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { PhotoService, photoProviders } from './photo/';

@Module({
    modules: [ DatabaseModule ],
    components: [
        ...photoProviders,
        PhotoService,
    ],
    exports: [  ]
})
export class EntitiesModule {}
