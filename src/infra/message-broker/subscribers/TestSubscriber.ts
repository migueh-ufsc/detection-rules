import { Config } from 'infra/config';
import { TestService } from 'services/TestService';
import { TestUseCase } from 'usecases/TestUseCase';
import { BaseSubscriber } from './BaseSubscriber';

class TestSubscriber extends BaseSubscriber {
  constructor() {
    const exchange = {
      name: Config.exchanges[0].name,
      type: Config.exchanges[0].type,
    };
    const routingKey = Config.exchanges[0].routingKeys[0];
    const service = new TestService();
    const useCase = new TestUseCase(service);
    super(exchange, routingKey, useCase);
  }
}

export default new TestSubscriber();
