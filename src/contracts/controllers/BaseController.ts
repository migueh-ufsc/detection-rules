import { HttpRequest, HttpResponse } from '../server/Http';
import { BaseUseCase } from '../usecases/BaseUseCase';

export interface BaseController {
  useCase: BaseUseCase;
  handle: (request: HttpRequest) => Promise<HttpResponse>;
}
