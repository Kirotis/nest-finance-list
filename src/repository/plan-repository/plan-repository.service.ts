import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  combineLatest,
  forkJoin,
  from,
  map,
  tap,
  Observable,
  of,
  switchMap,
  mapTo,
} from 'rxjs';
import { CreatePlanDto } from 'src/plan/dto/create-plan.dto';
import { PlanView } from 'src/plan/dto/plan-view.dto';
import { BaseService } from 'src/services/base.service';
import { CategoryRepositoryService } from '../category-repository';
import { LogRepositoryService } from '../log-repository';
import { PlanDocument, Plan } from './entities/plan.entity';

@Injectable()
export class PlanRepositoryService extends BaseService<PlanDocument> {
  constructor(
    @InjectModel(Plan.name) categoryModel: Model<PlanDocument>,
    private readonly categoryService: CategoryRepositoryService,
    private readonly logService: LogRepositoryService,
  ) {
    super(categoryModel);
  }

  createPlan(
    item: CreatePlanDto,
  ): Observable<PlanDocument> | Promise<PlanDocument> {
    if (!item.categories?.length) {
      return super.create(item);
    }
    const cheks = item.categories.map((id) =>
      this.categoryService.checkCategoryId(id),
    );
    return combineLatest(cheks).pipe(switchMap(() => super.create(item)));
  }

  getPlans(): Observable<PlanView[]> {
    const plansPromise = this.findAll();
    return from(plansPromise).pipe(
      switchMap((plans) => {
        if (!plans?.length) {
          return of([]);
        }
        const dtos = plans.map<Observable<PlanView>>((plan) =>
          this.buildPlan(plan.toObject()),
        );
        return combineLatest(dtos);
      }),
    );
  }

  private buildPlan(
    plan: PlanDocument & { _id: Types.ObjectId },
  ): Observable<PlanView> {
    const logQuery = this.logService.crateQueryWithFilter({
      endDate: new Date(plan.endDate),
      startDate: new Date(plan.createDate),
      categoryFilter: plan.categories.map(String),
    });
    return from(logQuery).pipe(
      map((logs) => {
        if (!Array.isArray(logs)) {
          return null;
        }
        const count = logs.length;
        const sum = logs.reduce((sum, { money }) => money + sum, 0);

        return {
          ...plan,
          id: plan._id,
          logCount: count,
          currentMoney: sum,
        };
      }),
    );
  }
}
