require('dotenv').config();

module.exports = {
   port: process.env.SERVER_PORT,
   environment: process.env.ENVIRONMENT, 
   allowedHosts: process.env.ALLOWED_HOSTS,
   mongoUrl: process.env.MONGO_URL
} 
















/*
// according to requirement latter use this architecture
// config/config.js
'use strict'
const common = require('./components/common')
const logger = require('./components/logger')
const redis = require('./components/redis')
const server = require('./components/server')
module.exports = Object.assign({}, common, logger, redis, server)
*/ 