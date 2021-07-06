// dependency library
const express = require('express')
const router = express.Router()

// feature modules
const controller = require('./../controller');


router.post('/mergePdf', controller.pdf.mergePdf);
/**
 * @apiGroup PDF
 * @apiVersion  1.0.0
 * @apiDescription API to merge pdf files
 * @api {post} /v1/pdf/mergePdf api to merge pdf files
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