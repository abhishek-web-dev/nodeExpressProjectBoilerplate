
const { Joi, docSchema } = require('../../utils/validators');

const { getCountryCodeList, getLanuagesCodeList } = require('../miscallaneous/service');

const {
  MINIMUM_BANNERS,
  MINIMUM_FEATURED_APP,
  MINIMUM_PEOPLE_ARE_LOVING_APPS,
  MINIMUM_TRY_NEW_APPS,
  MINIMUM_TOP_CATEGORIES
} = require('./constant');

let update = {
  body: Joi.object().keys({
    scope: Joi.object().keys({
      isGlobal: Joi.boolean().required(),
      countryCode: Joi.string().valid(...getCountryCodeList())
        .when('isGlobal', { is: false, then: Joi.required(), otherwise: Joi.forbidden() }),
    }).required(),
    illustration: docSchema,
    topCategories: Joi.array().min(MINIMUM_TOP_CATEGORIES).items(Joi.string().mongoDBObjectID()).unique(),
    featuredApps: Joi.array().min(MINIMUM_FEATURED_APP).items(Joi.string().mongoDBObjectID()).unique(),
    tryNew: Joi.array().min(MINIMUM_TRY_NEW_APPS).items(Joi.string().mongoDBObjectID()).unique(),
    peopleAreLoving: Joi.array().min(MINIMUM_PEOPLE_ARE_LOVING_APPS).items(Joi.string().mongoDBObjectID()).unique(),
    banners: Joi.array().min(MINIMUM_BANNERS).items(Joi.object().required().keys({
      bannerId: Joi.string().mongoDBObjectID().required(),
      appId: Joi.string().mongoDBObjectID().required()
    })).unique('appId')
  })
};

let getStore = {
  query: Joi.object().keys({
    countryCode: Joi.valid(...getCountryCodeList()),
    languageCode: Joi.valid(...getLanuagesCodeList()),
  })
};

module.exports = {
  update,
  getStore
};
