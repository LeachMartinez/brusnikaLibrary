import { InjectRepository } from '@nestjs/typeorm';
import { Reader } from 'src/db/Entities/reader.entity';
import { Repository } from 'typeorm';

export class ReadersService {
  constructor(
    @InjectRepository(Reader)
    private readersRepository: Repository<Reader>,
  ) {}

  getReaders(): Promise<Reader[]> {
    return this.readersRepository.find({
      relations: {
        books: true,
      },
    });
  }

  createReader(readerParams: { name: string }) {
    const reader = this.readersRepository.create({
      name: readerParams.name,
    });

    return reader;
  }

  editReader(readerParams: { id: number; name?: string }) {
    this.readersRepository.update({ id: readerParams.id }, readerParams);
  }

  async removeReader(
    readerParams: {
      id: number;
    }[],
  ) {
    this.readersRepository.remove(
      await this.readersRepository.find({
        where: readerParams,
      }),
    );
  }
}
