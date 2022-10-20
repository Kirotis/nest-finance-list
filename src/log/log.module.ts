import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository';
import { LogController } from './log.controller';

@Module({
  imports: [RepositoryModule],
  controllers: [LogController],
})
export class LogModule {}
