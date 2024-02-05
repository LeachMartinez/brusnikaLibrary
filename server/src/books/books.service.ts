import { Inject, Injectable } from '@nestjs/common';
import { Book } from 'src/db/Entities/book.entity';
import { Reader } from 'src/db/Entities/reader.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private booksRepository: Repository<Book>,
    @Inject('READER_REPOSITORY')
    private readersRepository: Repository<Reader>,
  ) {}

  getBooks(): Promise<Book[]> {
    return this.booksRepository.find({
      relations: {
        reader: true,
      },
    });
  }

  async createBook(bookParams: {
    author: string;
    name: string;
    description?: string;
  }) {
    const book = await this.booksRepository.save({
      author: bookParams.author,
      name: bookParams.name,
      description: bookParams.description,
    });

    return book;
  }

  async editBook(bookParams: {
    id: number;
    author?: string;
    description?: string;
    name?: string;
  }) {
    const book = await this.booksRepository.update(
      { id: bookParams.id },
      { ...bookParams },
    );

    return book;
  }

  async removeBook(
    bookParams: {
      id: number;
    }[],
  ) {
    this.booksRepository.remove(
      await this.booksRepository.find({
        where: bookParams,
      }),
    );
  }

  async addReader(params: { bookIds: number[]; readerId: number }) {
    const reader = await this.readersRepository.findOne({
      where: { id: params.readerId },
    });

    const addedBooks = await this.booksRepository.find({
      where: params.bookIds.map((id) => ({
        id,
      })),
    });

    return this.readersRepository.update(reader, {
      books: [...reader.books, ...addedBooks],
    });
  }
}
