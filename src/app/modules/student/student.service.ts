/* eslint-disable @typescript-eslint/no-explicit-any */
import { IStudent, IStudentFilters, UserName } from './student.interface';
import { Student } from './student.model';
import { studentSearchableFields } from './student.constant';
import { calculatePagination } from '../../helpers/helper';
import { SortOrder } from 'mongoose';
import { IGenericResponse, IPaginationOptions } from '../../../common/types';

const updateStudentService = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const { name, ...studentData } = payload;
  const updateStudent: any = { ...studentData };
  if (name && Object.keys(name).length) {
    Object.keys(name).forEach((key: string) => {
      if (typeof key === 'string') {
        const nameKey = key as keyof UserName; // Assuming UserName is the type of the `name` property
        updateStudent[`name.${key}`] = name[nameKey];
      }
    });
  }
  const result = await Student.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const getAllStudentsService = async (
  filters: IStudentFilters,
  payload: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...exactFilters } = filters;
  let searchBy: { [key: string]: Array<object> } = { $and: [] };
  if (searchTerm) {
    searchBy = {
      $and: [
        {
          $or: studentSearchableFields.map(field => ({
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
  const result = await Student.find(searchBy)
    .sort(sortFilter)
    .skip(skip)
    .limit(limit);
  const count = await Student.countDocuments(searchBy);
  return {
    meta: {
      page,
      limit,
      total: count,
    },
    data: result,
  };
};

const getOneStudentService = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id);
  return result;
};

const deleteStudentService = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id);
  return result;
};
export {
  getAllStudentsService,
  getOneStudentService,
  updateStudentService,
  deleteStudentService,
};
