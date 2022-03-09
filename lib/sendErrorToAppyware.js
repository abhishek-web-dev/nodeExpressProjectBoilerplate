const axios = require('axios');

// dependency library
const config = require('./config');
const jwt = require('./jwt');

const sendErrorToAppyware = async (data) => {
  const payload = JSON.stringify(data);

  try {
    await axios({
      method: 'post',
      url: 'http://104.161.92.74:3326/error',
      data: payload,
      headers: { Authorization: jwt.getAppywareToken(), 'Content-Type': 'application/json' }
    });
  }
  catch (e) {
    // console.log('2. dont do anything!!')
  }
}

module.exports = {
  sendErrorToAppyware
}