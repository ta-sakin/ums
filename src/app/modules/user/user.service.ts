import config from '../../../config';
import { generateId } from './user.utils';
import { IUser } from './user.interface';
import { User } from './user.model';
import ApiError from '../../../errors/ApiError';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateId();
  user.id = id;
  if (!user.password) {
    user.password = config.defautUserPass as string;
  }
  const createdUser = await User.create(user);

  if (!createUser) {
    throw new ApiError(400, 'Failed to create user.');
  }
  return createdUser;
};
export { createUser };
