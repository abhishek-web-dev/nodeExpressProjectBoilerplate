

const { httpCode } = require('../../constants/http');

const ERROR_CODES = {
  OTP_EXPIRED: 1100,
  INVALID_OTP: 1101
};

const ERROR_INFO = {
  [ERROR_CODES.OTP_EXPIRED]: { 
    errorDescription:'Your OTP has expired',
    type:'',
    errorUserTitle:'',
    errorUserMsg: httpMessage[httpCode.BAD_REQUEST], 
    httpCode: httpCode.BAD_REQUEST 
  },
  [ERROR_CODES.INVALID_OTP]: { 
    errorDescription:'Invalid OTP',
    type:'',
    errorUserTitle:'',
    errorUserMsg: httpMessage[httpCode.BAD_REQUEST], 
    httpCode: httpCode.BAD_REQUEST 
  }
};

module.exports = {
  ERROR_CODES,
  ERROR_INFO
};
