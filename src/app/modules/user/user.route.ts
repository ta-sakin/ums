import { Router } from 'express';
import { createOneUser } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentZodSchema } from './user.validation';

const router = Router();

router.post(
  '/create-user',
  validateRequest(createStudentZodSchema),
  createOneUser
);

export const UserRoutes = router;
