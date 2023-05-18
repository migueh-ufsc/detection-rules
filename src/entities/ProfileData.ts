import { IProfileData } from 'contracts/entities/IProfileData';

export type InputProfileData = Pick<
  IProfileData,
  'nTweet' | 'nFollower' | 'nFollowing' | 'location' | 'username' | 'name'
> & {
  tweets: {
    text: string;
    mentions?: { username: string; id: string }[];
    isReply: boolean;
    isRetweet: boolean;
  }[];
};

export class ProfileData implements IProfileData {
  readonly nTweet: number;
  readonly nFollower: number;
  readonly nFollowing: number;
  readonly location: string;
  readonly hasLocation: boolean;
  readonly username: string;
  readonly usernameSize: number;
  readonly name: string;
  readonly nameSize: number;
  nNumberUsername: number;
  nLettersUsername: number;
  descriptionSize: number;
  accountAgeInDays: number;
  timelineSampleFullSize: number;
  timelineSampleReplySize: number;
  timelineSampleRetweetSize: number;
  timelineSampleUserTweetSize: number;
  timelineSampleUserTweetTextSizeAvg: number;
  timelineSampleHashtagCount: number;
  timelineSampleRetweetCount: number;
  timelineSampleMentionCount: number;
  timelineSamplePostCreatedAtDates: Date[];
  mentions: Record<string, number>;
  hashtags: Record<string, number>;
  retweets: Record<string, number>;

  constructor(props: InputProfileData) {
    this.nTweet = props.nTweet;
    this.nFollower = props.nFollower;
    this.nFollowing = props.nFollowing;
    this.location = props.location;
    this.hasLocation = !!props.location;
    this.username = props.username;
    this.usernameSize = props.username.length;
    this.name = props.name;
    this.nameSize = props.name.length;
  }
}
