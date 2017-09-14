import { Connection } from 'typeorm';
import { Photo } from './photo.entity';

export const photoProviders = [{
    provide: 'PhotoRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository<Photo>(Photo),
    inject: [ 'DbConnectionToken' ]
}];
