import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { Book } from 'src/db/Entities/book.entity';
import { BooksService } from 'src/books/books.service';

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
  createBook(
    @Body() book: { author: string; description: string; name: string },
  ) {
    return this.bookService.createBook(book);
  }

  @Patch('/book/:id')
  editBook() {
    return '';
  }
}
