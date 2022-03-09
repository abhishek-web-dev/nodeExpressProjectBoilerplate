// feature modules
const { errorCodes } = require('../../app/constants');
const AppError = require('../errorClasses/appError');

module.exports = (request, response) => {
  throw new AppError(errorCodes.ERROR_CODES.ROUTE_NOT_FOUND);
};
