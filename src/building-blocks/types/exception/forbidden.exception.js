'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { httpStatus } = require('http-status');
class ForbiddenException extends Error {
  statusCode;
  isOperational;
  constructor(message, statusCode = httpStatus.FORBIDDEN, isOperational = true, stack = '') {
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
exports.default = ForbiddenException;
//# sourceMappingURL=forbidden.exception.js.map
