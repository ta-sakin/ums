import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginData } from './auth.interface';
const loginUserService = async (payload: ILoginData) => {
  const { password, id } = payload;
  // const user = new User();
  const isUserExist = await User.isUserExits(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!');
  }

  const isValid =
    isUserExist?.password &&
    (await User.isPasswordCorrect(password, isUserExist?.password));
  if (!isValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Wrong password!');
  }
  return;
};

export { loginUserService };
