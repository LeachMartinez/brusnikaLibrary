import { DataSource } from 'typeorm';
import { Reader } from '../Entities/reader.entity';

export const ReaderProvider = [
  {
    provide: 'READER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Reader),
    inject: ['DATA_SOURCE'],
  },
];
