import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { LoginZodSchema } from './auth.validation';
import { loginUser } from './auth.controller';

const router = Router();

router.post('/login', validateRequest(LoginZodSchema), loginUser);

export const AuthRoutes = router;
