import express, { Express, Request, Response, NextFunction } from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar';

const PORT: number = Number(getEnvVar('PORT'));

export const startServer = (): void => {
  const app: Express = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use((req: Request, res: Response, next: NextFunction): void => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  app.get('/', (req: Request, res: Response): void => {
    res.status(200).json({
      message: 'Hello, student!',
    });
  });

  app.use(/.*/, (req: Request, res: Response, next: NextFunction): void => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use(
    (err: Error, req: Request, res: Response, next: NextFunction): void => {
      res.status(500).json({
        message: 'Something went wrong',
        error: err.message,
      });
    },
  );

  app.listen(PORT, (): void => {
    console.log(`Server is running on ${PORT}`);
  });
};
