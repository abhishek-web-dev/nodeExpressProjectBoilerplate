// dependency library
const express = require('express')
const router = express.Router()

// feature modules


router.use(`/`, require('./healthCheck'));
// router.use(`/pdf`, pdfRouter);


module.exports = router;


