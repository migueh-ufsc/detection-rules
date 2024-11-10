import { logger } from 'infra/logger';
import { HydratedDocument, Model, FilterQuery, UpdateQuery } from 'mongoose';

export class BaseService<T> {
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: T): Promise<HydratedDocument<T>> {
    try {
      return this.model.create(data);
    } catch (error) {
      logger.error('Error while creating document on database', {
        name: this.model.modelName,
        data,
      });
    }
  }

  async update(query: FilterQuery<T>, update: UpdateQuery<T>): Promise<void> {
    try {
      await this.model.updateMany(query, update);
    } catch (error) {
      logger.error('Error while updating document on database', {
        name: this.model.modelName,
        query,
        update,
      });
    }
  }

  async find(query: FilterQuery<T>): Promise<T[]> {
    try {
      return await this.model.find(query).lean();
    } catch (error) {
      logger.error('Error while trying to find documents on database', {
        name: this.model.modelName,
        query,
      });
    }
  }

  async delete(query: FilterQuery<T>): Promise<void> {
    try {
      await this.model.deleteMany(query);
    } catch (error) {
      logger.error('Error while deleting documents on database', {
        name: this.model.modelName,
        query,
      });
    }
  }
}
