import { RequestHandler } from 'express';
import { createUser } from './user.service';

const createOneUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await createUser(user);

    res.status(200).json({
      success: true,
      message: 'User create successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export { createOneUser };
