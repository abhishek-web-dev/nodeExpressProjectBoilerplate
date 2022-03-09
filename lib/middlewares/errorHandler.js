// feature modules
const { errorResponse } = require('../response/https/errorResponse');

module.exports = function (error, request, response, next) {
  return errorResponse(request, response, error);
};