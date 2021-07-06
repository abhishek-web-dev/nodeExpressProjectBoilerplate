// feature modules
const healthCheckRouter = require('./healthCheck');
const pdfRouter = require('./pdf');



module.exports = (app) => {
    app.use(`/${process.env.API_VERSION}`, healthCheckRouter);
    app.use(`/${process.env.API_VERSION}/pdf`, pdfRouter);
}
