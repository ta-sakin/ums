export type GenericErrorMessage = {
  path: string | number;
  message: string;
};

export type GenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: GenericErrorMessage[];
  stack?: string;
};
