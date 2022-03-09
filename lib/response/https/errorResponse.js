// dependency library
// const { nanoid } = require('nanoid');

// feature modules
const AppError = require('../../errorClasses/appError');
const { errorCodes } = require('../../../app/constants');
const config = require('../../config');
const { sendErrorToAppyware } = require('../../sendErrorToAppyware')

// all error response will pass through this method
let errorResponse = function (request, response, error) {
  let customErrorCode, httpStatusCode, errorObj;

  const isOperational = error instanceof AppError;//true: known error
  // console.log('isOperational : ', isOperational, error)
  customErrorCode = isOperational ? error.customErrorCode : errorCodes.ERROR_CODES.INTERNAL_SERVER_ERROR;

  if (isOperational) {
    httpStatusCode = error.httpCode;
    errorObj = {
      // stack: error.stack,
      errorDescription: error.errorDescription,
      type: error.type,
      errorUserTitle: error.errorUserTitle,
      errorUserMsg: error.errorUserMsg
    };
  }
  else {
    httpStatusCode = errorCodes.ERROR_INFO[customErrorCode].httpCode, // http status code  
      errorObj = {
        stack: error.stack,
        errorDescription: errorCodes.ERROR_INFO[customErrorCode].errorDescription, //Message describing the error
        type: errorCodes.ERROR_INFO[customErrorCode].type, //error type or error origin
        errorUserTitle: errorCodes.ERROR_INFO[customErrorCode].errorUserTitle, //error title for user
        errorUserMsg: errorCodes.ERROR_INFO[customErrorCode].errorUserMsg //error msg for user
      };
  }

  // send error data to Appyware asynchronously
  const errorObjForAppyware = { ...errorObj };
  setTimeout(() => {
    try {
//       sendErrorToAppyware({
//         error: {
//           errorDescription: errorObjForAppyware.errorDescription,
//           type: errorObjForAppyware.type,
//           errorUserTitle: errorObjForAppyware.errorUserTitle,
//           errorUserMsg: errorObjForAppyware.errorUserMsg
//         },
//         isOperational,
//         errorTrace: error.stack,
//         statusCode: httpStatusCode,
//         originalUrl: `${request.hostname}${request.originalUrl}`,
//         protocol: request.protocol,
//         methods: request.method,
//         appName: config.appName,
//         environment: config.environment
//       });
    }
    catch (e) {
      // console.log('dont do anything!!')
    }
  }, 0);

  // Deleting any kind of password/code/token received from the client before logging the request body
  if (request.body) {
    delete request.body.password;
    delete request.body.code;
    delete request.body.token;
    delete request.body.authToken;
  }
  delete request.headers.authorization;


  if (config.environment === 'production') {
    delete errorObj.stack;
    delete errorObj.errorDescription;
    delete errorObj.type;
  }

  return response.status(httpStatusCode).json({
    statusCode: httpStatusCode,
    error: errorObj
  });
};


module.exports = { errorResponse };
