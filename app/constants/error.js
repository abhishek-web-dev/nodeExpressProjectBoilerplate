
const { httpCode } = require('./http');
const {
  ERROR_CODES: USER_COMPONENT_ERROR_CODES,
  ERROR_INFO: USER_COMPONENT_ERROR_INFO,
} = require('./../modules/user/error');

const {
  ERROR_CODES: ADMIN_COMPONENT_ERROR_CODES,
  ERROR_INFO: ADMIN_COMPONENT_ERROR_INFO,
} = require('../components/admin/error');

const {
  ERROR_CODES: ADV_COMPONENT_ERROR_CODES,
  ERROR_INFO: ADV_COMPONENT_ERROR_INFO,
} = require('../components/advertisement/error');

const {
  ERROR_CODES: APP_STORE_COMPONENT_ERROR_CODES,
  ERROR_INFO: APP_STORE_COMPONENT_ERROR_INFO,
} = require('../components/appStore/error');

const {
  ERROR_CODES: CATEGORY_SECTION_COMPONENT_ERROR_CODES,
  ERROR_INFO: CATEGORY_SECTION_COMPONENT_ERROR_INFO,
} = require('../components/categorySection/error');

const {
  ERROR_CODES: APP_COMPONENT_ERROR_CODES,
  ERROR_INFO: APP_COMPONENT_ERROR_INFO,
} = require('../components/app/error');

const {
  ERROR_CODES: APP_SECTION_COMPONENT_ERROR_CODES,
  ERROR_INFO: APP_SECTION_COMPONENT_ERROR_INFO,
} = require('../components/appSection/error');

const {
  ERROR_CODES: BOOKAMRK_COMPONENT_ERROR_CODES,
  ERROR_INFO: BOOKMARKS_COMPONENT_ERROR_INFO,
} = require('../components/bookmark/error');

const {
  ERROR_CODES: BROWSER_FAVOURITE_COMPONENT_ERROR_CODES,
  ERROR_INFO: BROWSER_FAVOURITE_COMPONENT_ERROR_INFO,
} = require('../components/browserFavourite/error');

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

  ...USER_COMPONENT_ERROR_CODES,
  ...ADMIN_COMPONENT_ERROR_CODES,
  ...ADV_COMPONENT_ERROR_CODES,
  ...APP_STORE_COMPONENT_ERROR_CODES,
  ...CATEGORY_SECTION_COMPONENT_ERROR_CODES,
  ...APP_COMPONENT_ERROR_CODES,
  ...APP_SECTION_COMPONENT_ERROR_CODES,
  ...BOOKAMRK_COMPONENT_ERROR_CODES,
  ...BROWSER_FAVOURITE_COMPONENT_ERROR_CODES
};

const ERROR_INFO = {
  [ERROR_CODES.ROUTE_NOT_FOUND]: { message: 'API route not found', httpCode: httpCode.NOT_FOUND },
  [ERROR_CODES.OBJECT_NOT_FOUND]: { message: 'Object not found', httpCode: httpCode.NOT_FOUND },

  [ERROR_CODES.AUTH_TOKEN_REQUIRED]: { message: 'Authentication Token required', httpCode: httpCode.UNAUTHORIZED },
  [ERROR_CODES.USERTYPE_NOT_ALLOWED]: { message: 'This type of user is not allowed to perform this action', httpCode: httpCode.FORBIDDEN },
  [ERROR_CODES.JWT_INVALID_SIGNATURE]: { message: 'This token hasn\'t been generated from our system', httpCode: httpCode.UNAUTHORIZED },
  [ERROR_CODES.JWT_INVALID_VALUE]: { message: 'Invalid value for JWT token', httpCode: httpCode.BAD_REQUEST },
  [ERROR_CODES.JWT_EXPIRED]: { message: 'JWT expired. Please Login again', httpCode: httpCode.UNAUTHORIZED },
  [ERROR_CODES.USER_BLOCKED]: { message: 'This user has been blocked by the administrators', httpCode: httpCode.UNAUTHORIZED },

  [ERROR_CODES.GOOGLE_LOGIN_EMAIL_NOT_VERIFIED]: { message: 'The email of your google account is not verified', httpCode: httpCode.UNAUTHORIZED },
  [ERROR_CODES.GOOGLE_LOGIN_INVALID_TOKEN]: { message: 'Invalid ID token', httpCode: httpCode.UNAUTHORIZED },
  [ERROR_CODES.GOOGLE_LOGIN_EMAIL_SCOPE_MISSING]: { message: 'Email scope missing. Could not retreive email information', httpCode: httpCode.UNAUTHORIZED },

  [ERROR_CODES.FACEBOOK_INVALID_APP_ID_IN_TOKEN]: { message: 'This token does not belong to our system', httpCode: httpCode.UNAUTHORIZED },
  [ERROR_CODES.FACEBOOK_LOGIN_EMAIL_SCOPE_MISSING]: { message: 'Email scope missing. Could not retreive email information', httpCode: httpCode.UNAUTHORIZED },

  [ERROR_CODES.REQUEST_BODY_INVALID]: { message: 'Invalid body in request', httpCode: httpCode.BAD_REQUEST },
  [ERROR_CODES.REQUEST_QUERY_INVALID]: { message: 'Invalid query in request', httpCode: httpCode.BAD_REQUEST },
  [ERROR_CODES.REQUEST_PARAMS_INVALID]: { message: 'Invalid params in API route', httpCode: httpCode.BAD_REQUEST },

  ...USER_COMPONENT_ERROR_INFO,
  ...ADMIN_COMPONENT_ERROR_INFO,
  ...ADV_COMPONENT_ERROR_INFO,
  ...APP_STORE_COMPONENT_ERROR_INFO,
  ...CATEGORY_SECTION_COMPONENT_ERROR_INFO,
  ...APP_COMPONENT_ERROR_INFO,
  ...APP_SECTION_COMPONENT_ERROR_INFO,
  ...BOOKMARKS_COMPONENT_ERROR_INFO,
  ...BROWSER_FAVOURITE_COMPONENT_ERROR_INFO
};

module.exports = {
  ERROR_CODES,
  ERROR_INFO
};
