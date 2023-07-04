import { Request, Response } from 'express';
import catchAsync from '../../../common/catchAsync';
import { IDepartment } from './department.interface';
import sendResponse from '../../../common/sendResponse';
import httpStatus from 'http-status';
import {
  createDepartmentService,
  getAllDepartmentsService,
  getOneDepartmentService,
  updateDepartmentService,
  deleteDepartmentService,
} from './department.service';
import getQueryObj from '../../../common/utils';
import { paginationQuery } from '../../constant/constant';
import { DepartmentFilterableFields } from './department.constant';
import ApiError from '../../../errors/ApiError';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...DepartmentData } = req.body;
  const result = await createDepartmentService(DepartmentData);

  sendResponse<IDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department created successfully!',
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = getQueryObj(req.query, DepartmentFilterableFields);
  const paginationOption = getQueryObj(req.query, paginationQuery);

  const result = await getAllDepartmentsService(filters, paginationOption);
  sendResponse<IDepartment[]>(res, {
    message: 'Departments fetched successfully!',
    statusCode: httpStatus.OK,
    success: true,
    meta: result?.meta,
    data: result.data,
  });
});

const getOneDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getOneDepartmentService(id);
  sendResponse<IDepartment>(res, {
    message: 'Department fetched successfully!',
    statusCode: httpStatus.OK,
    success: true,
    data: result ?? null,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const updateData = req.body;
  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Id');
  }
  const result = await updateDepartmentService(id, updateData);

  sendResponse<IDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department updated successfully!',
    data: result,
  });
});
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Id');
  }
  const result = await deleteDepartmentService(id);

  sendResponse<IDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department deleted successfully!',
    data: result,
  });
});

export {
  createDepartment,
  getAllDepartments,
  getOneDepartment,
  updateDepartment,
  deleteDepartment,
};
