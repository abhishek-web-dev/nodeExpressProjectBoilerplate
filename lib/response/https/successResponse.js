// all success response will pass through this method
let successResponse = (response, httpCode, result) => {
    const responseObj = {
        statusCode: httpCode,
        result
    };

    return response.status(httpCode).json(responseObj);
};


module.exports = { successResponse };