const { successResponse } = require("../../utils/controller/response");
const httpCode = require("../../constants/http").httpCode;
const service = require("./service");
const validator = require("./validator");
const { validateRequest } = require("../../utils/controller/request");

const commonModelConstants = require("../../constants/model");

let getStore = async (request, response) => {
  console.log("********** getStore called");
  validateRequest(request, validator.getStore);
  console.log("**********  getStore validated");
  let result;
  if (request.user.userType == commonModelConstants.USERTYPE_ADMIN)
    result = await service.getStoreForAdmin(
      request.query.countryCode,
      request.query.languageCode
    );
  else
    result = await service.getStoreForUser(
      request.user.userId,
      request.query.countryCode,
      request.query.languageCode
    );
  console.log("**********  getStore finished");
  successResponse(request, response, httpCode.OK_REQUEST, result);
};

let update = async (request, response) => {
  validateRequest(request, validator.update);

  let store = await service.update(request.body);
  successResponse(request, response, httpCode.OK_REQUEST, store);
};

module.exports = {
  getStore,
  update,
};
