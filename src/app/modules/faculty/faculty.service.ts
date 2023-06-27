import { IFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import { calculatePagination } from '../../helpers/helper';
import { SortOrder } from 'mongoose';
import {
  IFilters,
  IPaginationOptions,
  IGenericResponse,
} from '../../../common/types';
import { facultySearchableFields } from './faculty.constant';

const createFacultyService = async (payload: IFaculty): Promise<IFaculty> => {
  const result = await Faculty.create(payload);
  return result;
};
const updateFacultyService = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const result = await Faculty.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteFacultyService = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findByIdAndDelete(id);
  return result;
};
const getAllFacultiesService = async (
  filters: IFilters,
  payload: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...exactFilters } = filters;
  let searchBy: { [key: string]: Array<object> } = { $and: [] };
  if (searchTerm) {
    searchBy = {
      $and: [
        {
          $or: facultySearchableFields.map(field => ({
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
  const result = await Faculty.find(searchBy)
    .sort(sortFilter)
    .skip(skip)
    .limit(limit);
  const count = await Faculty.countDocuments();
  return {
    meta: {
      page,
      limit,
      total: count,
    },
    data: result,
  };
};

const getOneFacultyService = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id);
  return result;
};
export {
  createFacultyService,
  getAllFacultiesService,
  getOneFacultyService,
  updateFacultyService,
  deleteFacultyService,
};
