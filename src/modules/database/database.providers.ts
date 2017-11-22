import * as path from 'path';
import { createConnection, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { Photo, User } from '../entities';

export const databaseProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: async () => await createConnection({
            type: 'sqlite',
            dropSchema: true,
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'test_database',
            entities: [
                Photo,
                User,
            ],
            autoSchemaSync: true,
        }).catch(console.log)
    }
];