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

const router = Router();

router.get('/students', ctrlWrapper(getStudentsController));

router.get(
  '/students/:studentId',
  isValidId,
  ctrlWrapper(getStudentByIdController),
);

router.post(
  '/students',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

router.delete('/students/:studentId', ctrlWrapper(deleteStudentController));

router.put(
  '/students/:studentId',
  isValidId,
  validateBody(updateStudentSchema),
  ctrlWrapper(upsertStudentController),
);

router.patch(
  '/students/:studentId',
  isValidId,
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

export default router;
