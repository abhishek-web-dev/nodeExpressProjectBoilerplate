module.exports = (app) => {
    app.use((req, res, next) => {

        res.status(404).send({ error: true, statusCode: 404, message: 'Route Not Found.' });

        next();
    });
}