import { Connection } from 'typeorm';
import { Photo } from './photo.entity';

export const photoProviders = [{
    provide: 'PhotoRepositoryToken',
    useFactory: (connection: Connection) => {
        const repo = connection.getRepository<Photo>(Photo);
        return repo;
    },
    inject: [ 'DbConnectionToken' ]
}];
