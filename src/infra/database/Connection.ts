import { connect, connection } from 'mongoose';
import { Config } from '../config';
import { logger } from '../logger';
import { CategorizationConfigModel } from './schemas/CategorizationConfigSchema';

class Database {
  public readonly uri: string = Config.mongoURI;

  async init(): Promise<void> {
    try {
      connection.on('disconnected', async () => {
        logger.info('Trying to connect database again');
        await connect(this.uri);
      });

      connection.on('error', async () => {
        logger.error('Error connecting to database');
        process.exit();
      });

      logger.info('Connecting to database with uri %s', this.uri);
      await connect(this.uri);
      await this.createCategorizationConfig();
    } catch (error) {
      logger.error('Error while connecting to database: %s', error.message);
      throw error;
    }
  }

  private async createCategorizationConfig(): Promise<void> {
    const existingConfig = await CategorizationConfigModel.findOne();
    if (!existingConfig) {
      const config = new CategorizationConfigModel({
        limits: {
          followingToFollowerRatioScore: 3.008,
          retweetToTweetRatioScore: 1.165,
          mentionsPerUserScore: 1.835,
          tweetSizeAvgScore: 6.36,
          accountAgeScore: 9.962,
          hashtagUsageScore: 1.238,
          tweetCountToAccountAgeScore: 4.798,
          avgTimeBetweenPostsScore: 18.293,
          similarityBetweenNameAndUsernameScore: 3.998,
        },
        threshold: 0.7,
        weights: {
          followingToFollowerRatioScore: 0.2,
          retweetToTweetRatioScore: 0.15,
          mentionsPerUserScore: 0.2,
          tweetSizeAvgScore: 0.1,
          accountAgeScore: 0.1,
          hashtagUsageScore: 0.05,
          tweetCountToAccountAgeScore: 0.2,
          avgTimeBetweenPostsScore: 0.15,
          similarityBetweenNameAndUsernameScore: 0.1,
        },
      });
      await config.save();
      logger.info('Categorization config created successfully');
    } else {
      logger.info('Categorization config already exists');
    }
  }
}

export default new Database();
