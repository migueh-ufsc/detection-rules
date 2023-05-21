export interface IProfileData {
  /** Dados do usário */
  nTweet: number;
  nFollower: number;
  nFollowing: number;
  location: string;
  hasLocation: boolean;
  username: string;
  usernameSize: number;
  nNumberUsername: number;
  nLettersUsername: number;
  name: string;
  nameSize: number;
  descriptionSize: number;
  accountAgeInDays: number;
  /** Dados da timeline aka postagens dos tweets */
  timelineSampleFullSize: number /** total de tweets no sample, pode ser de 0 até o sample definido na integração (provavelmente 30) */;
  timelineSampleReplySize: number /** quantos tweets sao reply */;
  timelineSampleRetweetSize: number /** quantos tweets sao retweet */;
  timelineSampleUserTweetSize: number /** quantos tweets sao tweets propios */;
  timelineSampleUserTweetTextSizeAvg: number /** media do tamanho dos tweets 0-280 */;
  timelineSampleHashtagCount: number;
  timelineSampleMentionCount: number;
  timelineSamplePostCreatedAtDates: Date[];
  mentions: Record<string, number>;
  hashtags: Record<string, number>;
  retweets: Record<string, number>;
}
