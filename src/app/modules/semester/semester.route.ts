import { Router } from 'express';
import {
  createSemesterZodSchema,
  updateSemesterZodSchema,
} from './semester.validation';
import validateRequest from '../../middlewares/validateRequest';
import {
  createSemester,
  getAllSemesters,
  getOneSemester,
  updateSemester,
  deleteSemester,
} from './semester.controller';

const router = Router();
router.post(
  '/create-semester',
  validateRequest(createSemesterZodSchema),
  createSemester
);

router.get('/:id', getOneSemester);
router.patch('/:id', validateRequest(updateSemesterZodSchema), updateSemester);
router.delete('/:id', deleteSemester);
router.get('/', getAllSemesters);
export const SemesterRoutes = router;
