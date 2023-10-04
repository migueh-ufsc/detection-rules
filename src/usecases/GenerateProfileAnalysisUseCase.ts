import { BaseUseCase } from 'contracts/usecases/BaseUseCase';
import { ProfileDataService } from 'services/ProfileDataService';
import { ProfileAnalysis } from 'entities/ProfileAnalysis';
import { ProfileAnalysisService } from 'services/ProfileAnalysisService';

export class GenerateProfileAnalysisUseCase implements BaseUseCase {
  constructor(
    private readonly profileDataService: ProfileDataService,
    private readonly profileAnalysisService: ProfileAnalysisService,
  ) {}

  async execute(username: string): Promise<void> {
    try {
      const profileData = await this.profileDataService.findByUsername(
        username,
      );

      const geProfileAnalysis =
        await this.profileAnalysisService.findAnalysisByProfileDataId(
          profileData._id,
        );

      if (geProfileAnalysis && geProfileAnalysis.length) return;

      const profileAnalysis = new ProfileAnalysis({ profileData });

      await this.profileAnalysisService.create(profileAnalysis);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
