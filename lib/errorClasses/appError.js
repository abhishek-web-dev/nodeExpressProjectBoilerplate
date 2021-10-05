const BaseError = require('./baseError');

//this class will handle operational and non-operational errors
class AppError extends BaseError {
  constructor(errorOrigin, httpCode, isOperational, description) {
    super(errorOrigin, httpCode, isOperational, description);
  }
 }

 module.exports = AppError;