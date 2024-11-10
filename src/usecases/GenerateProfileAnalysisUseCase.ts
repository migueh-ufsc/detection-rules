/* eslint-disable prettier/prettier */
import { BaseUseCase } from 'contracts/usecases/BaseUseCase';
import { ProfileDataService } from 'services/ProfileDataService';
import { ProfileAnalysis } from 'entities/ProfileAnalysis';
import { ProfileAnalysisService } from 'services/ProfileAnalysisService';
import { IProfileAnalysis } from 'contracts/entities/IProfileAnalysis';

export class GenerateProfileAnalysisUseCase implements BaseUseCase {
  constructor(
    private readonly profileDataService: ProfileDataService,
    private readonly profileAnalysisService: ProfileAnalysisService,
  ) {}

  async execute(username: string, force?: boolean): Promise<IProfileAnalysis> {
    try {
      const profileData = await this.profileDataService.findByUsername(
        username,
      );

      const geProfileAnalysis =
        await this.profileAnalysisService.findAnalysisByProfileDataId(
          profileData._id,
        );

      if (!force && geProfileAnalysis && geProfileAnalysis.length)
        return geProfileAnalysis[0] as ProfileAnalysis;

      const profileAnalysis = new ProfileAnalysis({ profileData });
      await profileAnalysis.generateAnalysis();
      await this.profileAnalysisService.create(profileAnalysis);

      return profileAnalysis;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
