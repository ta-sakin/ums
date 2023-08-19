import { Router } from 'express';
import { createOneUser, getUsers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentZodSchema } from './user.validation';
import { auth } from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = Router();

router.post(
  '/create-student',
  validateRequest(createStudentZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  createOneUser
);

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  getUsers
);
router.delete('/:id', getUsers);
router.patch('/:id', getUsers);
export const UserRoutes = router;
