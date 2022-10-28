import { IProfileData } from 'contracts/entities/IProfileData';
import { model, Schema } from 'mongoose';
import { schemaOptions } from '../SchemaOptions';

export const ProfileDataSchema = new Schema<IProfileData>(
  {
    nTweet: {
      type: Number,
    },
    nFollower: {
      type: Number,
    },
    nFollowing: {
      type: Number,
    },
    ffRatio: {
      type: Number,
    },
    location: {
      type: String,
    },
    hasLocation: {
      type: Boolean,
    },
    username: {
      type: String,
    },
    usernameSize: {
      type: Number,
    },
    nNumberUsername: {
      type: Number,
    },
    nLettersUsername: {
      type: Number,
    },
    name: {
      type: String,
    },
    nameSize: {
      type: Number,
    },
    descriptionSize: {
      type: Number,
    },
    accountAgeInDays: {
      type: Number,
    },
    timelineSampleReplyRatio: {
      type: Number,
    },
    timelineSampleRetweetRatio: {
      type: Number,
    },
    timelineSampleTweetRatio: {
      type: Number,
    },
    timelineSampleTweetSizeAvg: {
      type: Number,
    },
    timelineSampleHashtagCount: {
      type: Number,
    },
    timelineSampleRetweetCount: {
      type: Number,
    },
    timelineSampleMentionCount: {
      type: Number,
    },
    timelineSampleUniqueHashtagCount: {
      type: Number,
    },
    timelineSampleUniqueRetweetCount: {
      type: Number,
    },
    timelineSampleUniqueMentionCount: {
      type: Number,
    },
  },
  schemaOptions,
);

export const ProfileDataModel = model<IProfileData>(
  'ProfileData',
  ProfileDataSchema,
);
