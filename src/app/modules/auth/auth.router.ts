import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { LoginZodSchema, RefreshTokenZodSchema } from './auth.validation';
import { getAccessToken, loginUser } from './auth.controller';

const router = Router();

router.post('/login', validateRequest(LoginZodSchema), loginUser);
router.get(
  '/access-token',
  validateRequest(RefreshTokenZodSchema),
  getAccessToken
);

export const AuthRoutes = router;
