const userService = require('./../user/service')



const updateUserSocketId = async (socket) => {
  await userService.updateUser(
    { userId: socket.handshake.query.userId },
    { socketId: socket.userId },
    { upsert: false }
  );
}


module.exports = {
  updateUserSocketId
}
