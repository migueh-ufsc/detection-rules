import { HttpError } from 'common/errors/HttpError';
import { BaseController } from 'contracts/controllers/BaseController';
import { HttpRequest, HttpResponse } from 'contracts/server/Http';
import { logger } from 'infra/logger';
import { CategorizationUseCase } from 'usecases/CategorizationUseCase';

export class Categorize implements BaseController {
  constructor(readonly useCase: CategorizationUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { params } = request;
      const { username, id } = params;

      const analysis = await this.useCase.execute({ username, id });

      return {
        status: 200,
        body: analysis,
      };
    } catch (error) {
      if (error.status) throw error;

      logger.error(error);

      throw new HttpError({
        message: 'Falha ao categorizar',
        status: 500,
      });
    }
  }
}
