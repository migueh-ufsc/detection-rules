/* eslint-disable prettier/prettier */
import { BaseUseCase } from 'contracts/usecases/BaseUseCase';
import { GenerateProfileDataUseCase } from './GenerateProfileDataUseCase';
import { CategorizationConfigService } from 'services/CategorizationConfigService';
import { GenerateProfileAnalysisUseCase } from './GenerateProfileAnalysisUseCase';
import { logger } from 'infra/logger';
import { normalize } from 'common/Utils';
import { ICategorizationConfig } from 'contracts/entities/ICategorizationConfig';
import { IProfileAnalysis } from 'contracts/entities/IProfileAnalysis';
import { ProfileAnalysisService } from 'services/ProfileAnalysisService';

const skipFields = [
  '_id',
  'profileData',
  'accountType',
  'createdAt',
  'updatedAt',
  '__v',
];
const invertRules = [
  'accountAgeScore',
  'tweetCountToAccountAgeScore',
  'similarityBetweenNameAndUsernameScore',
];

export class CategorizationUseCase implements BaseUseCase {
  constructor(
    private readonly configService: CategorizationConfigService,
    private readonly generateProfileDataUseCase: GenerateProfileDataUseCase,
    private readonly generateProfileAnalysisUseCase: GenerateProfileAnalysisUseCase,
    private readonly profileAnalysisService: ProfileAnalysisService,
  ) {}

  async execute({
    id,
    username,
    force = false,
  }: {
    id?: string;
    username?: string;
    force?: boolean;
  }): Promise<IProfileAnalysis> {
    if (!id && !username) {
      throw new Error('User ID or username is required');
    }

    try {
      const [config] = await this.configService.find({});
      await this.generateProfileDataUseCase.execute({ id, username, force });
      const profileAnalysis = await this.generateProfileAnalysisUseCase.execute(
        username,
        force,
      );
      const updatedAnalysis = await this.categorize(config, profileAnalysis);
      return updatedAnalysis;
    } catch (error) {
      logger.error('Error while categorizing user');
      logger.error(error);
      throw error;
    }
  }

  private async categorize(
    config: ICategorizationConfig,
    profileAnalysis: IProfileAnalysis,
  ): Promise<IProfileAnalysis> {
    if (profileAnalysis.accountScore) return profileAnalysis;

    const { limits, weights } = config;
    let finalScore = 0;

    for (const rule of Object.entries(profileAnalysis)) {
      const [key, value] = rule;

      if (skipFields.includes(key)) continue;

      const weight = weights[key];
      const limit = limits[key];
      const score = invertRules.includes(key)
        ? (1 - normalize(value, 0, limit)) * weight
        : normalize(value, 0, limit) * weight;

      finalScore += score;
    }

    await this.profileAnalysisService.update(
      { _id: profileAnalysis._id },
      {
        accountScore: finalScore,
      },
    );

    const [updatedAnalysis] = await this.profileAnalysisService.find({
      _id: profileAnalysis._id,
    });

    return updatedAnalysis;
  }
}
