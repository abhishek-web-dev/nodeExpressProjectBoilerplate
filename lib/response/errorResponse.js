// dependency library
const { nanoid } = require('nanoid');
const AppError = require('../errorClasses/appError');
const { httpCode } = require('../../constants/http');


let errorResponse = function (request, response, error) {
  let httpStatusCode, errorObj;

  httpStatusCode = error instanceof AppError ? error.httpCode : httpCode.INTERNAL_SERVER_ERROR;
  errorObj = {
    message: error.message,
    stack: error.stack ? error.stack : (error.error ? error.error.stack : undefined),
    customErrorCode: error.customErrorCode,
    metaData: error.metaData
  };

  if (request.body) {
    // Deleting any kind of password/code/token received from the client before logging the request body
    delete request.body.password;
    delete request.body.code;
    delete request.body.token;
    delete request.body.authToken;
  }

  delete request.headers.authorization;

  let requestData = {
    id: request.headers.requestid,
    query: request.query,
    params: request.param,
    body: request.body,
    ip: request.headers['x-forwarded-for'] || request.ip,
    user: request.user,
    headers: request.headers,
  };

  if (process.env.NODE_ENV === 'production') {
    delete errorObj.stack;
    delete errorObj.metaData;
  }

  return response.status(httpStatusCode).json({
    statusCode: httpStatusCode,
    error: errorObj,
    requestId: request.headers.requestid,
  });
};


module.exports = {errorResponse};