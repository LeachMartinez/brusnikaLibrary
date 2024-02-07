import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Book } from 'src/db/Entities/book.entity';
import { BooksService } from 'src/books/books.service';

@Controller()
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get('/books')
  async books(): Promise<Book[]> {
    return await this.bookService.getBooks();
  }

  @Post('/book')
  createBook(
    @Body() book: { author: string; description: string; name: string },
  ) {
    return this.bookService.createBook(book);
  }

  @Patch('/book')
  editBook(
    @Body()
    book: {
      id: number;
      author?: string;
      description?: string;
      name?: string;
    },
  ) {
    return this.bookService.editBook(book);
  }

  @Delete('book/:id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.removeBook(Number(id));
  }

  @Post('/take_book')
  takeBook(@Body() body: { booksIds: number[]; readerId: number }) {
    return this.bookService.addReader(body);
  }

  @Post('refund/:id')
  refund(@Param('id') id: string) {
    return this.bookService.refundBook(Number(id));
  }
}
