import { NextFunction, Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';

export const ctrlWrapper = (controller: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
