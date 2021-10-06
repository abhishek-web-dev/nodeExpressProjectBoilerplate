
const BaseError = require('./baseError');
const { ERROR_INFO } = require('../../app/constants/error');

//this class will handle operational and non-operational errors
class AppError extends BaseError {
  constructor(customErrorCode) {
    if (!customErrorCode)
       throw new Error('Invalid call to AppError');

    super(customErrorCode);

    // add custom properties to error object
    this.httpCode = ERROR_INFO[code].httpCode;   
    this.errorDescription = ERROR_INFO[code].errorDescription; //Message describing the error
    this.type = ERROR_INFO[code].type; //error type or error origin
    this.errorUserTitle = ERROR_INFO[code].errorUserTitle; //error title for user
    this.errorUserMsg = ERROR_INFO[code].errorUserMsg; //error msg for user
  }
 }

 module.exports = AppError;

