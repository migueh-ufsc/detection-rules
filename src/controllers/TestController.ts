import { HttpError } from 'common/errors/HttpError';
import { BaseController } from 'contracts/controllers/BaseController';
import { ITest } from 'contracts/entities/ITest';
import { HttpRequest, HttpResponse } from 'contracts/server/Http';
import { TestUseCase } from 'usecases/TestUseCase';

export class TestController implements BaseController {
  readonly useCase: TestUseCase;
  constructor(useCase: TestUseCase) {
    this.useCase = useCase;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const input: ITest = {
        isItTrue: request.body?.isItTrue || true,
        value: request.body?.value || 100,
        word: request.body?.word || 'banana',
      };
      await this.useCase.execute(input);
      return {
        status: 200,
        body: 'everything is great!',
      };
    } catch (error) {
      throw new HttpError({
        message: 'Error while etc etc',
        status: 400,
      });
    }
  }
}
