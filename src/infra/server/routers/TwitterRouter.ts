import { Router } from 'express';
import { requestHandlerMidd } from '../Middlewares';
import { CreateProfileData } from 'controllers/CreateProfileData';
import { GenerateProfileDataUseCase } from 'usecases/GenerateProfileDataUseCase';
import { ProfileDataService } from 'services/ProfileDataService';
import { CreateProfileAnalysis } from 'controllers/CreateProfileAnalysis';
import { GenerateProfileAnalysisUseCase } from 'usecases/GenerateProfileAnalysisUseCase';
import { ProfileAnalysisService } from 'services/ProfileAnalysisService';

const router = Router();

router.post(
  '/data',
  requestHandlerMidd(
    new CreateProfileData(
      new GenerateProfileDataUseCase(new ProfileDataService()),
    ),
  ),
);

router.post(
  '/analysis/:username',
  requestHandlerMidd(
    new CreateProfileAnalysis(
      new GenerateProfileAnalysisUseCase(
        new ProfileDataService(),
        new ProfileAnalysisService(),
      ),
    ),
  ),
);

export default router;
