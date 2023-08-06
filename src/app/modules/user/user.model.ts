import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import config from '../../../config';
import bcrypt from 'bcrypt';
// const UserSchema = new Schema<IUser, Record<string, unknown>, IUserMethods>(
const UserSchema = new Schema<IUser, UserModel>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: { type: String, required: true },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// UserSchema.methods.isUserExits = async function (
//   id: string
// ): Promise<Partial<IUser> | null> {
//   const user = await User.findOne(
//     { id },
//     { id: 1, password: 1, needsPasswordChange: 1 }
//   ).lean();
//   return user;
// };

// UserSchema.methods.isPasswordCorrect = async function (
//   currentPassword: string,
//   savedPassword: string
// ): Promise<boolean> {
//   return await bcrypt.compare(currentPassword, savedPassword);
// };
UserSchema.statics.isUserExits = async function (
  id: string
): Promise<Pick<IUser, 'id' | 'password' | 'needsPasswordChange'> | null> {
  const user = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1 }
  ).lean();
  return user;
};

UserSchema.statics.isPasswordCorrect = async function (
  currentPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(currentPassword, savedPassword);
};

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcryptSaltRound)
  );
  next();
});
export const User = model<IUser, UserModel>('User', UserSchema);
