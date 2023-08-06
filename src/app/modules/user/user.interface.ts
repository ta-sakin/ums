/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type IUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  needsPasswordChange: true | false;
  student?: Types.ObjectId;
  faculty?: Types.ObjectId;
  admin?: Types.ObjectId;
};

// export type IUserMethods = {
// isUserExits(id: string): Promise<Partial<IUser> | null>;
// isPasswordCorrect(
//   currentPassword: string,
//   savedPassword: string
// ): Promise<boolean>;
// };
export type UserModel = {
  isUserExits(
    id: string
  ): Promise<Pick<IUser, 'id' | 'password' | 'needsPasswordChange'> | null>;
  isPasswordCorrect(
    currentPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
