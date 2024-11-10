import { ICategorizationConfig } from 'contracts/entities/ICategorizationConfig';
import { Schema, model } from 'mongoose';
import { schemaOptions } from '../SchemaOptions';

const CategorizationConfigSchema = new Schema<ICategorizationConfig>(
  {
    threshold: Number,
    limits: {
      followingToFollowerRatioScore: Number,
      retweetToTweetRatioScore: Number,
      mentionsPerUserScore: Number,
      tweetSizeAvgScore: Number,
      accountAgeScore: Number,
      hashtagUsageScore: Number,
      tweetCountToAccountAgeScore: Number,
      similarityBetweenNameAndUsernameScore: Number,
      avgTimeBetweenPostsScore: Number,
    },
    weights: {
      followingToFollowerRatioScore: Number,
      retweetToTweetRatioScore: Number,
      mentionsPerUserScore: Number,
      tweetSizeAvgScore: Number,
      accountAgeScore: Number,
      hashtagUsageScore: Number,
      tweetCountToAccountAgeScore: Number,
      similarityBetweenNameAndUsernameScore: Number,
      avgTimeBetweenPostsScore: Number,
    },
  },
  schemaOptions,
);

export const CategorizationConfigModel = model<ICategorizationConfig>(
  'CategorizationConfig',
  CategorizationConfigSchema,
);
