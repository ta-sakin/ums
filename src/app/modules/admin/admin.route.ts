import express from 'express';
// import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';
import {
  deleteAdmin,
  getAdmins,
  getOneAdmin,
  updateAdmin,
} from './admin.controller';
const router = express.Router();

router.get(
  '/:id',
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  getOneAdmin
);
router.get(
  '/',
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  getAdmins
);

router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdmin),
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  updateAdmin
);

router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN),
  deleteAdmin
);

export const AdminRoutes = router;
