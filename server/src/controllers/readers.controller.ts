import { Controller, Get, Patch, Post } from '@nestjs/common';
import { Reader } from 'src/db/Entities/reader.entity';
import { ReadersService } from 'src/services/readers.service';

@Controller()
export class ReadersController {
  constructor(private readonly readerService: ReadersService) {}

  @Get('/readers')
  readers(): Promise<Reader[]> {
    return this.readerService.getReaders();
  }

  @Get('/reader/:id')
  showReaders() {
    return '';
  }

  @Post('/reader')
  createReader() {
    return '';
  }

  @Patch('/reader/:id')
  editReader() {
    return '';
  }
}
