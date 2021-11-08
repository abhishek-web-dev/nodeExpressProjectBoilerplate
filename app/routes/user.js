
const router = require('express').Router();
const controller = require('../modules/user/controller');
const asyncExecute = require('./../../lib/middlewares/asyncExecute');


router.post('/get-user-data', asyncExecute(controller.createUser));
/**
 * @apiGroup USER
 * @apiVersion  1.0.0
 * @apiDescription API to merge pdf files
 * @api {post} /v1/user/get-user-data api to merge pdf files
 *
 *@apiParam {String} firstName Send first name as a body parameter
 *@apiParam {String} lastName Send last name as a body parameter
 *
 *
 *@apiSuccessExample {json} Success-Response: status - 200
  {
      "statusCode": 200,
      "result": {
          "message": "User has created successfully!",
          "name": "Abhishek apy"
      }
  }
  @apiErrorExample {json} Error-Response: status - 500
  {
      "statusCode": 400,
      "error": {
          "errorDescription": "Invalid body in request",
          "type": "",
          "errorUserTitle": "",
          "errorUserMsg": "Bad Request"
      }
  }
*/


module.exports = router;