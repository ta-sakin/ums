import { Model, Types } from 'mongoose';

export type IUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  student?: Types.ObjectId;
  faculty?: Types.ObjectId;
  admin?: Types.ObjectId;
};
export type UserModel = Model<IUser, Record<string, unknown>>;
