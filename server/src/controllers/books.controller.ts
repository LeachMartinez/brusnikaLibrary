import { Controller, Get, Patch, Post } from '@nestjs/common';
import { Book } from 'src/db/Entities/book.entity';
import { BooksService } from 'src/services/books.service';

@Controller()
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get('/books')
  async books(): Promise<Book[]> {
    return await this.bookService.getBooks();
  }

  @Get('/book/:id')
  showBook() {
    return '';
  }

  @Post('/book')
  createBook() {
    return '';
  }

  @Patch('/book/:id')
  editBook() {
    return '';
  }
}
