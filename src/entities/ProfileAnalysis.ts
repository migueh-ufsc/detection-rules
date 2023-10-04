import {
  AccountType,
  IProfileAnalysis,
} from 'contracts/entities/IProfileAnalysis';
import { IProfileData } from 'contracts/entities/IProfileData';

export class ProfileAnalysis implements IProfileAnalysis {
  _id: string;
  profileData: IProfileData;
  accountType?: AccountType;
  followerToFollowingRatioScore?: number;
  retweetToTweetRatioScore?: number;
  mentionsPerUserScore?: number;
  tweetSizeAvgScore?: number;
  accountAgeScore?: number;
  hashtagUsageScore?: number;
  tweetCountToAccountAgeScore?: number;
  descriptionTextSizeScore?: number;
  similarityBetweenNameAndUsernameScore?: number;
  numberToLetterRatioOnUsernameScore?: number;
  avgTimeBetweenPostsScore?: number;

  constructor(props: IProfileAnalysis) {
    this.profileData = props.profileData;
    this.accountType = props.accountType;
    this.followerToFollowingRatioScore = this.followerToFollowingRatio();
    this.retweetToTweetRatioScore = props.retweetToTweetRatioScore;
    this.mentionsPerUserScore = props.mentionsPerUserScore;
    this.tweetSizeAvgScore = props.tweetSizeAvgScore;
    this.accountAgeScore = props.accountAgeScore;
    this.hashtagUsageScore = props.hashtagUsageScore;
    this.tweetCountToAccountAgeScore = props.tweetCountToAccountAgeScore;
    this.descriptionTextSizeScore = props.descriptionTextSizeScore;
    this.similarityBetweenNameAndUsernameScore =
      props.similarityBetweenNameAndUsernameScore;
    this.numberToLetterRatioOnUsernameScore =
      props.numberToLetterRatioOnUsernameScore;
    this.avgTimeBetweenPostsScore = props.avgTimeBetweenPostsScore;
  }

  private followerToFollowingRatio(): number {
    if (this.profileData.nFollowing === 0) {
      return this.profileData.nFollower;
    }
    return this.profileData.nFollower / this.profileData.nFollowing;
  }
}
