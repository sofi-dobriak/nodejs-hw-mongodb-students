import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { ObjectSchema } from 'joi';

export const validateBody = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
    } catch (err) {
      const error = createHttpError(400, 'Bad Request');
      next(error);
    }
  };
};
