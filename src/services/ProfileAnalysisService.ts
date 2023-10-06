import { IProfileAnalysis } from 'contracts/entities/IProfileAnalysis';
import { ProfileAnalysisModel } from 'infra/database/schemas/ProfileAnalysisSchema';
import { logger } from 'infra/logger';
import { BaseService } from './BaseService';
import { FilterQuery } from 'mongoose';

export class ProfileAnalysisService extends BaseService<IProfileAnalysis> {
  constructor() {
    super(ProfileAnalysisModel);
  }

  async findAnalysisByProfileDataId(
    profileDataId: string,
  ): Promise<IProfileAnalysis[]> {
    try {
      return await this.model.find({ profileData: profileDataId }).lean();
    } catch (error) {
      logger.error(
        'Error while trying to find profile analysis by profile data id on database',
        {
          name: this.model.modelName,
          profileDataId,
        },
      );
    }
  }

  async findByUsername(username: string): Promise<IProfileAnalysis[]> {
    try {
      return await this.model
        .find({
          'profileData.$username': username,
        })
        .lean();
    } catch (error) {
      logger.error(
        'Error while trying to find profile analysis by username on database',
        {
          name: this.model.modelName,
          username,
        },
      );
    }
  }

  async findWithProfileData(
    query: FilterQuery<IProfileAnalysis>,
  ): Promise<IProfileAnalysis[]> {
    try {
      const response = await this.model.find(query).populate('profileData');
      return response;
    } catch (error) {
      logger.error(
        'Error while trying to find profile analysis by username on database',
        {
          name: this.model.modelName,
        },
      );
    }
  }
}
