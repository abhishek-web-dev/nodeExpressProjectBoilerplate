const DAL = require("./DAL");
const miscellaneousService = require("../miscallaneous/service");

const commonModelConstants = require("../../constants/model");
const constants = require("./constants");
const utils = require("./utils");

const verifyGoogleIdToken = require("../../utils/socialLogin/google");
const verifyFacebookAccessToken = require("../../utils/socialLogin/facebook");

const { sendOtp, messageTypes, dlt_ID } = require("../../utils/msg91");
const jwtUtil = require("../../utils/jwt");

const { ERROR_CODES: COMMON_ERROR_CODES } = require("../../constants/error");
const { ERROR_CODES } = require("./error");
const AppError = require("../../utils/appError");

const { uploadFile } = require("../../utils/s3");
const csvWriter = require("csv-writer").createObjectCsvStringifier;
const { checkUniqueConstraintFailue } = require("../../mongo/utility");

let login = async (phoneNumber, diallingCode, otp) => {
  let formattedPhoneNumber = `${diallingCode}${phoneNumber}`;
  await utils.validateOtp(constants.OTP_TYPE_PHONE_LOGIN, otp, {
    phoneNumber: formattedPhoneNumber,
  });

  let userObj = await DAL.findOrCreate(phoneNumber, diallingCode);
  if (userObj.isBlocked) throw new AppError(COMMON_ERROR_CODES.USER_BLOCKED);

  if (!userObj.countryCode || !userObj.shortId) {
    userObj.shortId = userObj.shortId || utils.generateShortId();
    userObj.countryCode =
      userObj.countryCode || miscellaneousService.getCountryCode(diallingCode);
    userObj = await userObj.save();
  }

  userObj = await jwtUtil.addAuthToken(
    userObj,
    commonModelConstants.USERTYPE_USER
  );
  return userObj;
};

let guestLogin = async () => {
  return await jwtUtil.addAuthToken({}, commonModelConstants.USERTYPE_GUEST);
};

let getById = async (userId) => {
  let user = await DAL.getById(userId);
  if (!user) throw new AppError(COMMON_ERROR_CODES.OBJECT_NOT_FOUND);

  return user;
};

let updateById = async (userId, updatedFields) => {
  let user = await DAL.updateById(userId, updatedFields);
  if (!user) throw new AppError(COMMON_ERROR_CODES.OBJECT_NOT_FOUND);

  return user;
};

let sendLoginOtp = async (phoneNumber, diallingCode) => {
  let formattedPhoneNumber = `${diallingCode}${phoneNumber}`;

  let otp = await utils.setOtp(constants.OTP_TYPE_PHONE_LOGIN, {
    phoneNumber: formattedPhoneNumber,
  });
  sendOtp(
    dlt_ID.USER_LOGIN_OTP,
    phoneNumber,
    diallingCode,
    otp,
    messageTypes.USER_LOGIN_OTP
  );

  return otp;
};

let getUserCountryAndLanguage = async (userId) => {
  let user = await DAL.getUserCountryAndLanguage(userId);
  return { countryCode: user.countryCode, languageCode: user.language };
};

let googleSignin = async (idToken) => {
  let { googleAccountId, ...userInfo } = await verifyGoogleIdToken(idToken);
  let userObj = await socialSignIn({ userInfo, googleAccountId });
  return userObj;
};

let facebookSignin = async (accessToken) => {
  let { facebookAccountId, ...userInfo } = await verifyFacebookAccessToken(
    accessToken
  );
  let userObj = await socialSignIn({ userInfo, facebookAccountId });
  return userObj;
};

let socialSignIn = async ({ userInfo, facebookAccountId, googleAccountId }) => {
  let userObj = await DAL.getByEmail(userInfo.email);

  if (!userObj) {
    let data = {
      ...userInfo,
      lastLogin: Date.now(),
      shortId: utils.generateShortId(),
    };
    if (googleAccountId) data.googleAccountId = googleAccountId;
    if (facebookAccountId) data.facebookAccountId = facebookAccountId;

    userObj = await DAL.create(data);
  } else {
    if (userObj.isBlocked) throw new AppError(COMMON_ERROR_CODES.USER_BLOCKED);

    userObj.lastLogin = Date.now();
    userObj.isEmailVerified = userInfo.isEmailVerified;

    if (googleAccountId) userObj.googleAccountId = googleAccountId;
    if (facebookAccountId) userObj.facebookAccountId = facebookAccountId;

    userObj.firstName = userObj.firstName || userInfo.firstName;
    userObj.lastName = userObj.lastName || userInfo.lastName;
    userObj.shortId = userObj.shortId || utils.generateShortId();
    userObj.profilePicture = userObj.profilePicture || userInfo.profilePicture;

    userObj = await userObj.save();
  }

  userObj = await jwtUtil.addAuthToken(
    userObj,
    commonModelConstants.USERTYPE_USER
  );
  return userObj;
};

