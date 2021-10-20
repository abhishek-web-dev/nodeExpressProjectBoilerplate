
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
 *@apiParam {String} id Send user id as a query parameter
 *@apiParam {Array} stories Send stories as a array of object in body parameter
 *
 *
 *@apiSuccessExample {json} Success-Response: status - 200
   {

   }
  @apiErrorExample {json} Error-Response: status - 500
  {
    "errorToken": "GIAxie6YhRCe",
    "error": true,
    "statusCode": 202,
    "message": "Error related message!",
    "tryAgain": true,
    "data": {}
  }
*/


module.exports = router;