// core module

// dependency library

// feature modules
const { errorCodes } = require('../../app/constants');
const AppError = require('../errorClasses/appError');
const { verifyJwtToken } = require('../jwt');


const socketJwtAuthentication = async (socket, next) => {

  console.log("Auth request hit")

  if (socket.handshake.query && socket.handshake.query.token) {
    try {
      //  verify token
      const token = socket.handshake.query.token;
      verifyJwtToken(token);

      // TODO: write some logic
      next();

    }
    catch (e) {

      // next(new Error('Authentication error'));
      next(new AppError(errorCodes.ERROR_CODES.INVALID_JWT_ERROR));
    }
  }
  else {
    console.log("Authentication error")
    next(new AppError(errorCodes.ERROR_CODES.INVALID_JWT_ERROR));
  }

}


module.exports = {
  socketJwtAuthentication
}