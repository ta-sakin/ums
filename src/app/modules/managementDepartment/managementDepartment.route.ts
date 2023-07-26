import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createManagementDepartmentZodSchema,
  updateManagementDepartmentZodSchema,
} from './managementDepartment.validation';
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
} from './managementDepartment.controller';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(createManagementDepartmentZodSchema),
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  createDepartment
);

router.get(
  '/:id',
  //   auth(
  //     ENUM_USER_ROLE.SUPER_ADMIN,
  //     ENUM_USER_ROLE.ADMIN,
  //     ENUM_USER_ROLE.FACULTY,
  //     ENUM_USER_ROLE.STUDENT
  //   ),
  getSingleDepartment
);

router.patch(
  '/:id',
  validateRequest(updateManagementDepartmentZodSchema),
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  updateDepartment
);

router.delete(
  '/:id',
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN),
  deleteDepartment
);

router.get(
  '/',
  //   auth(
  //     ENUM_USER_ROLE.SUPER_ADMIN,
  //     ENUM_USER_ROLE.ADMIN,
  //     ENUM_USER_ROLE.FACULTY,
  //     ENUM_USER_ROLE.FACULTY,
  //     ENUM_USER_ROLE.STUDENT
  //   ),
  getAllDepartments
);

export const ManagementDepartmentRoutes = router;
