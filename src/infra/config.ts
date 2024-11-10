import * as dotenv from 'dotenv';
dotenv.config();

export abstract class Config {
  static readonly mongoURI = process.env.MONGODB_URI;
  static readonly serverPort = process.env.SERVER_PORT || 3000;
  static readonly logLevel = process.env.LOG_LEVEL || 'info';
  static readonly twitterIntegrationURL =
    process.env.TWITTER_INTEGRATION_API || '';

  static readonly ruleConfig = {
    maxFFRatio: parseFloat(process.env.MAX_LIMIT_FOLLOWING_TO_FOLLOWER),
    maxUniqueMentionRatio: parseFloat(process.env.MAX_LIMIT_UNIQUE_MENTIONS),
  };
}
