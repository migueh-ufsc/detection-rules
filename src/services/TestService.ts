import { ITest } from 'contracts/entities/ITest';
import { TestModel } from 'infra/database/schemas/TestSchema';
import { BaseService } from './BaseService';

export class TestService extends BaseService<ITest> {
  constructor() {
    super(TestModel);
  }
}
