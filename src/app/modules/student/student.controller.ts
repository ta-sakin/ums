import { Request, Response } from 'express';
import catchAsync from '../../../common/catchAsync';
import { IStudent } from './student.interface';
import sendResponse from '../../../common/sendResponse';
import httpStatus from 'http-status';
import {
  deleteStudentService,
  getAllStudentsService,
  getOneStudentService,
  updateStudentService,
} from './student.service';
import getQueryObj from '../../../common/utils';
import { paginationQuery } from '../../constant/constant';
import { studentFilterableFields } from './student.constant';
import ApiError from '../../../errors/ApiError';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = getQueryObj(req.query, studentFilterableFields);
  const paginationOption = getQueryObj(req.query, paginationQuery);

  const result = await getAllStudentsService(filters, paginationOption);
  sendResponse<IStudent[]>(res, {
    message: 'Students fetched successfully!',
    statusCode: httpStatus.OK,
    success: true,
    meta: result?.meta,
    data: result.data,
  });
});

const getOneStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getOneStudentService(id);
  sendResponse<IStudent>(res, {
    message: 'Student fetched successfully!',
    statusCode: httpStatus.OK,
    success: true,
    data: result ?? null,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const updateData = req.body;
  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Id');
  }
  const result = await updateStudentService(id, updateData);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully!',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await deleteStudentService(id);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully!',
    data: result,
  });
});

export { getAllStudents, getOneStudent, updateStudent, deleteStudent };
