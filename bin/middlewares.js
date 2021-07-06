// dependency library
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const cors = require('cors');
const helmet = require('helmet');


module.exports = (app) => {

    // serving apidoc to client
    if (process.env.ENVIRONMENT === 'dev') {
        app.use('/apidoc', express.static(__dirname + '/apidoc'));
    }

    app.use(cors());
    app.use(helmet());
    app.use(require('morgan')('dev'));//for request logs 
    app.use(bodyParser.urlencoded({ extended: false }));//parse req
    app.use(bodyParser.json({ limit: "50mb" }));//parse req

    // import all routes
    require('../app/routes')(app);
    require('../lib/middlewares/404')(app);//router not found
}