
const { errorResponse } = require('../response/errorResponse');

module.exports = function (error, request, response, next) {
  return errorResponse(request, response, error);
};