import { ICategorizationConfig } from 'contracts/entities/ICategorizationConfig';
import { BaseService } from './BaseService';
import { CategorizationConfigModel } from 'infra/database/schemas/CategorizationConfigSchema';

export class CategorizationConfigService extends BaseService<ICategorizationConfig> {
  constructor() {
    super(CategorizationConfigModel);
  }
}
