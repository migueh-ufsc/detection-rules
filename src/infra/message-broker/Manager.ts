import client, { Channel, Connection } from 'amqplib';
import { Config } from '../config';
import { logger } from '../logger';
import { initSubscribers } from './subscribers';

class MessageBroker {
  private readonly uri: string = Config.rabbitURI;
  private readonly exchanges = Config.exchanges;
  connection: Connection;
  channel: Channel;

  async init(): Promise<void> {
    try {
      logger.info('Connecting to message broker');
      this.connection = await client.connect(this.uri, { heartbeat: 60 });

      this.channel = await this.connection.createChannel();

      Promise.all(
        this.exchanges.map((exchange) =>
          this.channel.assertExchange(exchange.name, exchange.type, {
            durable: true,
          }),
        ),
      ).then(() => initSubscribers());

      logger.info('Connected to message broker');
    } catch (error) {
      logger.error('Error while starting message broker: $s', error);
      throw error;
    }
  }
}

export default new MessageBroker();
