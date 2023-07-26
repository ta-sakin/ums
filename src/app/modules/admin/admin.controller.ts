import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../common/catchAsync';
import sendResponse from '../../../common/sendResponse';
import { IAdmin } from './admin.interface';
import getQueryObj from '../../../common/utils';
import { adminFilterableFields } from './admin.constant';
import { paginationQuery } from '../../constant/constant';
import {
  deleteAdminService,
  getAllAdminsService,
  getSingleAdminService,
  updateAdminService,
} from './admin.service';

const getOneAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await getSingleAdminService(id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin fetched successfully !',
    data: result,
  });
});

const getAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = getQueryObj(req.query, adminFilterableFields);
  const paginationOptions = getQueryObj(req.query, paginationQuery);

  const result = await getAllAdminsService(filters, paginationOptions);

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await updateAdminService(id, updatedData);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully !',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await deleteAdminService(id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully !',
    data: result,
  });
});

export { getOneAdmin, getAdmins, updateAdmin, deleteAdmin };
