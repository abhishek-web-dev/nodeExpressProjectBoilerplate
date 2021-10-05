
class BaseError extends Error {
  constructor(errorOrigin, httpCode, description, isOperational) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
  
    this.errorOrigin = errorOrigin;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
  
    Error.captureStackTrace(this);
  }
 }

 module.exports = BaseError;