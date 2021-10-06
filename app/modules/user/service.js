const DAL = require("./DAL");

const { ERROR_CODES } = require("./error");
const AppError = require("../../../lib/errorClasses/appError");



let createAccount = async ({firstName, lastName}) => {
   
  //TODO: save the user in DB
  // await DAL.createUser({firstName, lastName});

  //TODO: perform any logical operation

  return {firstName, lastName}
};


module.exports = {
  createAccount
};
