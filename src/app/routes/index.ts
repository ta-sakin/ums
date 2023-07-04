import express from 'express';

import { UserRoutes } from '../modules/user/user.route';
import { SemesterRoutes } from '../modules/semester/semester.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { DepartmentRoutes } from '../modules/department/department.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/semesters',
    route: SemesterRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/departments',
    route: DepartmentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
