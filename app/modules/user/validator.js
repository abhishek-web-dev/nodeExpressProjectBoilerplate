
const Joi = require('joi');

// write all validator logic

const createUser = {
  body: Joi.object().keys({
    firstName: Joi.string().required().min(5).max(10),
    lastName: Joi.string().required()
  })
};


module.exports = {
  createUser
}

