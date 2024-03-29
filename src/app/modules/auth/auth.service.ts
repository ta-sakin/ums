import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginData } from './auth.interface';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { createToken, verifyToken } from '../../helpers/jwtHelper';
import bcrypt from 'bcrypt';
const loginUserService = async (payload: ILoginData) => {
  const { password, id } = payload;
  // const user = new User();
  const isUserExist = await User.isUserExits(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!');
  }
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = createToken(
    { id: userId, role },
    config.jwt.secret as Secret,
    config.jwt.expiresIn as string
  );
  const refreshToken = createToken(
    { id: userId, role },
    config.jwt.refreshSecret as Secret,
    config.jwt.refreshExpiresIn as string
  );

  const isValid =
    isUserExist?.password &&
    (await User.isPasswordCorrect(password, isUserExist?.password));
  if (!isValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Wrong password!');
  }
  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};
const accessTokenService = async (refreshToken: string) => {
  let decoded = null;
  try {
    decoded = verifyToken(refreshToken, config.jwt.refreshSecret as Secret);
  } catch (error: any) {
    if (error?.name === 'TokenExpiredError') {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'Token expired. Please login again.'
      );
    }
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token!');
  }

  if (!decoded) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token!');
  }
  const { id } = decoded;
  // const user = new User();
  const isUserExist = await User.isUserExits(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!');
  }
  const { id: userId, role } = isUserExist;
  const accessToken = createToken(
    { id: userId, role },
    config.jwt.secret as Secret,
    config.jwt.expiresIn as string
  );

  return {
    accessToken,
  };
};

const changePasswordService = async (
  passwords: { oldPassword: string; newPassword: string },
  user: JwtPayload | null
) => {
  const { newPassword, oldPassword } = passwords;
  const isUserExist = await User.isUserExits(user?.id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!');
  }

  const isValid =
    isUserExist?.password &&
    (await User.isPasswordCorrect(oldPassword, isUserExist?.password));
  if (!isValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  const hashPassword = bcrypt.hash(newPassword, Number(config.bcryptSaltRound));
  await User.findByIdAndUpdate(user?.id, {
    password: hashPassword,
    needsPasswordChange: false,
    passwordUpdatedAt: new Date(),
  });
  return true;
};
export { loginUserService, accessTokenService, changePasswordService };
