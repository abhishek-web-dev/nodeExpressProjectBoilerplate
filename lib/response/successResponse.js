
const successResponse = (data = {}, message = 'successfull!', statusCode = 200) => {
    return {
        statusCode,
        message,
        data
    }
}


module.exports = {successResponse};