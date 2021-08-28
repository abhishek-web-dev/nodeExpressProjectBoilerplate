
const redisKeys = require('../../redis/keys');

const MAX_OTP_ATTEMPTS = 3;

const OTP_TYPE_PHONE_LOGIN = 1;
const OTP_TYPE_PHONE_UPDATE = 2;

const OTP_UTILS = {
  [OTP_TYPE_PHONE_LOGIN]: {
    getRedisOtpKey: redisKeys.getPhoneLoginOtpKey,
    getRedisOtpAttemptKey: redisKeys.getPhoneLoginOtpAttemptsKey,
    expirationTime: 3 * 60,
  },
  [OTP_TYPE_PHONE_UPDATE]: {
    getRedisOtpKey: redisKeys.getPhoneUpdateOtpKey,
    getRedisOtpAttemptKey: redisKeys.getPhoneUpdateOtpAttemptsKey,
    expirationTime: 3 * 60,
  },
};

module.exports = {
  MAX_OTP_ATTEMPTS,

  OTP_TYPE_PHONE_LOGIN,
  OTP_TYPE_PHONE_UPDATE,
  OTP_UTILS
};
