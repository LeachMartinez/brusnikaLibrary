import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Reader } from 'src/db/Entities/reader.entity';
import { ReadersService } from 'src/readers/readers.service';

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
  createReader(@Body() reader: { name: string }) {
    return this.readerService.createReader(reader);
  }

  @Patch('/reader/:id')
  editReader() {
    return '';
  }

  @Delete('reader/:id')
  deleteBook(@Param('id') id: string) {
    return this.readerService.removeReader(Number(id));
  }
}
