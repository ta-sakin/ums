import { Schema, model } from 'mongoose';
import {
  semesterCodes,
  semesterTitles,
  semesterMonths,
} from './semester.constant';
import { ISemester } from './semester.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const semesterSchema = new Schema<ISemester>(
  {
    title: {
      type: String,
      required: true,
      enum: semesterTitles,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: semesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: semesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: semesterMonths,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
semesterSchema.pre('save', async function (next) {
  const isExist = await Semester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `${this.title} semster already exist!`
    );
  }
  next();
});
export const Semester = model<ISemester>('Semester', semesterSchema);
