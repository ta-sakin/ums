import httpStatus from 'http-status';
import {
  IGenericResponse,
  IPaginationOptions,
  ISemester,
} from './semester.interface';
import { Semester } from './semster.model';
import ApiError from '../../../errors/ApiError';
import { semesterTitleCodeMapper } from './semester.constant';
import { calculatePagination } from '../../helpers/helper';
import { SortOrder } from 'mongoose';

const createSemesterService = async (
  payload: ISemester
): Promise<ISemester> => {
  if (semesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }
  const result = await Semester.create(payload);
  return result;
};

const getAllSemestersService = async (
  payload: IPaginationOptions
): Promise<IGenericResponse<ISemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(payload);
  const sortFilter: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortFilter[sortBy] = sortOrder;
  }
  const result = await Semester.find().sort(sortFilter).skip(skip).limit(limit);
  const count = await Semester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total: count,
    },
    data: result,
  };
};
export { createSemesterService, getAllSemestersService };
