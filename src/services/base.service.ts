import { Document, Model, Types } from 'mongoose';

export abstract class BaseService<T = Document> {
  constructor(protected readonly model: Model<T>) {}

  create(item: Partial<T>): Promise<T> {
    // const createdItem = new this.model(item);
    // return createdItem.save().then();
    return this.model.create(item);
  }

  findAll() {
    return this.model.find().exec();
  }

  findOne(id: Types.ObjectId) {
    return this.model.findById(id).exec();
  }

  async update(id: Types.ObjectId, updateItem: Partial<T>) {
    return this.model.findByIdAndUpdate(id, updateItem).exec();
    // const log = await this.findOne(id);
    // if (!log) {
    //   throw new Error('Log not found');
    // }
    // return log.update(updateItem).exec();
  }

  async remove(id: Types.ObjectId) {
    return this.model.findByIdAndDelete(id).exec();
    // const log = await this.findOne(id);
    // if (!log) {
    //   throw new Error('Log not found');
    // }
    // return log.delete().exec();
  }
}
