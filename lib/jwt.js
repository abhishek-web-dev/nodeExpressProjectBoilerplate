// core module
const fs = require('fs');
const path = require('path');

// dependency module
const jwt = require('jsonwebtoken');
const config = require('./config')




const generateJWT = (payload, privateKey, options) => {
  return jwt.sign(payload, privateKey, options);
};

const verifyJWT = (token, publicKey, options) => {
  return jwt.verify(token, publicKey, options);
};

const getAppywareJwtToken = () => {
  const privateKey = fs.readFileSync(path.posix.join('lib', 'secretFiles', 'appywarePrivate.key'), 'utf8');
  const options = {
    subject: 'Authentication Token',
    algorithm: 'RS256',
    expiresIn: config.AppywareJwtAuthTokenExpiration || '5m',
  };

  const payload = { id: config.AppywareSecretKey };

  return generateJWT(payload, privateKey, options);
}

const verifyJwtToken = (token, option = {}) => {
  const publicKey = fs.readFileSync(path.posix.join('lib', 'secretFiles', 'jwtPublic.key'), 'utf8');

  return verifyJWT(token, publicKey, option);
}

const generateJwtToken = (payload, option = {}) => {
  const privateKey = fs.readFileSync(path.posix.join('lib', 'secretFiles', 'jwtPrivate.key'), 'utf8');

  return generateJWT(payload, privateKey, option);
}

module.exports = {
  getAppywareJwtToken,
  verifyJwtToken
};
