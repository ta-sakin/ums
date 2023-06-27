/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { GenericErrorMessage } from '../../types/error';
import config from '../../config';
import handleValidationError from '../../errors/validationError';
import ApiError from '../../errors/ApiError';
import { errorLogger } from '../../common/logger';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import handleCastError from '../../errors/handleCastError';
const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.env === 'development'
    ? console.log('Global error handler', err)
    : errorLogger.error(err);
  let statusCode = 500;
  let message = 'Interal server error';

  let errorMessages: GenericErrorMessage[] = [];
  if (err?.name?.toLowerCase() === 'validationerror') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ZodError) {
    const simplifiedZodError = handleZodError(err);
    statusCode = simplifiedZodError.statusCode;
    message = simplifiedZodError.message;
    errorMessages = simplifiedZodError.errorMessages;
  } else if (err?.name?.toLowerCase() === 'casterror') {
    const simplifiedZodError = handleCastError(err);
    statusCode = simplifiedZodError.statusCode;
    message = simplifiedZodError.message;
    errorMessages = simplifiedZodError.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env === 'development' ? err?.stack : undefined,
  });
};

export default globalErrorHandler;
