import { ZodError, ZodIssue } from 'zod';
import { GenericErrorMessage, GenericErrorResponse } from '../types/error';

const handleZodError = (error: ZodError): GenericErrorResponse => {
  const errors: GenericErrorMessage[] = error.issues.map((issue: ZodIssue) => ({
    path: issue?.path[issue.path.length - 1],
    message: issue?.message,
  }));
  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages: errors,
  };
};
export default handleZodError;
