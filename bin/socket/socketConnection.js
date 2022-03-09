// core module

// dependency library

// feature modules
// const { scrapingJobsHandler } = require('../../app/modules/scrapingJobs');
// const userDAL = require('./../../app/modules/user/DAL')


const socketConnection = async (socket, io) => {

  console.log('SOCKET has called!', socket.id)


  // // scraping jobs
  // scrapingJobsHandler.scrapingJobEvents(socket, io);


  // update user socket id after connection
  // await userDAL.updateUser(
  //   { userId: socket.handshake.query.userId },
  //   { socketId: socket.id },
  //   { upsert: false }
  // );

  // scraping jobs
  // scrapingJobsHandler.scrapingJobEvents(socket, io);


}


module.exports = {
  socketConnection
}