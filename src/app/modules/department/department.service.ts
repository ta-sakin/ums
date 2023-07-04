import { Department } from './department.model';
import { calculatePagination } from '../../helpers/helper';
import { SortOrder } from 'mongoose';
import {
  IFilters,
  IPaginationOptions,
  IGenericResponse,
} from '../../../common/types';
import { DepartmentSearchableFields } from './department.constant';
import { IDepartment } from './department.interface';

const createDepartmentService = async (
  payload: IDepartment
): Promise<IDepartment> => {
  const result = await Department.create(payload);
  return result;
};
const updateDepartmentService = async (
  id: string,
  payload: Partial<IDepartment>
): Promise<IDepartment | null> => {
  const result = await Department.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteDepartmentService = async (
  id: string
): Promise<IDepartment | null> => {
  const result = await Department.findByIdAndDelete(id);
  return result;
};
const getAllDepartmentsService = async (
  filters: IFilters,
  payload: IPaginationOptions
): Promise<IGenericResponse<IDepartment[]>> => {
  const { searchTerm, ...exactFilters } = filters;
  let searchBy: { [key: string]: Array<object> } = { $and: [] };
  if (searchTerm) {
    searchBy = {
      $and: [
        {
          $or: DepartmentSearchableFields.map((field: string) => ({
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
  const result = await Department.find(searchBy)
    .populate('faculty')
    .sort(sortFilter)
    .skip(skip)
    .limit(limit);
  const count = await Department.countDocuments();
  return {
    meta: {
      page,
      limit,
      total: count,
    },
    data: result,
  };
};

const getOneDepartmentService = async (
  id: string
): Promise<IDepartment | null> => {
  const result = await Department.findById(id).populate('faculty');
  return result;
};
export {
  createDepartmentService,
  getAllDepartmentsService,
  getOneDepartmentService,
  updateDepartmentService,
  deleteDepartmentService,
};
