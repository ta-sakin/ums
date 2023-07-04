import { Model } from 'mongoose';

export type IDepartment = {
  title: string;
  faculty: Record<string, unknown>;
};

export type DepartmentModel = Model<IDepartment>;
