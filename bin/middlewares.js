// dependency library
const config = require('./../lib/config');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


module.exports = (app) => {

    // serving apidoc to client
    if (config.environment === 'dev') {
        app.use('/apidoc', express.static(__dirname + '/apidoc'));
    }

    // allow specific IP to access this API
    const corseOption = config.environment === 'dev' ? {} : {
        origin: function (origin, callback) {
            if ((config.allowedHosts ? config.allowedHosts.split('::::') : []).indexOf(origin) !== -1) {
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