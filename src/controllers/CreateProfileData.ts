import { HttpRequest, HttpResponse } from '../contracts/server/Http';
import { BaseController } from '../contracts/controllers/BaseController';
import { GenerateProfileDataUseCase } from '../usecases/GenerateProfileDataUseCase';
import { logger } from '../infra/logger';
import { HttpError } from '../common/errors/HttpError';

export class CreateProfileData implements BaseController {
  constructor(readonly useCase: GenerateProfileDataUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { query } = request;

      if (!query.id && !query.username)
        throw new HttpError({
          status: 400,
          message:
            'Para buscar um usuário é necessario um "id" ou um "username"',
        });

      const input = {
        id: query.id as string,
        username: query.username as string,
      };

      const profileData = await this.useCase.execute(input);

      return {
        body: profileData,
        status: 201,
      };
    } catch (error) {
      if (error.status) throw error;

      logger.error(error);

      throw new HttpError({
        message: 'Internal Server Error',
        status: 500,
      });
    }
  }
}
