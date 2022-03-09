// core module
const crypto = require('crypto');

// dependency library
const axios = require('axios');

// feature modules
const config = require('./../../../lib/config')


const getProxyIP = async () => {
  const license = config.proxyLicenseKey;
  const secret = config.proxySecretKey;
  const ts = Math.floor(+new Date() / 1000);
  let queries = {
    license: license,
    time: ts,
    // iso: "IN",
    cnt: 1,
  };
  const md5Sum = crypto.createHash('md5');
  md5Sum.update(license + ts + secret);
  queries.sign = md5Sum.digest('hex').toLowerCase();

  return await axios.get('https://api.ttproxy.com/v1/obtain', { params: queries });
}


module.exports = {
  getProxyIP
}

