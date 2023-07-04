import { Schema, model } from 'mongoose';
import { DepartmentModel, IDepartment } from './department.interface';

const departmentSchema = new Schema<IDepartment, DepartmentModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Department = model<IDepartment>('Department', departmentSchema);
