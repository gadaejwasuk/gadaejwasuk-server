const express = require('express');
const router = express.Router();

router.use('/push', require('./push'));
router.use('/seat', require('./seat'));

module.exports = router;
