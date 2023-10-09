import { IProfileData } from 'contracts/entities/IProfileData';
import mongoose, { model, Schema } from 'mongoose';
import { schemaOptions } from '../SchemaOptions';

export const ProfileDataSchema = new Schema<IProfileData>(
  {
    nTweet: { type: Number },
    nFollower: { type: Number },
    nFollowing: { type: Number },
    location: { type: String },
    hasLocation: { type: Boolean },
    username: { type: String },
    usernameSize: { type: Number },
    nNumberUsername: { type: Number },
    nLettersUsername: { type: Number },
    name: { type: String },
    nameSize: { type: Number },
    descriptionSize: { type: Number },
    accountAgeInDays: { type: Number },
    timelineSampleFullSize: { type: Number },
    timelineSampleReplySize: { type: Number },
    timelineSampleRetweetSize: { type: Number },
    timelineSampleUserTweetSize: { type: Number },
    timelineSampleUserTweetTextSizeAvg: { type: Number },
    timelineSampleHashtagCount: { type: Number },
    timelineSampleMentionCount: { type: Number },
    timelineSamplePostCreatedAtDates: [{ type: Date }],
    mentions: { type: Object },
    hashtags: { type: mongoose.SchemaTypes.Map, of: Number },
    retweets: { type: Object },
  },
  schemaOptions,
);

export const ProfileDataModel = model<IProfileData>(
  'ProfileData',
  ProfileDataSchema,
);
