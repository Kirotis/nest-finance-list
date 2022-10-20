import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [RepositoryModule],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
