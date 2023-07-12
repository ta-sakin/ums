import { User } from './user.model';

const getLastStudentId = async () => {
  const user = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return user?.id ? user?.id.substring(4) : '';
};
const getLastFacultyId = async () => {
  const user = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return user?.id ? user?.id.substring(2) : '';
};

type IAcademicInfo = {
  year: string;
  code: string;
  role: string;
};
export const generateId = async ({
  role,
  year,
  code,
}: IAcademicInfo): Promise<string> => {
  let generatedId: string | undefined = await getLastStudentId();
  if (generatedId) {
    generatedId = (parseInt(generatedId) + 1).toString().padStart(5, '0');
  }
  let startPad = `${year.slice(2)}${code}`;
  if (role === 'faculty') {
    startPad = 'F-';
  }
  const id = generatedId || (1).toString().padStart(5, '0');
  return `${startPad}${id}`;
};

export const generateStudentId = async (code: string): Promise<string> => {
  const year = new Date().getFullYear().toString();
  let generatedId: string | undefined = await getLastStudentId();
  if (generatedId) {
    generatedId = (parseInt(generatedId) + 1).toString().padStart(5, '0');
  }
  const startPad = `${year.slice(2)}${code}`;

  const id = generatedId || (1).toString().padStart(5, '0');
  return `${startPad}${id}`;
};
export const generateFacultyId = async (): Promise<string> => {
  let generatedId: string | undefined = await getLastFacultyId();
  if (generatedId) {
    generatedId = (parseInt(generatedId) + 1).toString().padStart(5, '0');
  }
  const startPad = 'F-';
  const id = generatedId || (1).toString().padStart(5, '0');
  return `${startPad}${id}`;
};
