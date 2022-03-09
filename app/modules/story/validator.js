// dependency library
const Joi = require('joi');

// write all validator logic

const getStory = {
  params: Joi.object().keys({
    userId: Joi.string().required()
  })
};


module.exports = {
  getStory
}

