import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  ChangePasswordZodSchema,
  LoginZodSchema,
  RefreshTokenZodSchema,
} from './auth.validation';
import { getAccessToken, loginUser } from './auth.controller';
import { auth } from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = Router();

router.post('/login', validateRequest(LoginZodSchema), loginUser);
router.get(
  '/access-token',
  validateRequest(RefreshTokenZodSchema),
  getAccessToken
);

router.post(
  '/change-password',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT
  ),
  validateRequest(ChangePasswordZodSchema)
);

export const AuthRoutes = router;
