// dependency library
const mongoose = require('mongoose');

// feature modules
const config = require('../lib/config');

module.exports = {
    connect: () => {
        return new Promise((Resolve, Reject) => {
            mongoose.connect(
                config.mongoUrl,
                {
                    poolSize: 20,
                    keepAlive: true,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                    autoIndex: false,
                    useFindAndModify: false
                }, (err) => {
                    err ? Reject(err) : Resolve()
                });
        })
    }
}

mongoose.connection.on('connected', () => {
    console.log("  [Mongoose] default connection is open ")
});

mongoose.connection.on('error', (err) => {
    console.log("[MongooseError] default connection has occured " + err + " error")
});

mongoose.connection.on('disconnected', () => {
    console.log("[MongooseError] default connection is disconnected")
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log("[MongooseError] default connection is disconnected due to application termination")
        process.exit(0)
    });
});

