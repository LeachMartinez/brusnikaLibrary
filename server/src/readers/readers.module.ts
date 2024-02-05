import { Module } from '@nestjs/common';
import { ReadersController } from './readers.controller';
import { ReadersService } from './readers.service';
import { ReaderProvider } from 'src/db/providers/reader.provider';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  controllers: [ReadersController],
  providers: [...ReaderProvider, ReadersService],
  imports: [DatabaseModule],
})
export class ReadersModule {}
