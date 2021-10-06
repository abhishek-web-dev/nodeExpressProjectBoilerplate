
const { httpCode, httpMessage } = require('./http');
const {
  ERROR_CODES: USER_COMPONENT_ERROR_CODES,
  ERROR_INFO: USER_COMPONENT_ERROR_INFO,
} = require('./../modules/user/error');

const ERROR_CODES = {
  ROUTE_NOT_FOUND: 2000,
  OBJECT_NOT_FOUND: 2001,

  AUTH_TOKEN_REQUIRED: 2100,
  JWT_INVALID_VALUE: 2101,
  JWT_EXPIRED: 2102,
  JWT_INVALID_SIGNATURE: 2103,
  USER_BLOCKED: 2106,

  USERTYPE_NOT_ALLOWED: 2200,

  REQUEST_BODY_INVALID: 2300,
  REQUEST_QUERY_INVALID: 2301,
  REQUEST_PARAMS_INVALID: 2302,

  GOOGLE_LOGIN_INVALID_TOKEN: 3000,
  GOOGLE_LOGIN_EMAIL_NOT_VERIFIED: 3001,
  GOOGLE_LOGIN_EMAIL_SCOPE_MISSING: 3002,

  FACEBOOK_LOGIN_EMAIL_SCOPE_MISSING: 3100,
  FACEBOOK_INVALID_APP_ID_IN_TOKEN: 3101,

  ...USER_COMPONENT_ERROR_CODES
};

//httpCode, errorDescription, type, errorUserTitle, errorUserMsg
const ERROR_INFO = {
  [ERROR_CODES.ROUTE_NOT_FOUND]: {
    errorDescription:'API route not found',
    type:'',
    errorUserTitle:'',
    errorUserMsg: httpMessage[httpCode.NOT_FOUND], 
    httpCode: httpCode.NOT_FOUND 
  },
  [ERROR_CODES.OBJECT_NOT_FOUND]: {
    errorDescription:'Object not found',
    type:'',
    errorUserTitle:'',
    errorUserMsg: httpMessage[httpCode.NOT_FOUND], 
    httpCode: httpCode.NOT_FOUND 
  },

  [ERROR_CODES.AUTH_TOKEN_REQUIRED]: { 
    errorDescription:'Authentication Token required',
    type:'',
    errorUserTitle:'',
    errorUserMsg: httpMessage[httpCode.UNAUTHORIZED], 
    httpCode: httpCode.UNAUTHORIZED 
  },
  [ERROR_CODES.USERTYPE_NOT_ALLOWED]: {
    errorDescription:'This type of user is not allowed to perform this action',
    type:'',
    errorUserTitle:'', 
    errorUserMsg: httpMessage[httpCode.FORBIDDEN], 
    httpCode: httpCode.FORBIDDEN 
  },
  [ERROR_CODES.JWT_INVALID_SIGNATURE]: { 
    errorDescription:'This token hasn\'t been generated from our system',
    type:'',
    errorUserTitle:'',
    errorUserMsg: httpMessage[httpCode.UNAUTHORIZED], 
    httpCode: httpCode.UNAUTHORIZED 
  },
  [ERROR_CODES.JWT_INVALID_VALUE]: { 
    errorDescription:'Invalid value for JWT token',
    type:'',
    errorUserTitle:'',
    errorUserMsg: httpMessage[httpCode.BAD_REQUEST], 
    httpCode: httpCode.BAD_REQUEST 
  },
  [ERROR_CODES.JWT_EXPIRED]: { 
    errorDescription:'JWT expired. Please Login again',
    type:'',
    errorUserTitle:'',
    errorUserMsg: httpMessage[httpCode.UNAUTHORIZED], 
    httpCode: httpCode.UNAUTHORIZED 
  },
  [ERROR_CODES.USER_BLOCKED]: { 
    errorDescription:'This user has been blocked by the administrators',
    type:'',
    errorUserTitle:'',
    errorUserMsg: httpMessage[httpCode.UNAUTHORIZED], 
    httpCode: httpCode.UNAUTHORIZED 
  },

  [ERROR_CODES.GOOGLE_LOGIN_EMAIL_NOT_VERIFIED]: { 
    errorDescription:'The email of your google account is not verified',
    type:'',
    errorUserTitle:'',
    errorUserMsg: httpMessage[httpCode.UNAUTHORIZED], 
    httpCode: httpCode.UNAUTHORIZED 
  },
  [ERROR_CODES.GOOGLE_LOGIN_INVALID_TOKEN]: { 
    errorDescription:'Invalid ID token',
    type:'',
    errorUserTitle:'',
    errorUserMsg: httpMessage[httpCode.UNAUTHORIZED], 
    httpCode: httpCode.UNAUTHORIZED 
  },
  [ERROR_CODES.GOOGLE_LOGIN_EMAIL_SCOPE_MISSING]: {
    errorDescription:'Email scope missing. Could not retreive email information',
    type:'',
    errorUserTitle:'', 
    errorUserMsg: httpMessage[httpCode.UNAUTHORIZED], 
    httpCode: httpCode.UNAUTHORIZED 
  },

  [ERROR_CODES.FACEBOOK_INVALID_APP_ID_IN_TOKEN]: { 
    errorDescription:'This token does not belong to our system',
    type:'',
    errorUserTitle:'',
    errorUserMsg: httpMessage[httpCode.UNAUTHORIZED], 
    httpCode: httpCode.UNAUTHORIZED 
  },
  [ERROR_CODES.FACEBOOK_LOGIN_EMAIL_SCOPE_MISSING]: { 
    errorDescription:'Email scope missing. Could not retreive email information',
    type:'',
    errorUserTitle:'',
    errorUserMsg: httpMessage[httpCode.UNAUTHORIZED], 
    httpCode: httpCode.UNAUTHORIZED 
  },

  [ERROR_CODES.REQUEST_BODY_INVALID]: { 
    errorDescription:'Invalid body in request',
    type:'',
    errorUserTitle:'',
    errorUserMsg: httpMessage[httpCode.BAD_REQUEST], 
    httpCode: httpCode.BAD_REQUEST 
  },
  [ERROR_CODES.REQUEST_QUERY_INVALID]: { 
    errorDescription:'Invalid query in request',
    type:'',
    errorUserTitle:'',
    errorUserMsg: httpMessage[httpCode.BAD_REQUEST], 
    httpCode: httpCode.BAD_REQUEST 
  },
  [ERROR_CODES.REQUEST_PARAMS_INVALID]: { 
    errorDescription:'Invalid params in API route',
    type:'',
    errorUserTitle:'',
    errorUserMsg: httpMessage[httpCode.BAD_REQUEST], 
    httpCode: httpCode.BAD_REQUEST 
  },

  ...USER_COMPONENT_ERROR_INFO
};

module.exports = {
  ERROR_CODES,
  ERROR_INFO
};
