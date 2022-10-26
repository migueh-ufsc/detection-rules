/** Arquivo pra cadastrar rotas caso exista um server */
import { Express } from 'express';
import { default as TestRouter } from './routes/TestRouter';

export const initRoutes = (app: Express) => {
  app.use('/test', TestRouter);
};
