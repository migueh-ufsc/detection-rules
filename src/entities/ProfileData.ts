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

const mentionRegex = /@(\w+)/g;
const hashtagRegex = /#(\w+)/g;

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

  readonly timelineSampleUserTweetTextSizeAvg: number;
  readonly timelineSampleHashtagCount: number;
  readonly timelineSampleMentionCount: number;
  timelineSamplePostCreatedAtDates: Date[];

  mentions: Map<string, number>;
  hashtags: Map<string, number>;
  retweets: Map<string, number>;

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

    this.timelineSampleUserTweetTextSizeAvg = this.tweetAvgTextSize(
      props.tweets,
    );

    this.timelineSampleHashtagCount = this.countHashtags(props.tweets);
    this.timelineSampleMentionCount = this.countMentions(props.tweets);

    this.mentions = this.mapMentions(props.tweets);
    this.hashtags = this.mapHashtags(props.tweets);
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

  private tweetAvgTextSize(tweets: Array<InpuTweetType>): number {
    if (tweets.length === 0) return 0;

    const userTweets = tweets.filter((tweet) => !tweet.isRetweet);
    if (userTweets.length === 0) return 0;

    const totalLength = userTweets.reduce(
      (total, tweet) => total + tweet.text.length,
      0,
    );

    return totalLength / userTweets.length;
  }

  private countHashtags(tweets: Array<InpuTweetType>): number {
    return tweets.reduce((total, tweet) => {
      const matches = tweet.text.match(hashtagRegex);
      return total + (matches ? matches.length : 0);
    }, 0);
  }

  private countMentions(tweets: Array<InpuTweetType>): number {
    return tweets.reduce((total, tweet) => {
      return (
        total + (tweet.mentions && !tweet.isRetweet ? tweet.mentions.length : 0)
      );
    }, 0);
  }

  private mapMentions(tweets: Array<InpuTweetType>): Map<string, number> {
    const mapOfMentions = new Map<string, number>();
    for (const tweet of tweets) {
      const mentions = tweet.text.match(mentionRegex);
      if (mentions) {
        for (const mention of mentions) {
          if (!mapOfMentions.has(mention)) mapOfMentions.set(mention, 0);
          mapOfMentions.set(mention, mapOfMentions.get(mention) + 1);
        }
      }
    }

    return mapOfMentions;
  }

  private mapHashtags(tweets: Array<InpuTweetType>): Map<string, number> {
    const mapOfHashtags = new Map<string, number>();
    for (const tweet of tweets) {
      const hashtags = tweet.text.match(hashtagRegex);
      if (hashtags) {
        for (const mention of hashtags) {
          if (!mapOfHashtags.has(mention)) mapOfHashtags.set(mention, 0);
          mapOfHashtags.set(mention, mapOfHashtags.get(mention) + 1);
        }
      }
    }

    return mapOfHashtags;
  }
}
