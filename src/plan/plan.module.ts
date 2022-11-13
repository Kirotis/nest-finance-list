import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository';
import { PlanController } from './plan.controller';

@Module({
  controllers: [PlanController],
  imports: [RepositoryModule],
})
export class PlanModule {}
