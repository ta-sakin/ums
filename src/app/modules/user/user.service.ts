import config from '../../../config';
import { generateStudentId } from './user.utils';
import { IUser } from './user.interface';
import { User } from './user.model';
import ApiError from '../../../errors/ApiError';
import { IStudent } from '../student/student.interface';
import { Semester } from '../semester/semster.model';
import { ISemester } from '../semester/semester.interface';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null | undefined> => {
  if (!user.password) {
    user.password = config.defautStudentPass as string;
  }
  user.role = 'student';

  const semester: ISemester | null = await Semester.findById(student.semester);
  let newUser;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await generateStudentId(semester?.code || '01');
    user.id = id;
    student.id = id;

    const createdStudent = await Student.create([student], { session });

    if (!createdStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student.');
    }

    user.student = createdStudent[0]._id;
    const createdUser = await User.create([user], { session });

    if (!createdUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user.');
    }

    newUser = createdUser[0];

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }

  if (newUser) {
    newUser = await User.findOne({ id: newUser.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'semester',
        },
        {
          path: 'faculty',
        },
        {
          path: 'department',
        },
      ],
    });
  }
  return newUser;
};
export { createStudent };
