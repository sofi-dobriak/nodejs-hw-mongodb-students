import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth';
import { loginUserSchema, registerUserSchema } from '../validation/auth';
import { ctrlWrapper } from '../utils/ctrlWrapper';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/auth/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/auth/logout', ctrlWrapper(logoutUserController));

authRouter.post('/auth/refresh', ctrlWrapper(refreshUserSessionController));

export default authRouter;
