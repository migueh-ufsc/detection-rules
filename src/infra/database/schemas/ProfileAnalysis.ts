import {
  AccountType,
  IProfileAnalysis,
} from 'contracts/entities/IProfileAnalysis';
import { model, Schema } from 'mongoose';
import { schemaOptions } from '../SchemaOptions';

export const ProfileAnalysisSchema = new Schema<IProfileAnalysis>(
  {
    accountType: {
      type: String,
      enum: AccountType,
    },
    followerToFollowingRatioScore: {
      type: Number,
    },
    retweetToReplyToTweetRatioScore: {
      type: Number,
    },
    tweetSizeAvgScore: {
      type: Number,
    },
    accountAgeScore: {
      type: Number,
    },
    hashtagUsageScore: {
      type: Number,
    },
    tweetCountToAccountAgeScore: {
      type: Number,
    },
    descriptionTextSizeScore: {
      type: Number,
    },
    similarityBetweenNameAndUsernameScore: {
      type: Number,
    },
    numberToLetterRatioOnUsernameScore: {
      type: Number,
    },
  },
  schemaOptions,
);

export const ProfileAnalysisModel = model<IProfileAnalysis>(
  'ProfileAnalysis',
  ProfileAnalysisSchema,
);
