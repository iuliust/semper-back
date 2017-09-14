import * as path from 'path';
import { createConnection, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { Photo } from '../entities';

export const databaseProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: async () => await createConnection({
            type: 'sqlite',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'test',
            entities: [
                Photo,
            ],
            autoSchemaSync: true,
        })
    }
];