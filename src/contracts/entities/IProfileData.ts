export interface IProfileData {
  /** Dados do usário */
  nTweet: number;
  nFollower: number;
  nFollowing: number;
  //following to follower ratio
  ffRatio: number;
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
  timelineSampleReplyRatio: number /** quantos tweets sao reply */;
  timelineSampleRetweetRatio: number /** quantos tweets sao retweet */;
  timelineSampleTweetRatio: number /** quantos tweets sao tweets propios */;
  timelineSampleTweetSizeAvg: number /** media do tamanho dos tweets 0-280 */;
  timelineSampleHashtagCount: number;
  timelineSampleRetweetCount: number;
  timelineSampleMentionCount: number;
  timelineSampleUniqueHashtagCount: number;
  timelineSampleUniqueRetweetCount: number;
  timelineSampleUniqueMentionCount: number;
}
