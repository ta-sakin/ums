import { Router } from 'express';
import { createOneUser } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createZodUserSchema } from './user.validation';

const router = Router();

router.post(
  '/create-user',
  validateRequest(createZodUserSchema),
  createOneUser
);

export const UserRoutes = router;
