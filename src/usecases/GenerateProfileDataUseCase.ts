import { BaseUseCase } from 'contracts/usecases/BaseUseCase';
import { ProfileData } from 'entities/ProfileData';
import { ProfileDataService } from 'services/ProfileDataService';
import { TwitterIntegrationService } from 'integrations/twitter-integration/TwitterIntegrationService';

export class GenerateProfileDataUseCase implements BaseUseCase {
  constructor(private readonly profileDataService: ProfileDataService) {}

  async execute(input: {
    username?: string;
    id?: string;
  }): Promise<ProfileData> {
    try {
      const userData = await TwitterIntegrationService.getUserData(input);

      if (await this.profileDataService.exists(userData.username)) return;

      const profileData = new ProfileData({
        name: userData.name,
        username: userData.username,
        description: userData.description,
        location: userData.location,
        nTweet: userData.nTweets,
        nFollower: userData.nFollowers,
        nFollowing: userData.nFollowing,
        tweets: userData.sampleTimeline,
        createdAt: userData.accountCreatedAt,
      });

      await this.profileDataService.create(profileData);
      return profileData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
