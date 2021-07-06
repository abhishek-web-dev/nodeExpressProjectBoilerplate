// core module

// dependency library
const express = require('express');

// feature modules



const app = express();

const server = require('http').createServer(app);

// import all middlewares
require('./middlewares')(app);


server.listen(process.env.SERVER_PORT, '0.0.0.0', function () {
    console.log('   [server] listening on ' + process.env.SERVER_PORT);
});

