import { Router } from 'express';
import {
  createStudentController,
  deleteStudentController,
  getStudentByIdController,
  getStudentsController,
  patchStudentController,
  upsertStudentController,
} from '../controllers/students';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { validateBody } from '../middlewares/validateBody';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students';
import { isValidId } from '../middlewares/isValidId';
import { authenticate } from '../middlewares/authenticate';

const studentRouter = Router();

studentRouter.use('/students', authenticate);

studentRouter.get('/students', ctrlWrapper(getStudentsController));

studentRouter.get(
  '/students/:studentId',
  isValidId,
  ctrlWrapper(getStudentByIdController),
);

studentRouter.post(
  '/students',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

studentRouter.delete(
  '/students/:studentId',
  ctrlWrapper(deleteStudentController),
);

studentRouter.put(
  '/students/:studentId',
  isValidId,
  validateBody(updateStudentSchema),
  ctrlWrapper(upsertStudentController),
);

studentRouter.patch(
  '/students/:studentId',
  isValidId,
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

export default studentRouter;
studentRouter;
