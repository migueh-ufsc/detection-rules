import { default as Database } from 'infra/database/Connection';
import { default as Server } from 'infra/server/Server';
import { ProfileDataService } from 'services/ProfileDataService';
import { GenerateProfileDataUseCase } from 'usecases/GenerateProfileDataUseCase';

(async () => {
  await Promise.all([Database.init(), Server.init()]);
  const usercase = new GenerateProfileDataUseCase(new ProfileDataService());
  //bot
  await usercase.execute({ id: '914048929070587905' });
  // human
  await usercase.execute({ id: '5727802' });
})();
