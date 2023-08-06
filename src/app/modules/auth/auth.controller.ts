import httpStatus from 'http-status';
import catchAsync from '../../../common/catchAsync';
import sendResponse from '../../../common/sendResponse';
import { loginUserService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;
  const result = await loginUserService(loginData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    data: result,
    success: true,
    message: 'User logged in successfully',
  });
});
export { loginUser };
