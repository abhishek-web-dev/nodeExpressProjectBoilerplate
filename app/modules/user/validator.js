
const { Joi, docSchema } = require('../../utils/validators');

const { getCountryCodeList, getDiallingCodeList, getLanuagesCodeList } = require('../miscallaneous/service');

const sendLoginOtp = {
  body: Joi.object().keys({
    phoneNumber: Joi.number().required().min(1E7).max(1E16),
    diallingCode: Joi.string().required().valid(...getDiallingCodeList())
  })
};

const login = {
  body: Joi.object().keys({
    phoneNumber: Joi.number().required().min(1E7).max(1E16),
    diallingCode: Joi.string().required().valid(...getDiallingCodeList()),
    otp: Joi.number().required().min(1000).max(9999)
  }),
};

let getPaginatedList = {
  query: Joi.object().keys({
    page: Joi.number(),
    pageSize: Joi.number(),
    isGlobal: Joi.boolean(),
    countryCode: Joi.valid(...getCountryCodeList()),
    search: Joi.string(),
    phoneNumber: Joi.number()
  })
};

let exportList = {
  query: Joi.object().keys({
    search: Joi.string()
  })
};

let googleSignin = {
  body: Joi.object().keys({
    idToken: Joi.string().required()
  })
};

let facebookSignin = {
  body: Joi.object().keys({
    accessToken: Joi.string().required()
  })
};

let updateProfile = {
  body: Joi.object().keys({
    firstName: Joi.string().allow(null, ''),
    lastName: Joi.string().allow(null, ''),
    profilePicture: docSchema,
    interests: Joi.array().items(Joi.object().keys({
      name: Joi.string().required(),
      icon: docSchema.required()
    }).required()),
    language: Joi.string().valid(...getLanuagesCodeList()),
    countryCode: Joi.valid(...getCountryCodeList()),
  })
};

let block = {
  params: Joi.object().keys({
    userId: Joi.string().required().mongoDBObjectID()
  })
};

let unblock = {
  params: Joi.object().keys({
    userId: Joi.string().required().mongoDBObjectID()
  })
};

const sendUpdatePhoneOtp = {
  body: Joi.object().keys({
    phoneNumber: Joi.number().required().min(1E7).max(1E16),
    diallingCode: Joi.string().required().valid(...getDiallingCodeList())
  })
};

const updatePhone = {
  body: Joi.object().keys({
    phoneNumber: Joi.number().required().min(1E7).max(1E16),
    diallingCode: Joi.string().required().valid(...getDiallingCodeList()),
    otp: Joi.number().required().min(1000).max(9999)
  }),
};

module.exports = {
  sendLoginOtp,
  login,
  googleSignin,
  facebookSignin,
  updateProfile,
  unblock,
  block,
  getPaginatedList,
  exportList,
  sendUpdatePhoneOtp,
  updatePhone
};
