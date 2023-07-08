import { User } from './user.model';

const getLastUserId = async () => {
  const user = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return user?.id;
};

type IAcademicInfo = {
  year: number;
  code: number;
};
export const generateId = async (
  academicInfo: IAcademicInfo,
  role: string
): Promise<string> => {
  let generatedId: string | undefined = await getLastUserId();
  if (generatedId) {
    generatedId = (parseInt(generatedId) + 1).toString().padStart(5, '0');
  }
  let startPad = `${academicInfo.year
    .toString()
    .slice(2)}${academicInfo.code.toString()}`;
  if (role === 'faculty') {
    startPad = 'F-';
  }
  const id = generatedId || (1).toString().padStart(5, '0');
  return `${startPad}${id}`;
};
