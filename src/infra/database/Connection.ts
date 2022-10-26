import { connect, connection } from 'mongoose';
import { Config } from '../config';
import { logger } from '../logger';

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
    } catch (error) {
      logger.error('Error while connecting to database: %s', error.message);
      throw error;
    }
  }
}

export default new Database();
