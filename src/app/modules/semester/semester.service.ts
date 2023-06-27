import httpStatus from 'http-status';
import { ISemester } from './semester.interface';
import { Semester } from './semster.model';
import ApiError from '../../../errors/ApiError';
import {
  semesterSearchableFields,
  semesterTitleCodeMapper,
} from './semester.constant';
import { calculatePagination } from '../../helpers/helper';
import { SortOrder } from 'mongoose';
import {
  IFilters,
  IGenericResponse,
  IPaginationOptions,
} from '../../../common/types';

const createSemesterService = async (
  payload: ISemester
): Promise<ISemester> => {
  if (semesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Invalid Semester Code`);
  }
  const result = await Semester.create(payload);
  return result;
};
const updateSemesterService = async (
  id: string,
  payload: Partial<ISemester>
): Promise<ISemester | null> => {
  if (
    payload.title &&
    payload.code &&
    semesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Invalid Semester Code expected ${semesterTitleCodeMapper[payload.title]}`
    );
  }
  const result = await Semester.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteSemesterService = async (id: string): Promise<ISemester | null> => {
  const result = await Semester.findByIdAndDelete(id);
  return result;
};
const getAllSemestersService = async (
  filters: IFilters,
  payload: IPaginationOptions
): Promise<IGenericResponse<ISemester[]>> => {
  const { searchTerm, ...exactFilters } = filters;
  let searchBy: { [key: string]: Array<object> } = { $and: [] };
  if (searchTerm) {
    searchBy = {
      $and: [
        {
          $or: semesterSearchableFields.map(field => ({
            [field]: { $regex: searchTerm, $options: 'i' },
          })),
        },
      ],
    };
  }
  if (Object.entries(exactFilters).length > 0) {
    searchBy['$and'].push({
      $and: Object.entries(exactFilters).map(([key, value]) => ({
        [key]: value,
      })),
    });
  }

  if (!searchBy['$and'].length) {
    searchBy = {};
  }

  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(payload);
  const sortFilter: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortFilter[sortBy] = sortOrder;
  }
  const result = await Semester.find(searchBy)
    .sort(sortFilter)
    .skip(skip)
    .limit(limit);
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

const getOneSemesterService = async (id: string): Promise<ISemester | null> => {
  const result = await Semester.findById(id);
  return result;
};
export {
  createSemesterService,
  getAllSemestersService,
  getOneSemesterService,
  updateSemesterService,
  deleteSemesterService,
};
