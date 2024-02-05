import { Book } from './Entities/book.entity';
import { Reader } from './Entities/reader.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'library_development',
        entities: [Book, Reader],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
