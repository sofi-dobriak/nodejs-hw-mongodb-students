import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar';
import studentsRouter from './routers/students';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';

const PORT: number = Number(getEnvVar('PORT'));

export const startServer = (): void => {
  const app: Express = express();

  app.use(express.json());
  app.use(cors());

  app.get('/', (req: Request, res: Response): void => {
    res.status(200).json({
      message: 'Hello, student!',
    });
  });

  app.use(studentsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, (): void => {
    console.log(`Server is running on ${PORT}`);
  });
};
