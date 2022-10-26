import { ConsumeMessage } from 'amqplib';
import { BaseUseCase } from 'contracts/usecases/BaseUseCase';
import { logger } from 'infra/logger';
import { default as MessageBroker } from 'infra/message-broker/Manager';

export class BaseSubscriber {
  constructor(
    private exchange: { name: string; type: string },
    private routingKey: string,
    private useCase: BaseUseCase,
  ) {}

  async consume(): Promise<void> {
    const channel = MessageBroker.channel;
    const queueName = `${this.routingKey}_queue`;

    Promise.all([
      channel.assertQueue(queueName),
      channel.bindQueue(queueName, this.exchange.name, this.routingKey),
      channel.prefetch(1),
      channel.consume(queueName, (msg: ConsumeMessage) => {
        if (msg.content) {
          const parsedData = JSON.parse(msg.content.toString());
          logger.info('Message consumed', {
            exchange: this.exchange,
            routingKey: this.routingKey,
            content: parsedData,
          });
          this.useCase.execute(parsedData).then(() => channel.ack(msg));
        }
      }),
    ]).catch((reason) => {
      logger.error('Error while consuming message', {
        exchange: this.exchange,
        routingKey: this.routingKey,
      });
      throw new Error(reason);
    });
  }
}
