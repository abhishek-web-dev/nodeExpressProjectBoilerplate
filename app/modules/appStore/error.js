
const { httpCode } = require('../../constants/http');

const ERROR_CODES = {
  INVALID_IDS_IN_FEATURED_APPS: 1300,
  INVALID_IDS_IN_PEOPLE_LOVING_APPS: 1301,
  INVALID_IDS_IN_TRY_NEW_APPS: 1302,
  INVALID_IDS_IN_TOP_CATEGORIES: 1303,
  INVALID_APP_IDS_IN_BANNERS: 1304,
  INVALID_BANNER_IDS_IN_BANNERS: 1305
};

const ERROR_INFO = {
  [ERROR_CODES.INVALID_IDS_IN_FEATURED_APPS]: { message: '"Featured" Apps: Some of the IDs are invalid or the app is either inactive or not available in the given scope', httpCode: httpCode.BAD_REQUEST },
  [ERROR_CODES.INVALID_IDS_IN_PEOPLE_LOVING_APPS]: { message: '"People are loving" Apps: Some of the IDs are invalid or the app is either inactive or not available in the given scope', httpCode: httpCode.BAD_REQUEST },
  [ERROR_CODES.INVALID_IDS_IN_TRY_NEW_APPS]: { message: '"Try New" Apps: Some of the IDs are invalid or the app is either inactive or not available in the given scope', httpCode: httpCode.BAD_REQUEST },
  [ERROR_CODES.INVALID_IDS_IN_TOP_CATEGORIES]: { message: 'Top Categories: Some of the IDs are invalid or the category is inactive', httpCode: httpCode.BAD_REQUEST },
  [ERROR_CODES.INVALID_APP_IDS_IN_BANNERS]: { message: 'Some of the banner(s) uses invalid App ID or the app is either not available in the given scope or is inactive', httpCode: httpCode.BAD_REQUEST },
  [ERROR_CODES.INVALID_BANNER_IDS_IN_BANNERS]: { message: 'Invalid Banner ID', httpCode: httpCode.BAD_REQUEST },
};

module.exports = {
  ERROR_CODES,
  ERROR_INFO
};
