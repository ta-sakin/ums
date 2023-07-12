import { RequestHandler } from 'express';
import { createStudent } from './user.service';
import { User } from './user.model';

const createOneUser: RequestHandler = async (req, res, next) => {
  try {
    const { student, ...user } = req.body;
    const result = await createStudent(student, user);

    res.status(200).json({
      success: true,
      message: 'User create successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const result = await User.find({}).populate({
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
    res.status(200).json({
      success: true,
      message: 'Fetched users successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export { createOneUser, getUsers };
