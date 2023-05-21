import { ProfileData } from './ProfileData';

describe('ProfileData', () => {
  const sampleInput = {
    nTweet: 10,
    nFollower: 100,
    nFollowing: 50,
    location: 'Brazil',
    username: 'john123',
    name: 'John Doe',
    description: 'Sample description',
    createdAt: '2022-01-01T00:00:00.000Z',
    tweets: [
      {
        text: 'Hello world #Twitter',
        mentions: [],
        isReply: false,
        isRetweet: false,
      },
      {
        text: '@bob789 Retweet tweet',
        mentions: [{ username: 'bob789', id: '456' }],
        isReply: false,
        isRetweet: true,
      },
      {
        text: '@alice321 @bob789 Reply tweet',
        mentions: [
          { username: 'alice321', id: '789' },
          { username: 'bob789', id: '456' },
        ],
        isReply: true,
        isRetweet: false,
      },
    ],
  };

  it('should create an instance of ProfileData with correct property values', () => {
    const profileData = new ProfileData(sampleInput);

    expect(profileData.nTweet).toBe(10);
    expect(profileData.nFollower).toBe(100);
    expect(profileData.nFollowing).toBe(50);
    expect(profileData.location).toBe('Brazil');
    expect(profileData.hasLocation).toBe(true);
    expect(profileData.username).toBe('john123');
    expect(profileData.usernameSize).toBe(7);
    expect(profileData.name).toBe('John Doe');
    expect(profileData.nameSize).toBe(8);
    expect(profileData.descriptionSize).toBe(18);
    expect(profileData.nNumberUsername).toBe(3);
    expect(profileData.nLettersUsername).toBe(4);
    expect(profileData.accountAgeInDays).toBeGreaterThan(0);
    expect(profileData.timelineSampleFullSize).toBe(3);
    expect(profileData.timelineSampleReplySize).toBe(1);
    expect(profileData.timelineSampleRetweetSize).toBe(1);
    expect(profileData.timelineSampleUserTweetSize).toBe(2);
    expect(profileData.timelineSampleUserTweetTextSizeAvg).toBe(24.5);
    expect(profileData.timelineSampleHashtagCount).toBe(1);
    expect(profileData.timelineSampleMentionCount).toBe(2);
    expect(profileData.mentions.get('@alice321')).toBe(1);
    expect(profileData.mentions.get('@bob789')).toBe(2);
    expect(profileData.hashtags.get('#Twitter')).toBe(1);
  });
});
