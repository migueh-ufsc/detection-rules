import { HttpError } from 'common/errors/HttpError';
import { BaseController } from 'contracts/controllers/BaseController';
import { HttpRequest, HttpResponse } from 'contracts/server/Http';
import { logger } from 'infra/logger';
import { GenerateProfileAnalysisUseCase } from 'usecases/GenerateProfileAnalysisUseCase';

export class CreateProfileAnalysis implements BaseController {
  constructor(readonly useCase: GenerateProfileAnalysisUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { params } = request;
      const { username } = params;
      const { query } = request;
      const { force } = query;

      if (!username)
        throw new HttpError({
          status: 400,
          message: 'Para gerar dados de análise é necessario um "username"',
        });

      const analysis = await this.useCase.execute(username, !!force);

      return {
        status: 200,
        body: analysis,
      };
    } catch (error) {
      if (error.status) throw error;

      logger.error(error);

      throw new HttpError({
        message: 'Falha ao gerar dados de análise',
        status: 500,
      });
    }
  }
}
