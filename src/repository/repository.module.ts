import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Category,
  CategorySchema,
  CategoryRepositoryService,
} from './category-repository';
import { Log, LogSchema, LogRepositoryService } from './log-repository';
import { Plan, PlanSchema, PlanRepositoryService } from './plan-repository';
import { User, UserSchema, UserRepositoryService } from './users-repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Log.name, schema: LogSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Plan.name, schema: PlanSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [
    LogRepositoryService,
    CategoryRepositoryService,
    PlanRepositoryService,
    UserRepositoryService,
  ],
  exports: [
    LogRepositoryService,
    CategoryRepositoryService,
    PlanRepositoryService,
    UserRepositoryService,
  ],
})
export class RepositoryModule {}
