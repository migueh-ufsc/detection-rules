/** Arquivo pra cadastrar rotas caso exista um server */
import { Express } from 'express';

export const initRoutes = (app: Express) => {
  app.use('/test', () => 0);
};
