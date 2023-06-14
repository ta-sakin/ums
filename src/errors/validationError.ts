import mongoose from 'mongoose';
import { GenericErrorMessage, GenericErrorResponse } from '../types/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError
): GenericErrorResponse => {
  const errors: GenericErrorMessage[] = Object.values(err.errors).map(
    (obj: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: obj?.path,
        message: obj?.message,
      };
    }
  );
  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages: errors,
  };
};
export default handleValidationError;
