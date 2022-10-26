import { Config } from 'infra/config';
import { BasePublisher } from './BasePublisher';

export class TestPublisher extends BasePublisher {
  constructor() {
    const exchange = {
      name: Config.exchanges[0].name,
      type: Config.exchanges[0].type,
    };
    const routingKey = Config.exchanges[0].routingKeys[0];
    super(exchange, routingKey);
  }
}
