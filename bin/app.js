// core module

// dependency library
const express = require('express');

// feature modules
const config = require('./../lib/config');


const app = express();

const server = require('http').createServer(app);

// initialize socket connection
require("./socket")(server);

// import all middlewares
require('./middlewares')(app);


// // connect with DB
// require('./mongoConnection').connect()
//     .then(x => {
//         console.log('[mongodb] mongoose connected');
//         console.log("[DB string]  ", config.mongoUrl);
//         server.listen(config.port, '0.0.0.0', function () {
//             console.log('   [server] listening on ' + config.port);
//         });
//     })
//     .catch(err => console.log(`  [error] ${err}`))

// listen server without DB
server.listen(config.port, '0.0.0.0', function () {
    console.log('   [server] listening on ' + config.port);
});



