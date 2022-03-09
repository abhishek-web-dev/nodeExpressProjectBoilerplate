
// dependency library
const SocketError = require('../../errorClasses/socketError');
const { errorCodes } = require('../../../app/constants');
const config = require('../../config');
const { sendErrorToAppyware } = require('../../sendErrorToAppyware')




let errorResponse = function ({ io, socketId, error }) {
  let customErrorCode, httpStatusCode, errorObj;

  const isOperational = error instanceof SocketError;//true: known error
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
        // stack: error.stack,
        errorDescription: errorCodes.ERROR_INFO[customErrorCode].errorDescription, //Message describing the error
        type: errorCodes.ERROR_INFO[customErrorCode].type, //error type or error origin
        errorUserTitle: errorCodes.ERROR_INFO[customErrorCode].errorUserTitle, //error title for user
        errorUserMsg: errorCodes.ERROR_INFO[customErrorCode].errorUserMsg //error msg for user
      };
    console.log('500 error : ', error)
  }

  // send error data to Appyware asynchronously
  setTimeout(() => {
    try {
      sendErrorToAppyware({
        error: errorObj,
        isOperational,
        errorTrace: error.stack,
        statusCode: httpStatusCode,
        originalUrl: '',
        protocol: 'ws',
        methods: '',
        appName: config.appName,
        environment: config.environment
      });
    }
    catch (e) {
      // console.log('dont do anything!!')
    }
  }, 0);



  if (config.environment === 'production') {
    delete errorObj.errorDescription;
    delete errorObj.type;
  }

  io.to(socketId).emit("serverError", {
    statusCode: httpStatusCode,
    error: errorObj
  });//send job data to web user

  // return {
  //   statusCode: httpStatusCode,
  //   error: errorObj
  // };
};


module.exports = { errorResponse };