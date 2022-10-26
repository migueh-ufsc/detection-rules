import { logger } from 'infra/logger';
import { default as MessageBroker } from 'infra/message-broker/Manager';

export class BasePublisher {
  constructor(
    protected exchange: { name: string; type: string },
    protected routingKey: string,
  ) {}

  publish(msg: string): void {
    const channel = MessageBroker.channel;
    const content = Buffer.from(msg);
    channel.publish(this.exchange.name, this.routingKey, content);
    logger.info('Message published', {
      exchange: this.exchange,
      routingKey: this.routingKey,
    });
  }
}
