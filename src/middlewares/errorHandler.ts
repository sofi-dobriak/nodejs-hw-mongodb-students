import { ErrorRequestHandler, RequestHandler } from 'express';
import { HttpError } from 'http-errors';

export const notFoundHandler: RequestHandler = (req, res, next) => {
  res.status(404).json({
    message: 'Not found',
  });
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err,
    });
  }

  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
};
