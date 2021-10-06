
const { successResponse } = require('../../../lib/response/successResponse');
const { validateRequest } = require('../../../lib/request/validateRequest');
const { httpCode } = require('../../constants/http');
const service = require('./service');
const validator = require('./validator');
const config = require('./../../../lib/config')

let createUser = async (request, response) => {
  validateRequest(request, validator.createUser);

  let user = await service.createAccount({...request.body});

  let responseObj = {
    message: 'User has created successfully!'
  };
  if (config.environment != 'dev') {
    responseObj.name = `${user.firstName} ${user.lastName}`;
  }
  successResponse(request, response, httpCode.OK_REQUEST, responseObj);
};


module.exports = {
  createUser
};
