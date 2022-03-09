// core module

// feature modules
const { errorCodes } = require('../../app/constants');
const AppError = require('../errorClasses/appError');
const { verifyJwtToken } = require('../jwt');


const httpJwtAuthentication = (request, response, next) => {

  const token = request.headers.authorization;

  console.log('http token : ', token)

  try {
    payload = verifyJwtToken(token);
  }
  catch (error) {
    // let errorCode = getJWTErrorCode(error);
    // if (errorCode) throw new AppError(errorCode);
    // throw error;
    // console.error('2. ', error);
    throw new AppError(errorCodes.ERROR_CODES.INVALID_JWT_ERROR);
  }

  next();

};

module.exports = {
  httpJwtAuthentication
}