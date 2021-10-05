
const router = require('express').Router();
const controller = require('../modules/user/controller');
const asyncExecute = require('./../../lib/middlewares/asyncExecute');


router.get('/get-user-data', asyncExecute(controller.sendLoginOtp));
/**
 * @apiGroup PDF
 * @apiVersion  1.0.0
 * @apiDescription API to merge pdf files
 * @api {get} /v1/pdf/mergePdf api to merge pdf files
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