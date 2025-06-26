import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import { router } from './routers';
import cookieParser from 'cookie-parser';

const PORT: number = Number(getEnvVar('PORT'));

export const startServer = (): void => {
  const app: Express = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.get('/', (req: Request, res: Response): void => {
    res.status(200).json({
      message: 'Hello, student!',
    });
  });

  app.use(router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, (): void => {
    console.log(`Server is running on ${PORT}`);
  });
};