let getPaginatedList = async (payload) => {
  return DAL.getPaginatedList(payload);
};

let block = async (userId) => {
  let userObj = await getById(userId);
  if (userObj.isBlocked) return userObj;

  userObj.isBlocked = true;
  userObj = await userObj.save();

  await utils.blacklistUser(userId);
  return userObj;
};

let unblock = async (userId) => {
  let result = await updateById(userId, { isBlocked: false });

  await utils.whitelistUser(userId);
  return result;
};

let exportList = async (payload) => {
  payload.select =
    "firstName lastName phoneNumber diallingCode countryCode language interests";
  let result = await DAL.getList(payload);

  const csv = csvWriter({
    header: [
      { id: "firstName", title: "First Name" },
      { id: "lastName", title: "Last Name" },
      { id: "country", title: "Country" },
      { id: "language", title: "Language" },
      { id: "interests", title: "Interests" },
      { id: "phoneNumber", title: "Phone" },
    ],
  });

  result = result.map((userObj) => {
    return {
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      country: miscellaneousService.getCountryName(userObj.countryCode),
      language: userObj.language,
      interests:
        userObj.interests && userObj.interests.length > 0
          ? userObj.interests.map((interest) => interest.name).join(" | ")
          : undefined,
      phoneNumber: userObj.phoneNumber
        ? `(${userObj.diallingCode}) ${userObj.phoneNumber}`
        : undefined,
    };
  });

  let csvString = csv.getHeaderString() + csv.stringifyRecords(result);

  let file = {
    name: `CSV/UsersListing-${Date.now()}.csv`,
    ContentType: "text/csv",
    ContentDisposition: "inline",
    data: Buffer.from(csvString, "utf8"),
  };
  let { Location: url } = await uploadFile(file);

  return url;
};

let sendUpdatePhoneOtp = async (userId, phoneNumber, diallingCode) => {
  let userObj = await getById(userId);

  if (await DAL.isPhoneNumberAvailable(phoneNumber, diallingCode))
    throw new AppError(ERROR_CODES.PHONE_NUMBER_ALREADY_IN_USE);

  let formattedPhoneNumber = `${diallingCode}${phoneNumber}`;

  let otp = await utils.setOtp(constants.OTP_TYPE_PHONE_UPDATE, {
    userId: userObj.id,
    phoneNumber: formattedPhoneNumber,
  });
  sendOtp(
    dlt_ID.USER_PHONE_UPDATE_OTP,
    phoneNumber,
    diallingCode,
    otp,
    messageTypes.USER_PHONE_UPDATE_OTP,
    { phoneNumber: formattedPhoneNumber }
  );

  return otp;
};

let updatePhone = async (userId, phoneNumber, diallingCode, otp) => {
  let userObj = await getById(userId);

  let formattedPhoneNumber = `${diallingCode}${phoneNumber}`;
  await utils.validateOtp(constants.OTP_TYPE_PHONE_UPDATE, otp, {
    userId: userObj.id,
    phoneNumber: formattedPhoneNumber,
  });

  userObj.phoneNumber = phoneNumber;
  userObj.diallingCode = diallingCode;
  userObj.countryCode = miscellaneousService.getCountryCode(diallingCode);
  userObj = await checkUniqueConstraintFailue(
    userObj.save(),
    ERROR_CODES.PHONE_NUMBER_ALREADY_IN_USE
  );

  return userObj;
};

module.exports = {
  sendLoginOtp,
  login,
  guestLogin,
  getById,
  getUserCountryAndLanguage,
  googleSignin,
  facebookSignin,
  getPaginatedList,
  updateById,
  block,
  unblock,
  exportList,
  sendUpdatePhoneOtp,
  updatePhone,
};
