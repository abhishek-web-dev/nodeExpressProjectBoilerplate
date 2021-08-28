
'use strict';

const MONGOOSE = require('mongoose');
const SCHEMA = MONGOOSE.Schema;

const { docSchema } = require('../../mongo/schemas');

const { getDiallingCodeList, getLanuagesCodeList } = require('../miscallaneous/service');

let interestSchema = new SCHEMA({
  _id: false,
  name: {
    type: String,
    required: true
  },
  icon: {
    type: docSchema,
    required: true
  }
});

let userSchema = new SCHEMA({
  firstName: {
    type: String,
    trim: true,
    search: true
  },
  lastName: {
    type: String,
    trim: true,
    search: true
  },
  phoneNumber: {
    type: Number,
    min: 1E7,
    max: 1E16
  },
  diallingCode: {
    type: String,
    enum: { values: getDiallingCodeList(), message: 'Invalid Dialling Code' },
  },
  countryCode: {
    type: String,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    search: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  googleAccountId: {
    type: String
  },
  facebookAccountId: {
    type: String,
  },
  profilePicture: {
    type: docSchema
  },
  interests: {
    type: [interestSchema],
  },
  language: {
    type: String,
    enum: { values: getLanuagesCodeList(), message: 'Invalid Language Code' },
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  lastLogin: {
    type: Date
  },
  shortId: {
    type: String,
    unique: true,
    sparse: true
  },
}, { timestamps: true });

userSchema.index({ phoneNumber: 1, diallingCode: 1 }, { unique: true, sparse: true });

let modelUser = MONGOOSE.model('user', userSchema);

module.exports = modelUser;
