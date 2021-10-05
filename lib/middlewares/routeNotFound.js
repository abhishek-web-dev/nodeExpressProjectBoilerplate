
const { ERROR_CODES } = require('../../constants/error');
const AppError = require('../errorClasses/appError');

module.exports = (request, response) => {
  throw new AppError(ERROR_CODES.ROUTE_NOT_FOUND);
};
