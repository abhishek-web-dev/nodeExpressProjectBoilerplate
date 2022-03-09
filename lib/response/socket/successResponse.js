const { http } = require('../../../app/constants');


let successResponse = (result) => {
  return {
    statusCode: http.httpCode.OK_REQUEST,
    result
  };
};


module.exports = { successResponse };