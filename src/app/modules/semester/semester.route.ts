import { Router } from 'express';
import { createSemesterZodSchema } from './semester.validation';
import validateRequest from '../../middlewares/validateRequest';
import { createSemester } from './semester.controller';

const router = Router();
router.post(
  '/create-semester',
  validateRequest(createSemesterZodSchema),
  createSemester
);

export const SemesterRoutes = router;
