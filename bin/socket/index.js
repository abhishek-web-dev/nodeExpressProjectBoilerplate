// core module

// dependency library

// feature modules
const { socketConnection } = require('./socketConnection');
const config = require('../../lib/config');



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
  io.of("/instore").use(require('./../../lib/middlewares/socketJwtAuthentication').socketJwtAuthentication);

  // listen connect event
  io.of("/instore").on('connection', (socket) => socketConnection(socket, io.of("/instore")));
}