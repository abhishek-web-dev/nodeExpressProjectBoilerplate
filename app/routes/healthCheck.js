// dependency library
const express = require('express')
const router = express.Router()

// feature modules


//server health check API
router.get(`/health`, (req, res) => res.send('Ok'));
/**
 * @apiGroup Health Check
 * @apiVersion  1.0.0
 * @apiDescription API for checking server health.
 * @api {get} /health API to check server health
 *
 * 
 *@apiSuccessExample {json} Success-Response: Status - 200
  {
      "Ok"
  }
*/


module.exports = router;