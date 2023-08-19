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
import { ENUM_USER_ROLE } from '../../../enums/user';
import { auth } from '../../middlewares/auth';

const router = Router();
router.post(
  '/create-faculty',
  validateRequest(createFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  createFaculty
);

router.get('/:id', getOneFaculty);
router.patch('/:id', validateRequest(updateFacultyZodSchema), updateFaculty);
router.delete('/:id', deleteFaculty);
router.get('/', getAllFaculties);
export const FacultyRoutes = router;
