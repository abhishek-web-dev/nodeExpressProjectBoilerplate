const io = require("socket.io-client");

const socket = io.connect(`http://104.161.92.74:3327/instore`, {
  query: {
    userId: '12345'
  }
});

socket.on("connect_error", (err) => {
  console.log("err in connection", err);
});

socket.on("connect", function () {
  console.log("Connected", socket.id);
});

socket.on("disconnect", function () {
  console.log("Disconnected");
});


socket.on("server_error", (data) => {
  console.log(data);
});

// listen job
socket.on("assignJob", (data) => {
  console.log('assignJob data : ', data)

  // after getting job done
  socket.emit("workerJobDone", {
    jobId: data.jobId,
    senderSocketId: data.senderSocketId,
    receiverSocketId: data.receiverSocketId,
    result: { username: 'AK haha' }
  });
})

// listen all server errors
socket.on("serverError", (data) => {
  console.log(data);
});

