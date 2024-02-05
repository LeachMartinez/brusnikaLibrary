import { Module } from '@nestjs/common';
import { ReadersModule } from './readers/readers.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [ReadersModule, BooksModule],
})
export class AppModule {}
