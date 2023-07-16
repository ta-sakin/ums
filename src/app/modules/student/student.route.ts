import { Router } from 'express';
import {
  deleteStudent,
  getAllStudents,
  getOneStudent,
  updateStudent,
} from './student.controller';
import { updateStudentZodSchema } from './student.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

// router.post(
//   '/create-student',
//   validateRequest(createStudentZodSchema),
//   createOneUser
// );
router.get('/', getAllStudents);
router.get('/:id', getOneStudent);
router.delete('/:id', deleteStudent);
router.patch('/:id', validateRequest(updateStudentZodSchema), updateStudent);
export const StudentRoutes = router;
