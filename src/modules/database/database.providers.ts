import * as path from 'path';
import { createConnection, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { Photo, User } from '../entities';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

// const options: SqliteConnectionOptions = {
//     type: 'sqlite',
//     dropSchema: true,
// };

export const databaseProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: async () => await createConnection({
            type: 'sqlite',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'test_database.sqlite3',
            synchronize: true,
            entities: [
                Photo,
                User,
            ],
            autoSchemaSync: true,
        } as SqliteConnectionOptions)
        .catch(console.log)
        .then((connexion) => {
            console.log(connexion);
            return connexion;
        })
    }
];