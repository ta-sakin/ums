import { Request, Response } from 'express';
import catchAsync from '../../../common/catchAsync';
import { ISemester } from './semester.interface';
import sendResponse from '../../../common/sendResponse';
import httpStatus from 'http-status';
import {
  createSemesterService,
  getAllSemestersService,
  getOneSemesterService,
  updateSemesterService,
  deleteSemesterService,
} from './semester.service';
import getQueryObj from '../../../common/utils';
import { paginationQuery } from '../../constant/constant';
import { semesterFilterableFields } from './semester.constant';
import ApiError from '../../../errors/ApiError';

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

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = getQueryObj(req.query, semesterFilterableFields);
  const paginationOption = getQueryObj(req.query, paginationQuery);

  const result = await getAllSemestersService(filters, paginationOption);
  sendResponse<ISemester[]>(res, {
    message: 'Semesters fetched successfully!',
    statusCode: httpStatus.OK,
    success: true,
    meta: result?.meta,
    data: result.data,
  });
});

const getOneSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getOneSemesterService(id);
  sendResponse<ISemester>(res, {
    message: 'Semester fetched successfully!',
    statusCode: httpStatus.OK,
    success: true,
    data: result ?? null,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const updateData = req.body;
  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Id');
  }
  const result = await updateSemesterService(id, updateData);

  sendResponse<ISemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester updated successfully!',
    data: result,
  });
});
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Id');
  }
  const result = await deleteSemesterService(id);

  sendResponse<ISemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester deleted successfully!',
    data: result,
  });
});

export {
  createSemester,
  getAllSemesters,
  getOneSemester,
  updateSemester,
  deleteSemester,
};
