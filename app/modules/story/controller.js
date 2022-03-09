// feature modules
const { successResponse } = require('../../../lib/response/https/successResponse');
const { validateRequest } = require('../../../lib/request/validateRequest');
const { httpCode } = require('../../constants/http');
const service = require('./service');
const validator = require('./validator');

const getStory = async (request, response) => {
  validateRequest(request, validator.getStory);

  let userStory = await service.getStory({ ...request.params });

  // successResponse(request, response, httpCode.OK_REQUEST, responseObj);
  successResponse(response, httpCode.OK_REQUEST, userStory);
};


module.exports = {
  getStory
};
