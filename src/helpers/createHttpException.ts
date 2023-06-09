import { HttpException, HttpStatus } from '@nestjs/common';

const messages: Record<number, any> = {
  [HttpStatus.BAD_REQUEST]: 'Bad Request',
  [HttpStatus.UNAUTHORIZED]: 'Unauthorized',
  [HttpStatus.FORBIDDEN]: 'Forbidden',
  [HttpStatus.NOT_FOUND]: 'Not Found',
  [HttpStatus.CONFLICT]: 'Conflict',
};

type CustomHttpExceptionOptions = {
  statusCode?: number;
  innerCode?: number;
  message?: string;
  reason?: string;
  error?: any;
};

function createHttpException({
  statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
  innerCode = HttpStatus.INTERNAL_SERVER_ERROR,
  message = messages[statusCode],
  reason = messages[innerCode],
}: CustomHttpExceptionOptions) {
  const response: CustomHttpExceptionOptions = {
    statusCode,
    message,
  };

  if (innerCode) {
    response.innerCode = innerCode;
    response.reason = reason;
  }

  return new HttpException(response, statusCode, { cause: new Error(message) });
}

export default createHttpException;
