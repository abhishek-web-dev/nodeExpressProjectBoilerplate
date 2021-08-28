const { fileUploadFunction } = require('./controller/uploadFile');



module.exports = (socket, io) => {

    if (process.env.ENVIRONMENT === 'dev') {
        console.log("socket index.js called!");
    }

    fileUploadFunction(socket, io);
}