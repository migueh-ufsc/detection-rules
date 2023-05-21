import { IProfileData } from 'contracts/entities/IProfileData';

type InpuTweetType = {
  text: string;
  mentions?: { username: string; id: string }[];
  isReply: boolean;
  isRetweet: boolean;
};

export type InputProfileData = Pick<
  IProfileData,
  'nTweet' | 'nFollower' | 'nFollowing' | 'location' | 'username' | 'name'
> & {
  tweets: InpuTweetType[];
  description: string;
  createdAt: string;
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
  readonly descriptionSize: number;
  readonly nNumberUsername: number;
  readonly nLettersUsername: number;
  readonly accountAgeInDays: number;

  readonly timelineSampleFullSize: number;
  readonly timelineSampleReplySize: number;
  readonly timelineSampleRetweetSize: number;
  readonly timelineSampleUserTweetSize: number;

  timelineSampleUserTweetTextSizeAvg: number;
  timelineSampleHashtagCount: number;
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
    this.descriptionSize = props.description.length;
    this.timelineSampleFullSize = props.tweets.length;

    this.nNumberUsername = this.getNumbersLengthFromString();
    this.nLettersUsername = this.getLettersLengthFromString();
    this.accountAgeInDays = this.countDaysBetweenDates(props.createdAt);

    this.timelineSampleRetweetSize = this.calculateRetweet(props.tweets);
    this.timelineSampleReplySize = this.calculateReply(props.tweets);
    this.timelineSampleUserTweetSize = this.calculateUserTweets(props.tweets);
  }

  private getLettersLengthFromString(): number {
    const lettersRegex = /[a-zA-Z]+/g;
    const lettersMatch = this.username.match(lettersRegex);
    const lettersText = lettersMatch ? lettersMatch.join('') : '';
    return lettersText.length;
  }

  private getNumbersLengthFromString(): number {
    const numbersRegex = /\d+/g;
    const numbersMatch = this.username.match(numbersRegex);
    const numbersText = numbersMatch ? numbersMatch.join('') : '';
    return numbersText.length;
  }

  private countDaysBetweenDates(pastDateISO: string): number {
    const pastDate = new Date(pastDateISO);
    const today = new Date();
    const timeDifference = today.getTime() - pastDate.getTime();
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return dayDifference;
  }

  private calculateRetweet(tweets: Array<InpuTweetType>): number {
    return tweets.reduce(
      (count, tweet) => (tweet.isRetweet ? count + 1 : count),
      0,
    );
  }

  private calculateReply(tweets: Array<InpuTweetType>): number {
    return tweets.reduce(
      (count, tweet) => (tweet.isReply ? count + 1 : count),
      0,
    );
  }

  private calculateUserTweets(tweets: Array<InpuTweetType>): number {
    return tweets.reduce(
      (count, tweet) => (!tweet.isRetweet ? count + 1 : count),
      0,
    );
  }
}
