import { Model, Schema, model } from 'mongoose'
import { IUser } from './users.interface'
type UserModel = Model<IUser, object>

const userSchema = new Schema<IUser, UserModel>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)
export const User = model<IUser, UserModel>('User', userSchema)