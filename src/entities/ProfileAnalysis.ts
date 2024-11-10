import {
  AccountType,
  IProfileAnalysis,
} from '../contracts/entities/IProfileAnalysis';
import { IProfileData } from '../contracts/entities/IProfileData';
import { distance } from 'fastest-levenshtein';
import { CategorizationConfigService } from '../services/CategorizationConfigService';

export class ProfileAnalysis implements IProfileAnalysis {
  _id: string;
  profileData: IProfileData;
  accountType?: AccountType;
  // Proporção de seguidos para seguidores
  followingToFollowerRatioScore?: number;
  // Proporção de retweets entre os tweets da timeline
  retweetToTweetRatioScore?: number;
  // Proporção de quantas menções únicas são feitas
  mentionsPerUserScore?: number;
  // Média do tamanho dos tweets
  tweetSizeAvgScore?: number;
  // Idade da conta em dias
  accountAgeScore?: number;
  // Proporção de utilização de hashtags
  hashtagUsageScore?: number;
  // Quantidade de tweets em relação a idade da conta
  tweetCountToAccountAgeScore?: number;
  // Média de tempo de postagem entre um tweet e outro
  similarityBetweenNameAndUsernameScore?: number;
  // Similaridade entre o nome do usuário e o username
  avgTimeBetweenPostsScore?: number;

  constructor(props: IProfileAnalysis) {
    this.profileData = props.profileData;
    this.accountType = props.accountType;
  }

  async generateAnalysis(): Promise<void> {
    const { timelineSampleUserTweetTextSizeAvg, accountAgeInDays } =
      this.profileData;
    const [config] = await new CategorizationConfigService().find({});
    const { limits } = config;

    // quanto mais proixmo de 0, mais humano
    this.followingToFollowerRatioScore = this.calculateFollowingToFollowerRatio(
      limits.followingToFollowerRatioScore,
    );

    // quanto mais proximo de 0, mais humano
    this.retweetToTweetRatioScore = this.calculateRetweetToTweetRatio(
      limits.retweetToTweetRatioScore,
    );

    // quanto mais proximo de 0, mais bot
    this.mentionsPerUserScore = this.calculateUniqueMentionRatio();

    // quanto mais proximo de 0, mais bot
    this.tweetSizeAvgScore = Math.log1p(timelineSampleUserTweetTextSizeAvg);

    // quanto mais proximo de 0, mais bot
    this.accountAgeScore = Math.log1p(accountAgeInDays);

    // quanto mais proximo de 0, mais bot
    this.hashtagUsageScore = this.calculateUniqueHashtagRatio();

    // quanto mais proximo de 0, mais human
    this.tweetCountToAccountAgeScore = this.calculateTweetPerDay();

    // quanto mais proximo de 0, mais bot
    this.avgTimeBetweenPostsScore = this.calculateAverageTimeBetweenTweets(); // in seconds

    // quanto mais proixmo de 0, mais human
    this.similarityBetweenNameAndUsernameScore =
      this.calculateSimilarityBetweenNameAndUsername();
  }

  private calculateFollowingToFollowerRatio(limit: number): number {
    const ratio =
      this.profileData.nFollower !== 0
        ? this.profileData.nFollowing / this.profileData.nFollower
        : limit; // Evita a divisão por zero

    return Math.log1p(Math.min(ratio, limit));
  }

  private calculateUniqueHashtagRatio(): number | null {
    if (
      this.profileData.timelineSampleFullSize === 0 ||
      this.profileData.timelineSampleHashtagCount === 0
    )
      return null;

    const totalHashtags = this.profileData.timelineSampleHashtagCount;
    const uniqueHashtags = Object.keys(this.profileData.hashtags).length;

    return Math.log1p(uniqueHashtags / totalHashtags);
  }

  private calculateUniqueMentionRatio(): number | null {
    if (
      this.profileData.timelineSampleFullSize === 0 ||
      this.profileData.timelineSampleMentionCount === 0
    )
      return null; // não considera essa heurística para timelines vazias

    const totalMentions = this.profileData.timelineSampleMentionCount;
    const uniqueMentions = Object.keys(this.profileData.mentions).length;

    return Math.log1p(uniqueMentions / totalMentions);
  }

  private calculateRetweetToTweetRatio(limit: number): number | null {
    if (this.profileData.timelineSampleFullSize === 0) return null; // desconsidera estatística se não houver tweets

    const ratio =
      this.profileData.timelineSampleRetweetSize !== 0
        ? this.profileData.timelineSampleRetweetSize /
          this.profileData.timelineSampleFullSize
        : limit;
    return Math.log1p(Math.min(ratio, limit));
  }

  private calculateSimilarityBetweenNameAndUsername(): number {
    return Math.log1p(
      distance(this.profileData.name, this.profileData.username),
    );
  }

  private calculateTweetPerDay(): number | null {
    if (this.profileData.nTweet === 0) return null; // desconsidera estatística se não houver tweets
    return Math.log1p(
      this.profileData.nTweet / this.profileData.accountAgeInDays,
    );
  }

  private calculateAverageTimeBetweenTweets(): number | null {
    const { timelineSamplePostCreatedAtDates } = this.profileData;

    if (timelineSamplePostCreatedAtDates.length <= 1) return null;

    const sortedDates = timelineSamplePostCreatedAtDates.sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );

    const totalDiff = sortedDates.reduce((acc, curr, i, arr) => {
      if (i === 0) return acc;
      return (
        acc + (new Date(curr).getTime() - new Date(arr[i - 1]).getTime()) / 1000 // ms para s
      );
    }, 0);

    return Math.log1p(totalDiff / timelineSamplePostCreatedAtDates.length);
  }
}
