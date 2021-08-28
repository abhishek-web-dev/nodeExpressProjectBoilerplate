
const { keys: redisKeys, redisClient } = require('../../redis');
const commonModelConstants = require('../../constants/model');
const constants = require('./constants');
const errorCodes = require('./error').ERROR_CODES;
const AppError = require('../../utils/appError');

let generateOtp = () => {
  let min = 1000, max = 10000;
  return String(Math.floor(Math.random() * (max - min)) + min).padStart(4, 0);
};

let setOtp = async (otpType, redisKeysData) => {
  let otp = generateOtp();
  redisKeysData.userType = commonModelConstants.USERTYPE_USER;

  let { getRedisOtpKey, getRedisOtpAttemptKey, expirationTime } = constants.OTP_UTILS[otpType];

  await Promise.all([
    redisClient.setAsync(getRedisOtpKey(redisKeysData), otp, 'ex', expirationTime),
    redisClient.setAsync(getRedisOtpAttemptKey(redisKeysData), 0)
  ]);

  return otp;
};

let validateOtp = async (otpType, inputOtp, redisKeysData, expireOtp = true) => {
  redisKeysData.userType = commonModelConstants.USERTYPE_USER;

  let { getRedisOtpKey, getRedisOtpAttemptKey } = constants.OTP_UTILS[otpType];

  let redisOtpKey = getRedisOtpKey(redisKeysData);
  let redisOtpAttemptsKey = getRedisOtpAttemptKey(redisKeysData);

  let storedOtp = await redisClient.getAsync(redisOtpKey);

  if (process.env.NODE_ENV == 'production' || inputOtp != '9999') {
    if (!storedOtp)
      throw new AppError(errorCodes.OTP_EXPIRED);
    if (inputOtp != storedOtp) {
      clearOtpFromRedis(redisOtpAttemptsKey, redisOtpKey);
      throw new AppError(errorCodes.INVALID_OTP);
    }
  }

  if (expireOtp) await redisClient.delAsync([redisOtpKey, redisOtpAttemptsKey]);
};

/*
  This helper checks the number of failed attempts for otp verification
  If it exceeds the predefined number, it will clear the otp from redis 
*/
let clearOtpFromRedis = async (redisOtpAttemptsKey, redisOtpKey) => {
  let newCount = await redisClient.incrAsync(redisOtpAttemptsKey);
  if (newCount >= constants.MAX_OTP_ATTEMPTS)
    await redisClient.delAsync([redisOtpAttemptsKey, redisOtpKey]);
};

let blacklistUser = async (userId) => {
  let blacklistUserKey = redisKeys.getBackListUserKey(commonModelConstants.USERTYPE_USER, userId);
  let expirationTime = (parseInt(process.env.AUTH_TOKEN_EXPIRATION) || 30) * 24 * 60 * 60;

  await redisClient.setAsync(blacklistUserKey, 1, 'ex', expirationTime); //Just setting the value as 1
};

let whitelistUser = async (userId) => {
  let blacklistUserKey = redisKeys.getBackListUserKey(commonModelConstants.USERTYPE_USER, userId);
  await redisClient.delAsync(blacklistUserKey);
};

let generateShortId = function (length = 6) {
  let text = '';

  const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

  // The first letter is always capital
  text += upperCaseLetters.charAt(Math.floor(Math.random() * upperCaseLetters.length));

  //The rest are either lowercase letters or numbers
  for (let i = 0; i < length - 1; i++) {
    text += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
  }

  return text;
};

module.exports = {
  setOtp,
  validateOtp,

  blacklistUser,
  whitelistUser,

  generateShortId
};
