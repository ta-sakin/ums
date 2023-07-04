import { Schema, model } from 'mongoose';
import { IFaculty } from './faculty.interface';

const facultySchema = new Schema<IFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Faculty = model<IFaculty>('Faculty', facultySchema);
