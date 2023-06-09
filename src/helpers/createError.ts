import { HttpException, HttpStatus } from '@nestjs/common';

const messages: Record<number, any> = {
  [HttpStatus.BAD_REQUEST]: 'Bad Request',
  [HttpStatus.UNAUTHORIZED]: 'Unauthorized',
  [HttpStatus.FORBIDDEN]: 'Forbidden',
  [HttpStatus.NOT_FOUND]: 'Not Found',
  [HttpStatus.CONFLICT]: 'Conflict',
};

type CreateExceptionOptions = {
  statusCode?: number;
  innerCode?: number;
  message?: string;
  reason?: string;
};

export type CustomError = CreateExceptionOptions;
function createError({
  statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
  innerCode = HttpStatus.INTERNAL_SERVER_ERROR,
  message = messages[statusCode],
  reason = messages[innerCode],
}: CreateExceptionOptions): CustomError {
  const response: CustomError = {
    statusCode,
    message,
  };

  if (innerCode) {
    response.innerCode = innerCode;
    response.reason = reason;
  }

  return new HttpException(response, statusCode, { cause: new Error(message) });
}

const er = createError({});

export default createError;
