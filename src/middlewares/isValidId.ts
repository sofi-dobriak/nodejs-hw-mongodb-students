import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId: RequestHandler = (req, res, next) => {
  const { studentId } = req.params;

  if (!isValidObjectId(studentId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};
