
const User = require('./model');


let createUser = async (data) => {
  return model.create(data);
};



module.exports = {
  createUser
};
