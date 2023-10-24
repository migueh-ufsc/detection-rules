import {
  AccountType,
  IProfileAnalysis,
} from 'contracts/entities/IProfileAnalysis';
import { model, Schema, Types } from 'mongoose';
import { schemaOptions } from '../SchemaOptions';

export const ProfileAnalysisSchema = new Schema<IProfileAnalysis>(
  {
    profileData: { type: Types.ObjectId, ref: 'ProfileData' },
    accountType: { type: String, enum: AccountType },
    followingToFollowerRatioScore: { type: Number },
    retweetToTweetRatioScore: { type: Number },
    mentionsPerUserScore: { type: Number },
    tweetSizeAvgScore: { type: Number },
    accountAgeScore: { type: Number },
    hashtagUsageScore: { type: Number },
    tweetCountToAccountAgeScore: { type: Number },
    similarityBetweenNameAndUsernameScore: { type: Number },
    avgTimeBetweenPostsScore: { type: Number },
  },
  schemaOptions,
);

export const ProfileAnalysisModel = model<IProfileAnalysis>(
  'ProfileAnalysis',
  ProfileAnalysisSchema,
);
