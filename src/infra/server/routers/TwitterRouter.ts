import { Router } from 'express';
import { requestHandlerMidd } from '../Middlewares';
import { CreateProfileData } from 'controllers/CreateProfileData';
import { GenerateProfileDataUseCase } from 'usecases/GenerateProfileDataUseCase';
import { ProfileDataService } from 'services/ProfileDataService';

const router = Router();

router.post(
  '/data',
  requestHandlerMidd(
    new CreateProfileData(
      new GenerateProfileDataUseCase(new ProfileDataService()),
    ),
  ),
);

export default router;
