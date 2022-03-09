// dependency library
const express = require('express')
const router = express.Router()

// feature modules


router.use(`/`, require('./healthCheck'));
router.use(`/story`, require('./story'));


module.exports = router;


