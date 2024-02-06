import { Inject, Injectable } from '@nestjs/common';
import { Reader } from 'src/db/Entities/reader.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReadersService {
  constructor(
    @Inject('READER_REPOSITORY')
    private readersRepository: Repository<Reader>,
  ) {}

  async getReaders(): Promise<Reader[]> {
    return await this.readersRepository.find({
      relations: {
        books: true,
      },
    });
  }

  async createReader(readerParams: { name: string }) {
    const reader = await this.readersRepository.save({
      name: readerParams.name,
    });

    return reader;
  }

  editReader(readerParams: { id: number; name?: string }) {
    this.readersRepository.update({ id: readerParams.id }, readerParams);
  }

  async removeReader(id: number) {
    let reader = await this.readersRepository.findOne({
      relations: {
        books: true,
      },
      where: { id },
    });

    reader = await this.readersRepository.save({
      ...reader,
      books: null,
    });

    await this.readersRepository.remove(reader);
  }
}
