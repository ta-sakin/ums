import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { IManagementDepartment } from './managementDepartment.interface';
import sendResponse from '../../../common/sendResponse';
import getQueryObj from '../../../common/utils';
import catchAsync from '../../../common/catchAsync';
import {
  createDepartmentService,
  deleteDepartmentService,
  getAllDepartmentsService,
  getSingleDepartmentService,
  updateDepartmentService,
} from './managementDepartment.service';
import { managementDepartmentFilterableFields } from './managementDepartment.constant';
import { paginationQuery } from '../../constant/constant';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...departmentData } = req.body;
  const result = await createDepartmentService(departmentData);

  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management department created successfully',
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = getQueryObj(req.query, managementDepartmentFilterableFields);
  const paginationOptions = getQueryObj(req.query, paginationQuery);

  const result = await getAllDepartmentsService(filters, paginationOptions);

  sendResponse<IManagementDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management departments fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getSingleDepartmentService(id);

  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management department fetched successfully',
    data: result,
  });
});

const updateDepartment = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await updateDepartmentService(id, updatedData);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department updated successfully',
      data: result,
    });
  })
);

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteDepartmentService(id);

  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management department deleted successfully',
    data: result,
  });
});

export {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
