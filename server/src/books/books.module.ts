import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookProviders } from 'src/db/providers/book.provider';
import { DatabaseModule } from 'src/db/database.module';
import { ReaderProvider } from 'src/db/providers/reader.provider';

@Module({
  controllers: [BooksController],
  providers: [...BookProviders, ...ReaderProvider, BooksService],
  imports: [DatabaseModule],
})
export class BooksModule {}
