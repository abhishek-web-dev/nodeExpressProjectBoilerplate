const io = require("socket.io-client");

const socket = io.connect(`http://104.161.92.74:3327/instore`, {
  query: {
    web: "web"
  }
});

socket.on("connect_error", (err) => {
  console.log("err in connection", err);
});

socket.on("connect", function () {
  console.log("Connected ", socket.id);

  // create job
  socket.emit("createScrapingJob", {
    jobId: '123456789',
    type: 'testing',
    senderSocketId: socket.id,
    payload: { username: 'AK' }
  });

});

// job done
socket.on("completedJob", (data) => {
  console.log('completedJob : ', data);

  socket.emit("ackForJobCompletion", {//ack for job completion
    message: 'ok',
    jobId: data.jobId
  });
});

socket.on("disconnect", function () {
  console.log("Disconnected");
});


socket.on("server_error", (data) => {
  console.log(data);
});

