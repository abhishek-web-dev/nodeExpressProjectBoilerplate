

'use strict';

const MONGOOSE = require('mongoose');
const SCHEMA = MONGOOSE.Schema;

const { docSchema } = require('../../mongo/schemas');

const { getCountryCodeList } = require('../miscallaneous/service');

let appStoreSchema = new SCHEMA({
  scope: {
    _id: false,
    type: {
      isGlobal: {
        type: Boolean,
        required: true
      },
      countryCode: {
        type: String,
        enum: { values: getCountryCodeList(), message: 'Invalid Country Code' },
      },
    },
    required: true,
    validate: [
      scope => scope.isGlobal || Boolean(scope.countryCode),
      'Country is required when isGlobal is set to false'
    ]
  },
  illustration: {
    type: docSchema
  },
  banners: {
    type: [
      {
        _id: false,
        appId: {
          type: SCHEMA.Types.ObjectId
        },
        bannerId: {
          type: SCHEMA.Types.ObjectId
        }
      }
    ],
  },
  topCategories: {
    type: [SCHEMA.Types.ObjectId],
  },
  featuredApps: {
    type: [SCHEMA.Types.ObjectId],
  },
  tryNew: {
    type: [SCHEMA.Types.ObjectId],
  },
  peopleAreLoving: {
    type: [SCHEMA.Types.ObjectId],
  }
}, { typePojoToMixed: false, timestamps: true });

let modelAppStore = MONGOOSE.model('appStore', appStoreSchema);

module.exports = modelAppStore;
