

const { httpCode } = require('../../constants/http');

const ERROR_CODES = {
  OTP_EXPIRED: 1100,
  INVALID_OTP: 1101,
  PHONE_NUMBER_ALREADY_IN_USE: 1102,
};

const ERROR_INFO = {
  [ERROR_CODES.OTP_EXPIRED]: { message: 'Your OTP has expired', httpCode: httpCode.BAD_REQUEST },
  [ERROR_CODES.INVALID_OTP]: { message: 'Invalid OTP', httpCode: httpCode.BAD_REQUEST },
  [ERROR_CODES.PHONE_NUMBER_ALREADY_IN_USE]: { message: 'This phone number is already in use', httpCode: httpCode.BAD_REQUEST }
};

module.exports = {
  ERROR_CODES,
  ERROR_INFO
};
