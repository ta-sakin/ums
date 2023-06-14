import { User } from './user.model';

const getLastUserId = async () => {
  const user = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return user?.id;
};
export const generateId = async (): Promise<string> => {
  let generatedId: string | undefined = await getLastUserId();
  if (generatedId) {
    generatedId = (parseInt(generatedId) + 1).toString().padStart(5, '0');
  }
  return generatedId || (1).toString().padStart(5, '0');
};
