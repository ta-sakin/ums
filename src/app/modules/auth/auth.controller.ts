import httpStatus from 'http-status';
import catchAsync from '../../../common/catchAsync';
import sendResponse from '../../../common/sendResponse';
import { loginUserService } from './auth.service';
import { accessTokenService } from './auth.service';
import config from '../../../config';

const loginUser = catchAsync(async (req, res) => {
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
const getAccessToken = catchAsync(async (req, res) => {
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
export { loginUser, getAccessToken };
