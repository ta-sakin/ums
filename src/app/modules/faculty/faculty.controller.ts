import { Request, Response } from 'express';
import catchAsync from '../../../common/catchAsync';
import { IFaculty } from './faculty.interface';
import sendResponse from '../../../common/sendResponse';
import httpStatus from 'http-status';
import {
  createFacultyService,
  getAllFacultiesService,
  getOneFacultyService,
  updateFacultyService,
  deleteFacultyService,
} from './faculty.service';
import getQueryObj from '../../../common/utils';
import { paginationQuery } from '../../constant/constant';
import { facultyFilterableFields } from './faculty.constant';
import ApiError from '../../../errors/ApiError';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...facultyData } = req.body;
  const result = await createFacultyService(facultyData);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created successfully!',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = getQueryObj(req.query, facultyFilterableFields);
  const paginationOption = getQueryObj(req.query, paginationQuery);

  const result = await getAllFacultiesService(filters, paginationOption);
  sendResponse<IFaculty[]>(res, {
    message: 'Faculties fetched successfully!',
    statusCode: httpStatus.OK,
    success: true,
    meta: result?.meta,
    data: result.data,
  });
});

const getOneFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getOneFacultyService(id);
  sendResponse<IFaculty>(res, {
    message: 'Faculty fetched successfully!',
    statusCode: httpStatus.OK,
    success: true,
    data: result ?? null,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const updateData = req.body;
  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Id');
  }
  const result = await updateFacultyService(id, updateData);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty updated successfully!',
    data: result,
  });
});
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Id');
  }
  const result = await deleteFacultyService(id);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty deleted successfully!',
    data: result,
  });
});

export {
  createFaculty,
  getAllFaculties,
  getOneFaculty,
  updateFaculty,
  deleteFaculty,
};
