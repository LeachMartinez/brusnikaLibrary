import { Module } from '@nestjs/common';
import { AppDataSource } from './db/data-source';
import { BooksController } from './controllers/books.controller';
import { ReadersController } from './controllers/readers.controller';
import { ReadersService } from './services/readers.service';
import { BooksService } from './services/books.service';

@Module({
  imports: [AppDataSource],
  controllers: [BooksController, ReadersController],
  providers: [ReadersService, BooksService],
})
export class AppModule {}
