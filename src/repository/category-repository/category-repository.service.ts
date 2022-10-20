import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { BaseService } from 'src/services/base.service';
import { CategoryDocument, Category } from './entities/category.entity';

@Injectable()
export class CategoryRepositoryService extends BaseService<CategoryDocument> {
  constructor(
    @InjectModel(Category.name) categoryModel: Model<CategoryDocument>,
  ) {
    super(categoryModel);
  }

  checkCategoryId(categoryId: ObjectId): Promise<boolean> {
    return this.model
      .countDocuments({ _id: categoryId })
      .exec()
      .then((countDocuments) => countDocuments > 0);
  }
}
