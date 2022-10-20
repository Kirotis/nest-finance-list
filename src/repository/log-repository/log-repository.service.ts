import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, Types, Document } from 'mongoose';
import { CreateLogDto } from 'src/log/dto/create-log.dto';
import { FilterLog } from 'src/log/dto/filter-log.dto';
import { UpdateLogDto } from 'src/log/dto/update-log.dto';
import { BaseService } from 'src/services/base.service';
import { CategoryRepositoryService } from '../category-repository/category-repository.service';
import { LogDocument, Log } from './entities/log.entity';

@Injectable()
export class LogRepositoryService extends BaseService<LogDocument> {
  constructor(
    @InjectModel(Log.name) logModel: Model<LogDocument>,
    private readonly categoryService: CategoryRepositoryService,
  ) {
    super(logModel);
  }

  findWithFilter(filter: FilterLog) {
    const filterQuery: FilterQuery<LogDocument> = {
      date: {
        $gte: filter.startDate ?? 0,
        $lte: filter.endDate ?? Date.now(),
      },
    };
    if (filter.search?.length) {
      filterQuery.title = { $regex: filter.search, $options: 'i' };
    }
    if (filter.categoryFilter?.length) {
      filterQuery.categoryId = { $in: filter.categoryFilter };
    }
    return this.model
      .find(filterQuery, null, {
        sort: { date: filter.sort == 'asc' ? 1 : -1 },
      })
      .exec();
  }

  async update(
    id: Types.ObjectId,
    updateItem: UpdateLogDto,
  ): Promise<Log & Document<any, any, any> & { _id: Types.ObjectId }> {
    const isExists = await this.categoryService.checkCategoryId(
      updateItem.categoryId,
    );
    if (!isExists) {
      throw new Error('Category not found');
    }
    return super.update(id, updateItem);
  }

  async create(createItem: CreateLogDto): Promise<LogDocument> {
    const isExists = await this.categoryService.checkCategoryId(
      createItem.categoryId,
    );
    if (!isExists) {
      throw new Error('Category not found');
    }
    return super.create(createItem);
  }
}
