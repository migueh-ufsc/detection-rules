import { Router } from 'express';
import { requestHandlerMidd } from '../Middlewares';
import { CreateProfileData } from 'controllers/CreateProfileData';
import { GenerateProfileDataUseCase } from 'usecases/GenerateProfileDataUseCase';
import { ProfileDataService } from 'services/ProfileDataService';
import { CreateProfileAnalysis } from 'controllers/CreateProfileAnalysis';
import { GenerateProfileAnalysisUseCase } from 'usecases/GenerateProfileAnalysisUseCase';
import { ProfileAnalysisService } from 'services/ProfileAnalysisService';
import { CategorizationConfigService } from 'services/CategorizationConfigService';
import { CategorizationUseCase } from 'usecases/CategorizationUseCase';
import { Categorize } from 'controllers/Categorize';

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

router.post(
  '/categorize/:username',
  requestHandlerMidd(
    new Categorize(
      new CategorizationUseCase(
        new CategorizationConfigService(),
        new GenerateProfileDataUseCase(new ProfileDataService()),
        new GenerateProfileAnalysisUseCase(
          new ProfileDataService(),
          new ProfileAnalysisService(),
        ),
        new ProfileAnalysisService(),
      ),
    ),
  ),
);

export default router;
