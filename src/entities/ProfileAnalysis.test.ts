import { ProfileAnalysis } from './ProfileAnalysis';
import { IProfileData } from '../contracts/entities/IProfileData';
import { CategorizationConfigService } from '../services/CategorizationConfigService';

jest.mock('../services/CategorizationConfigService');

describe('ProfileAnalysis', () => {
  let profileData: IProfileData;
  let profileAnalysis: ProfileAnalysis;
  let configMock: any;

  beforeEach(() => {
    profileData = {
      nLettersUsername: 5,
      nameSize: 8,
      descriptionSize: 20,
      timelineSampleReplySize: 10,
      location: 'test location',
      hasLocation: true,
      usernameSize: 12,
      nNumberUsername: 3,
      nFollower: 100,
      nFollowing: 50,
      timelineSampleUserTweetTextSizeAvg: 100,
      accountAgeInDays: 365,
      timelineSampleFullSize: 100,
      timelineSampleHashtagCount: 50,
      hashtags: new Map([
        ['hashtag1', 1],
        ['hashtag2', 2],
      ]),
      timelineSampleMentionCount: 50,
      mentions: new Map([
        ['user1', 1],
        ['user2', 2],
      ]),
      timelineSampleRetweetSize: 50,
      name: 'testuser',
      username: 'testuser123',
      nTweet: 1000,
      timelineSampleUserTweetSize: 100,
      retweets: new Map([
        ['retweet1', 1],
        ['retweet2', 2],
      ]),
      timelineSamplePostCreatedAtDates: [
        new Date('2023-01-01T00:00:00Z'),
        new Date('2023-01-02T00:00:00Z'),
      ],
    };

    configMock = {
      limits: {
        followingToFollowerRatioScore: 10,
        retweetToTweetRatioScore: 10,
      },
    };

    (CategorizationConfigService.prototype.find as jest.Mock).mockResolvedValue(
      [configMock],
    );

    profileAnalysis = new ProfileAnalysis({ profileData });
  });

  it('should calculate following to follower ratio score', async () => {
    await profileAnalysis.generateAnalysis();
    expect(profileAnalysis.followingToFollowerRatioScore).toBeCloseTo(
      Math.log1p(0.5),
    );
  });

  it('should calculate retweet to tweet ratio score', async () => {
    await profileAnalysis.generateAnalysis();
    expect(profileAnalysis.retweetToTweetRatioScore).toBeCloseTo(
      Math.log1p(0.5),
    );
  });

  it('should calculate unique mention ratio score', async () => {
    await profileAnalysis.generateAnalysis();
    expect(profileAnalysis.mentionsPerUserScore).toBeCloseTo(
      Math.log1p(2 / 50),
    );
  });

  it('should calculate tweet size average score', async () => {
    await profileAnalysis.generateAnalysis();
    expect(profileAnalysis.tweetSizeAvgScore).toBeCloseTo(Math.log1p(100));
  });

  it('should calculate account age score', async () => {
    await profileAnalysis.generateAnalysis();
    expect(profileAnalysis.accountAgeScore).toBeCloseTo(Math.log1p(365));
  });

  it('should calculate unique hashtag ratio score', async () => {
    await profileAnalysis.generateAnalysis();
    expect(profileAnalysis.hashtagUsageScore).toBeCloseTo(Math.log1p(2 / 50));
  });

  it('should calculate tweet count to account age score', async () => {
    await profileAnalysis.generateAnalysis();
    expect(profileAnalysis.tweetCountToAccountAgeScore).toBeCloseTo(
      Math.log1p(1000 / 365),
    );
  });

  it('should calculate average time between posts score', async () => {
    await profileAnalysis.generateAnalysis();
    const totalDiff =
      (new Date('2023-01-02T00:00:00Z').getTime() -
        new Date('2023-01-01T00:00:00Z').getTime()) /
      1000;
    expect(profileAnalysis.avgTimeBetweenPostsScore).toBeCloseTo(
      Math.log1p(totalDiff / 2),
    );
  });

  it('should calculate similarity between name and username score', async () => {
    await profileAnalysis.generateAnalysis();
    expect(profileAnalysis.similarityBetweenNameAndUsernameScore).toBeCloseTo(
      Math.log1p(3),
    ); // Levenshtein distance between 'testuser' and 'testuser123'
  });
});
