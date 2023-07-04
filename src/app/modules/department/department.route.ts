import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';

import {
  createDepartmentZodSchema,
  updateDepartmentZodSchema,
} from './department.validation';
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  getOneDepartment,
  updateDepartment,
} from './department.controller';

const router = Router();
router.post(
  '/create-department',
  validateRequest(createDepartmentZodSchema),
  createDepartment
);

router.get('/:id', getOneDepartment);
router.patch(
  '/:id',
  validateRequest(updateDepartmentZodSchema),
  updateDepartment
);
router.delete('/:id', deleteDepartment);
router.get('/', getAllDepartments);
export const DepartmentRoutes = router;
