import httpStatus from 'http-status';
import catchAsync from '../../../common/catchAsync';
import sendResponse from '../../../common/sendResponse';
import { changePasswordService, loginUserService } from './auth.service';
import { accessTokenService } from './auth.service';
import config from '../../../config';
import { Request, Response } from 'express';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const { refreshToken, ...rest } = await loginUserService(loginData);

  res.cookie('refreshToken', refreshToken, {
    secure: config.env === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    data: rest,
    success: true,
    message: 'User logged in successfully',
  });
});
const getAccessToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await accessTokenService(refreshToken);

  res.cookie('refreshToken', refreshToken, {
    secure: config.env === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    data: result,
    success: true,
    message: 'Access token generated successfully',
  });
});
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...passwords } = req.body;
  await changePasswordService(passwords, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    data: 'Password changed successfully',
    success: true,
    message: 'User logged in successfully',
  });
});
export { loginUser, getAccessToken, changePassword };
