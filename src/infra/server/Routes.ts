/** Arquivo pra cadastrar rotas caso exista um server */
import { Express } from 'express';
import { TwitterRouter } from './routers/routers-list';

export const initRoutes = (app: Express) => {
  app.use('/twitter', TwitterRouter);
};
