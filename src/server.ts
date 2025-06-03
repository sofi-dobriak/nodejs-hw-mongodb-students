import express, { Express, Request, Response, NextFunction } from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar';
import { getAllStudents, getStudentById } from './services/students';

const PORT: number = Number(getEnvVar('PORT'));

export const startServer = (): void => {
  const app: Express = express();

  app.use(express.json());
  app.use(cors());

  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  app.use((req: Request, res: Response, next: NextFunction): void => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  app.get('/', (req: Request, res: Response): void => {
    res.status(200).json({
      message: 'Hello, student!',
    });
  });

  app.get('/students', async (req: Request, res: Response): Promise<void> => {
    const students = await getAllStudents();

    res.status(200).json({
      data: students,
    });
  });

  app.get(
    '/students/:studentId',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { studentId } = req.params;
      const student = await getStudentById(studentId);

      if (!student) {
        res.status(404).json({
          message: 'Student not found',
        });

        return;
      }

      res.status(200).json({
        data: student,
      });
    },
  );

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
