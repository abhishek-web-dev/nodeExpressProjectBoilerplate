
const { successResponse } = require('../../utils/controller/response');
const { validateRequest } = require('../../utils/controller/request');
const httpCode = require('../../constants/http').httpCode;
const service = require('./service');
const validator = require('./validator');
const createPaginationUrls = require('../../utils/controller/createPaginationUrls');
const { processQuery } = require('../../utils/controller/request');

let sendLoginOtp = async (request, response) => {
  validateRequest(request, validator.sendLoginOtp);

  let otp = await service.sendLoginOtp(request.body.phoneNumber, request.body.diallingCode);

  let responseObj = {
    message: 'OTP sent successfully',
  };
  if (process.env.NODE_ENV != 'production') {
    responseObj.otp = otp;
  }
  successResponse(request, response, httpCode.OK_REQUEST, responseObj);
};

let login = async (request, response) => {
  validateRequest(request, validator.login);

  let userObj = await service.login(request.body.phoneNumber, request.body.diallingCode, request.body.otp);
  successResponse(request, response, httpCode.OK_REQUEST, userObj);
};

let guestLogin = async (request, response) => {
  let userObj = await service.guestLogin();
  successResponse(request, response, httpCode.OK_REQUEST, userObj);
};

let googleSignin = async (request, response) => {
  validateRequest(request, validator.googleSignin);

  let userObj = await service.googleSignin(request.body.idToken);
  successResponse(request, response, httpCode.OK_REQUEST, userObj);
};

let facebookSignin = async (request, response) => {
  validateRequest(request, validator.facebookSignin);

  let userObj = await service.facebookSignin(request.body.accessToken);
  successResponse(request, response, httpCode.OK_REQUEST, userObj);
};

let getProfile = async (request, response) => {
  let userObj = await service.getById(request.user.userId);
  successResponse(request, response, httpCode.OK_REQUEST, userObj);
};

let getPaginatedList = async (request, response) => {
  let { query } = validateRequest(request, validator.getPaginatedList);

  query = processQuery(query);
  let userObjs = await service.getPaginatedList(query);

  createPaginationUrls(userObjs, request.originalUrl);
  successResponse(request, response, httpCode.OK_REQUEST, userObjs);
};

let updateProfile = async (request, response) => {
  let { body } = validateRequest(request, validator.updateProfile);

  let userObj = await service.updateById(request.user.userId, body);
  successResponse(request, response, httpCode.OK_REQUEST, userObj);
};

let block = async (request, response) => {
  validateRequest(request, validator.block);

  let userObj = await service.block(request.params.userId);
  successResponse(request, response, httpCode.OK_REQUEST, userObj);
};

let unblock = async (request, response) => {
  validateRequest(request, validator.unblock);

  let userObj = await service.unblock(request.params.userId);
  successResponse(request, response, httpCode.OK_REQUEST, userObj);
};

let exportList = async (request, response) => {
  let { query } = validateRequest(request, validator.exportList);
  query = processQuery(query);

  let result = await service.exportList(query);
  successResponse(request, response, httpCode.OK_REQUEST, result);
};

let sendUpdatePhoneOtp = async (request, response) => {
  validateRequest(request, validator.sendUpdatePhoneOtp);

  let otp = await service.sendUpdatePhoneOtp(request.user.userId, request.body.phoneNumber, request.body.diallingCode);

  let responseObj = {
    message: 'OTP sent successfully',
  };
  if (process.env.NODE_ENV != 'production') {
    responseObj.otp = otp;
  }
  successResponse(request, response, httpCode.OK_REQUEST, responseObj);
};

let updatePhone = async (request, response) => {
  validateRequest(request, validator.updatePhone);

  let userObj = await service.updatePhone(
    request.user.userId,
    request.body.phoneNumber,
    request.body.diallingCode,
    request.body.otp
  );
  successResponse(request, response, httpCode.OK_REQUEST, userObj);
};

module.exports = {
  sendLoginOtp,
  login,
  getProfile,
  googleSignin,
  facebookSignin,
  getPaginatedList,
  updateProfile,
  block,
  unblock,
  exportList,
  sendUpdatePhoneOtp,
  updatePhone,
  guestLogin
};
