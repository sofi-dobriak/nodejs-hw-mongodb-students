import { Router } from 'express';
import studentRouter from './students';
import authRouter from './auth';

export const router = Router();
router.use(studentRouter);
router.use(authRouter);
