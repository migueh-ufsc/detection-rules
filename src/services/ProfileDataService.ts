import { IProfileData } from 'contracts/entities/IProfileData';
import { ProfileDataModel } from 'infra/database/schemas/ProfileDataSchema';
import { logger } from 'infra/logger';
import { BaseService } from './BaseService';

export class ProfileDataService extends BaseService<IProfileData> {
  constructor() {
    super(ProfileDataModel);
  }

  async findByUsername(
    username: string,
  ): Promise<IProfileData & { _id: string }> {
    try {
      return await this.model.findOne({ username }).lean();
    } catch (error) {
      logger.error('Error while trying to find profile data on database', {
        name: this.model.modelName,
        username,
      });
    }
  }

  async exists(username: string): Promise<boolean> {
    try {
      const queryResult = await this.model.countDocuments({ username });
      return queryResult > 0;
    } catch (error) {
      logger.error('Error while trying to find profile data on database', {
        name: this.model.modelName,
        username,
      });
    }
  }
}
