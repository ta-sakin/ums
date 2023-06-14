import { Request, Response } from 'express';
import catchAsync from '../../../common/catchAsync';
import { ISemester } from './semester.interface';
import sendResponse from '../../../common/sendResponse';
import httpStatus from 'http-status';
import { createSemesterService } from './semester.service';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body;
  const result = await createSemesterService(academicSemesterData);

  sendResponse<ISemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Aademic semester created successfully!',
    data: result,
  });
});

export { createSemester };
