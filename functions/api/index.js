const express = require('express');
const router = express.Router();

router.use('/push', require('./push'));

module.exports = router;
