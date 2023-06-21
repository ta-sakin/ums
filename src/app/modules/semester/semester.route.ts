import { Router } from 'express';
import { createSemesterZodSchema } from './semester.validation';
import validateRequest from '../../middlewares/validateRequest';
import { createSemester, getAllSemesters } from './semester.controller';

const router = Router();
router.post(
  '/create-semester',
  validateRequest(createSemesterZodSchema),
  createSemester
);

router.get('/get-all-semesters', getAllSemesters);
export const SemesterRoutes = router;
