import { default as Database } from './infra/database/Connection';
import { default as Server } from './infra/server/Server';

(async () => {
  await Promise.all([Database.init(), Server.init()]);
})();
