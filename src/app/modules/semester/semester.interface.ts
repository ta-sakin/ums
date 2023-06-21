import { Model } from 'mongoose';
export type ISemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type ISemesterTitles = 'Autumn' | 'Summer' | 'Fall';

export type ISemesterCodes = '01' | '02' | '03';

export type ISemester = {
  title: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
};

export type SemesterModel = Model<ISemester>;

export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
