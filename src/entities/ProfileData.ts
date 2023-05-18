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
  nNumberUsername: number;
  nLettersUsername: number;
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
    this.descriptionSize = props.description.length;

    this.nNumberUsername = this.getNumbersLengthFromString();
    this.nLettersUsername = this.getLettersLengthFromString();
    this.accountAgeInDays = this.countDaysBetweenDates(props.createdAt);
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
}
