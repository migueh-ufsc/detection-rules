import { TestController } from 'controllers/TestController';
import { Router } from 'express';
import { TestService } from 'services/TestService';
import { TestUseCase } from 'usecases/TestUseCase';
import { requestHandlerMidd } from '../Middlewares';

const router = Router();

router.get(
  '/send-message',
  requestHandlerMidd(new TestController(new TestUseCase(new TestService()))),
);

export default router;
