import { Router } from 'express';
import { createOneUser, getUsers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentZodSchema } from './user.validation';

const router = Router();

router.post(
  '/create-student',
  validateRequest(createStudentZodSchema),
  createOneUser
);

router.get('/', getUsers);
export const UserRoutes = router;
