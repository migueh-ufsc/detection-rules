import { BaseUseCase } from 'contracts/usecases/BaseUseCase';
import { ProfileData } from 'entities/ProfileData';
import { ProfileDataService } from 'services/ProfileDataService';
import { TwitterIntegrationService } from 'src/integrations/twitter-integration/TwitterIntegrationService';

export class GenerateProfileDataUseCase implements BaseUseCase {
  constructor(private readonly profileDataService: ProfileDataService) {}

  async execute(input: { username?: string; id?: string }): Promise<void> {
    const userData = await TwitterIntegrationService.getUserData(input);

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
  }
}
