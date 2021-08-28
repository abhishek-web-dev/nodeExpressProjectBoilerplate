
const model = require('./model');

let findOrCreate = async (phoneNumber, diallingCode) => {
  return model.findOneAndUpdate(
    { phoneNumber, diallingCode },
    {
      $set: { lastLogin: Date.now() },
      $setOnInsert: { isPhoneVerified: true }
    },
    {
      upsert: true,
      setDefaultsOnInsert: true,
      useFindAndModify: false,
      returnOriginal: false,
    }
  );
};

let getById = async (userId) => {
  return model.getById(userId);
};

let getUserCountryAndLanguage = async (userId) => {
  return model.getById(userId).select('countryCode language');
};

let getByEmail = async (email) => {
  return model.findOne({ email });
};

let create = async (data) => {
  return model.createObj(data);
};

let getPaginatedList = async (payload) => {
  if (payload.findQuery.hasOwnProperty('isGlobal') && !payload.findQuery.countryCode) {
    payload.findQuery.countryCode = { $exists: !payload.findQuery.isGlobal };
  }
  delete payload.findQuery.isGlobal;

  return model.getPaginatedList(payload);
};

let updateById = async (id, updatedFields) => {
  return model.updateById(id, updatedFields);
};

let getList = (payload) => {
  return model.getList(payload);
};

let isPhoneNumberAvailable = async (phoneNumber, diallingCode) => {
  return model.exists({ phoneNumber, diallingCode });
};

module.exports = {
  findOrCreate,
  getById,
  getUserCountryAndLanguage,
  getByEmail,
  create,
  getPaginatedList,
  updateById,
  getList,
  isPhoneNumberAvailable
};
