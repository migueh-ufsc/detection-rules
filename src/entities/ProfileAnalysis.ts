import {
  AccountType,
  IProfileAnalysis,
} from 'contracts/entities/IProfileAnalysis';
import { IProfileData } from 'contracts/entities/IProfileData';
import { Config } from 'infra/config';
import { distance } from 'fastest-levenshtein';

export class ProfileAnalysis implements IProfileAnalysis {
  _id: string;
  profileData: IProfileData;
  accountType?: AccountType;
  // Proporção de seguidos para seguidores
  readonly followingToFollowerRatioScore?: number;
  // Proporção de retweets entre os tweets da timeline
  readonly retweetToTweetRatioScore?: number;
  // Proporção de quantas menções únicas são feitas
  readonly mentionsPerUserScore?: number;
  // Média do tamanho dos tweets
  readonly tweetSizeAvgScore?: number;
  // Idade da conta em dias
  readonly accountAgeScore?: number;
  // Proporção de utilização de hashtags
  readonly hashtagUsageScore?: number;
  // Quantidade de tweets em relação a idade da conta
  readonly tweetCountToAccountAgeScore?: number;
  // Média de tempo de postagem entre um tweet e outro
  readonly similarityBetweenNameAndUsernameScore?: number;
  // Similaridade entre o nome do usuário e o username
  readonly avgTimeBetweenPostsScore?: number;

  constructor(props: IProfileAnalysis) {
    this.profileData = props.profileData;
    this.accountType = props.accountType;
    this.followingToFollowerRatioScore =
      this.calculateFollowingToFollowerRatio();
    this.retweetToTweetRatioScore = this.calculateRetweetToTweetRatio();
    this.mentionsPerUserScore = this.calculateUniqueMentionRatio();
    this.tweetSizeAvgScore = Math.log1p(
      this.profileData.timelineSampleUserTweetTextSizeAvg,
    );
    this.accountAgeScore = Math.log1p(props.profileData.accountAgeInDays);
    this.hashtagUsageScore = this.calculateUniqueHashtagRatio();
    this.tweetCountToAccountAgeScore = this.calculateTweetPerDay();
    this.similarityBetweenNameAndUsernameScore =
      this.calculateSimilarityBetweenNameAndUsername();
    this.avgTimeBetweenPostsScore = this.calculateAverageTimeBetweenTweets(); // in seconds
  }

  private calculateFollowingToFollowerRatio(): number {
    const ratio =
      this.profileData.nFollower !== 0
        ? this.profileData.nFollowing / this.profileData.nFollower
        : Config.ruleConfig.maxFFRatio; // Evita a divisão por zero

    return Math.log1p(Math.min(ratio, Config.ruleConfig.maxFFRatio));
  }

  private calculateUniqueHashtagRatio(): number | null {
    if (this.profileData.timelineSampleFullSize === 0) return null;

    const totalHashtags = this.profileData.timelineSampleHashtagCount;
    const uniqueHashtags = Object.keys(this.profileData.hashtags).length;

    if (totalHashtags === 0) {
      return 0; // para evitar divisão por zero
    }

    return Math.log1p(uniqueHashtags / totalHashtags);
  }

  private calculateUniqueMentionRatio(): number | null {
    if (this.profileData.timelineSampleFullSize === 0) return null; // nao considera essa heuristica pra timelinse vazias

    const totalMentions = this.profileData.timelineSampleMentionCount;
    const uniqueMentions = Object.keys(this.profileData.mentions).length;
    if (totalMentions === 0) return 0;

    return Math.log1p(uniqueMentions / totalMentions);
  }

  private calculateRetweetToTweetRatio(): number | null {
    if (this.profileData.timelineSampleFullSize === 0) return null; // desconsidera estatistica se nao tiver tweets
    return Math.log1p(
      this.profileData.timelineSampleRetweetSize /
        this.profileData.timelineSampleFullSize,
    );
  }

  private calculateSimilarityBetweenNameAndUsername(): number {
    return Math.log1p(
      distance(this.profileData.name, this.profileData.username),
    );
  }

  private calculateTweetPerDay(): number | null {
    if (this.profileData.timelineSampleFullSize === 0) return null; // desconsidera estatistica se nao tiver tweets
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
        acc + (new Date(curr).getTime() - new Date(arr[i - 1]).getTime()) / 1000 // ms to s
      );
    }, 0);

    return Math.log1p(totalDiff / timelineSamplePostCreatedAtDates.length);
  }
}
