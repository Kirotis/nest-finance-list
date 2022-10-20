import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Category,
  CategorySchema,
  CategoryRepositoryService,
} from './category-repository';
import { Log, LogSchema, LogRepositoryService } from './log-repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Log.name, schema: LogSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [LogRepositoryService, CategoryRepositoryService],
  exports: [LogRepositoryService, CategoryRepositoryService],
})
export class RepositoryModule {}
