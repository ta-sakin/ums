import httpStatus from 'http-status';
import { ISemester } from './semester.interface';
import { Semester } from './semster.model';
import ApiError from '../../../errors/ApiError';
import { semesterTitleCodeMapper } from './semester.constant';

const createSemesterService = async (
  payload: ISemester
): Promise<ISemester> => {
  if (semesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }
  const result = await Semester.create(payload);
  return result;
};

export { createSemesterService };
