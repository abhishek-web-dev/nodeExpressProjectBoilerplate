const DAL = require('./DAL')
const userDAL = require('./../user/DAL')
const config = require('./../../../lib/config')
const { CREATED, RECEIVED } = require('./constants');
const SocketError = require('../../../lib/errorClasses/socketError');
const { errorResponse } = require('../../../lib/response/socket/errorResponse');
const { successResponse } = require('../../../lib/response/socket/successResponse');
const { ERROR_CODES } = require("./error");



const scrapingJobEvents = async (socket, io) => {


  // listen jobs completed by live users
  socket.on("workerJobDone", async (data) => {

    try {
      // TODO: update worker user data
      await userDAL.updateUser({ socketId: data.receiverSocketId }, { isWorking: false, lastScrapingTime: new Date(), "$inc": { scrappingCount: 1 } }, { upsert: false });

      // TODO: update job status
      await DAL.updateJob({ jobId: data.jobId }, { status: RECEIVED, result: data.result }, { upsert: false });

      // TODO: send scrapped data to web user
      console.log('workerJobDone data : ', data)
      io.to(data.senderSocketId).emit("completedJob", successResponse(data));//send scraped data to web users
    }
    catch (error) {
      errorResponse({ io, socketId: data.senderSocketId, error });
    }

  });


  socket.on("disconnect", async (reason) => {
    console.log('socket disconnected 1 : ', reason, socket.id)

    // console.log('socket disconnected 2 : ', (new SocketError(ERROR_CODES.COOKIES_NOT_AVAILABLE_IN_STORY)) instanceof SocketError, typeof (new SocketError(ERROR_CODES.COOKIES_NOT_AVAILABLE_IN_STORY)), new SocketError(ERROR_CODES.COOKIES_NOT_AVAILABLE_IN_STORY))

  });


}


module.exports = { scrapingJobEvents }