// dependency library
const express = require('express');
require('dotenv').config()
const cors = require('cors');
const helmet = require('helmet');


module.exports = (app) => {

    // serving apidoc to client
    if (process.env.ENVIRONMENT === 'dev') {
        app.use('/apidoc', express.static(__dirname + '/apidoc'));
    }

    // allow specific IP to access this API
    const corseOption = process.env.ENVIRONMENT === 'dev' ? {} : {
        origin: function (origin, callback) {
            if ((process.env.ALLOWED_HOSTS ? process.env.ALLOWED_HOSTS.split('::::') : []).indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback('Not allowed by CORS' , false);
            }
        }
    };
    app.use(cors(corseOption));
    app.use(helmet());
    app.use(require('morgan')('dev'));//for request logs 
    app.use(express.urlencoded({ extended: false }));//parse req
    app.use(express.json({ limit: "50mb" }));//parse req
    //app.use(require('typescript-require'));

    // import all routes
    require('../app/routes')(app);
    require('../lib/middlewares/404')(app);//router not found
}