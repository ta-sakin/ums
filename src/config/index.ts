import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  databaseUrl: process.env.MONGODB_URL,
  defautStudentPass: process.env.DEFAULT_STUDENT_PASS,
  defautFacultyPass: process.env.DEFAULT_FACULTY_PASS,
  defautAdminPass: process.env.DEFAULT_ADMIN_PASS,
  bcryptSaltRound: 12,
};
