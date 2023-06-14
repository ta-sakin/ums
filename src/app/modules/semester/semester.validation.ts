import { z } from 'zod';
import {
  semesterCodes,
  semesterMonths,
  semesterTitles,
} from './semester.constant';

const createSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...semesterTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.number({
      required_error: 'Year is required ',
    }),
    code: z.enum([...semesterCodes] as [string, ...string[]]),
    startMonth: z.enum([...semesterMonths] as [string, ...string[]], {
      required_error: 'Start month is required',
    }),
    endMonth: z.enum([...semesterMonths] as [string, ...string[]], {
      required_error: 'End month is required',
    }),
  }),
});

export { createSemesterZodSchema };
