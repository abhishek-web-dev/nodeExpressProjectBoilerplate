
let successResponse = (response, httpCode, result) => {
    let responseObj = {
        statusCode: httpCode,
        result
    };

    // if (result && result.result) {
    //     responseObj = { ...responseObj, ...result };
    // }
    // else {
    //     responseObj.result = result;
    // }

    return response.status(httpCode).json(responseObj);
};


module.exports = { successResponse };