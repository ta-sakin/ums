import mongoose from 'mongoose';
import { GenericErrorMessage, GenericErrorResponse } from '../types/error';

const handleCastError = (
  error: mongoose.Error.CastError
): GenericErrorResponse => {
  const errors: GenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ];
  return {
    statusCode: 400,
    message: 'Cast Error',
    errorMessages: errors,
  };
};
export default handleCastError;
