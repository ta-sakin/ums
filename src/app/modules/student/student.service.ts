/* eslint-disable @typescript-eslint/no-explicit-any */
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';
import { studentSearchableFields } from './student.constant';
import { calculatePagination } from '../../helpers/helper';
import { SortOrder } from 'mongoose';
import { IGenericResponse, IPaginationOptions } from '../../../common/types';

const updateStudentService = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const { name, guardian, localGuardian, ...studentData } = payload;
  const updateStudent: any = { ...studentData };
  if (name && Object.keys(name).length) {
    Object.keys(name).forEach((key: string) => {
      if (typeof key === 'string') {
        const nameKey = `name.${key}` as keyof Partial<IStudent>; // Assuming UserName is the type of the `name` property
        updateStudent[nameKey] = name[key as keyof typeof name];
      }
    });
  }
  if (guardian && Object.keys(guardian).length) {
    Object.keys(guardian).forEach((key: string) => {
      if (typeof key === 'string') {
        const guardianKey = `guardian.${key}` as keyof Partial<IStudent>; // Assuming Userguardian is the type of the `guardian` property
        updateStudent[guardianKey] = guardian[key as keyof typeof guardian];
      }
    });
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    Object.keys(localGuardian).forEach((key: string) => {
      if (typeof key === 'string') {
        const localGuardianKey =
          `localGuardian.${key}` as keyof Partial<IStudent>; // Assuming UserlocalGuardian is the type of the `localGuardian` property
        updateStudent[localGuardianKey] =
          localGuardian[key as keyof typeof localGuardian];
      }
    });
  }

  const result = await Student.findOneAndUpdate({ id }, updateStudent, {
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
