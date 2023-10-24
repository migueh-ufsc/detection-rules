import { normalize } from 'common/Utils';
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
  readonly followingToFollowerRatioScore?: number;
  readonly retweetToTweetRatioScore?: number | null;
  readonly mentionsPerUserScore?: number;
  readonly tweetSizeAvgScore?: number;
  readonly accountAgeScore?: number;
  readonly hashtagUsageScore?: number;
  tweetCountToAccountAgeScore?: number;
  readonly descriptionTextSizeScore?: number;
  readonly similarityBetweenNameAndUsernameScore?: number;
  numberToLetterRatioOnUsernameScore?: number;
  avgTimeBetweenPostsScore?: number;

  constructor(props: IProfileAnalysis) {
    this.profileData = props.profileData;
    this.accountType = props.accountType;
    this.followingToFollowerRatioScore =
      this.calculateFollowingToFollowerRatio();
    this.retweetToTweetRatioScore = this.calculateRetweetToTweetRatio();
    this.mentionsPerUserScore = this.calculateUniqueMentionRatio();
    this.tweetSizeAvgScore = props.tweetSizeAvgScore;
    this.accountAgeScore = props.accountAgeScore;
    this.hashtagUsageScore = this.calculateUniqueHashtagRatio();
    this.tweetCountToAccountAgeScore = props.tweetCountToAccountAgeScore;
    this.descriptionTextSizeScore = props.descriptionTextSizeScore;
    this.similarityBetweenNameAndUsernameScore =
      this.calculateSimilarityBetweenNameAndUsername();
    this.numberToLetterRatioOnUsernameScore =
      props.numberToLetterRatioOnUsernameScore;
    this.avgTimeBetweenPostsScore = props.avgTimeBetweenPostsScore;
  }

  private calculateFollowingToFollowerRatio(): number {
    const ratio =
      this.profileData.nFollower !== 0
        ? this.profileData.nFollowing / this.profileData.nFollower
        : Config.ruleConfig.maxFFRatio; // Evita a divisão por zero

    return Math.min(ratio, Config.ruleConfig.maxFFRatio);
  }

  private calculateUniqueHashtagRatio(): number | null {
    if (this.profileData.timelineSampleFullSize === 0) return null;

    const totalHashtags = this.profileData.timelineSampleHashtagCount;
    const uniqueHashtags = this.profileData.hashtags.size;

    if (totalHashtags === 0) {
      return 0; // para evitar divisão por zero
    }

    return uniqueHashtags / totalHashtags;
  }

  private calculateUniqueMentionRatio(): number | null {
    if (this.profileData.timelineSampleFullSize === 0) return null; // nao considera essa heuristica pra timelinse vazias

    const totalMentions = this.profileData.timelineSampleMentionCount;
    const uniqueMentions = this.profileData.mentions.size;
    if (totalMentions === 0) return 0;
    return normalize(
      uniqueMentions / totalMentions,
      0,
      Config.ruleConfig.maxUniqueMentionRatio,
    );
  }

  private calculateRetweetToTweetRatio(): number | null {
    if (this.profileData.timelineSampleFullSize === 0) return null; // desconsidera estatistica se nao tiver tweets
    return (
      this.profileData.timelineSampleRetweetSize /
      this.profileData.timelineSampleFullSize
    );
  }

  private calculateSimilarityBetweenNameAndUsername(): number {
    return distance(this.profileData.name, this.profileData.username);
  }
}
