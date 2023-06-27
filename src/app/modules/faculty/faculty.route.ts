import { Router } from 'express';
import {
  createFacultyZodSchema,
  updateFacultyZodSchema,
} from './faculty.validation';
import validateRequest from '../../middlewares/validateRequest';
import {
  createFaculty,
  getAllFaculties,
  getOneFaculty,
  updateFaculty,
  deleteFaculty,
} from './faculty.controller';

const router = Router();
router.post(
  '/create-faculty',
  validateRequest(createFacultyZodSchema),
  createFaculty
);

router.get('/:id', getOneFaculty);
router.patch('/:id', validateRequest(updateFacultyZodSchema), updateFaculty);
router.delete('/:id', deleteFaculty);
router.get('/', getAllFaculties);
export const FacultyRoutes = router;
