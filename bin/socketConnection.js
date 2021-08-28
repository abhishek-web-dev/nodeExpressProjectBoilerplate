// core module

// dependency library

// feature modules
const { validateToken } = require('./../app/socket/middleware/token');
const socketConnection = require('../app/socket');
const config = require('../lib/config');


module.exports = (server) => {
  let origin = config.environment === 'dev' ? "*" : "abc.com";
  // initialize socket
  let io = require('socket.io')(server, {
    cors: {
      origin: "*" //['abc.com','def.com']
    },
    maxHttpBufferSize: 7e6
  });

  // socket middleware
  io.of("/upload").use(validateToken);

  // listen connect event
  io.of("/upload").on('connect', (socket) => socketConnection(socket, io));
}