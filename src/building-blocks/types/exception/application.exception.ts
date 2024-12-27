const { httpStatus } = require('http-status');

class ApplicationException extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(
    message: string | undefined,
    statusCode: number = httpStatus.BAD_REQUEST,
    isOperational = true,
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApplicationException;
