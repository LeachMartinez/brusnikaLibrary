import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './Entities/book.entity';
import { Reader } from './Entities/reader.entity';

export const AppDataSource = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'library_development',
  entities: [Book, Reader],
  synchronize: true,
});
