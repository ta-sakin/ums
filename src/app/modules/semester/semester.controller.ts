import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../common/catchAsync';
import { ISemester } from './semester.interface';
import sendResponse from '../../../common/sendResponse';
import httpStatus from 'http-status';
import {
  createSemesterService,
  getAllSemestersService,
} from './semester.service';
import genQueryObj from '../../../common/utils';
import { paginationQuery } from '../../constant/constant';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await createSemesterService(academicSemesterData);

    sendResponse<ISemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Aademic semester created successfully!',
      data: result,
    });
    next();
  }
);

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const obj = genQueryObj(req.query, paginationQuery);

  const result = await getAllSemestersService(obj);
  sendResponse(res, {
    message: 'Semesters fetched successfully!',
    statusCode: httpStatus.OK,
    success: true,
    data: {
      data: result.data,
      meta: result.meta,
    },
  });
});
export { createSemester, getAllSemesters };
