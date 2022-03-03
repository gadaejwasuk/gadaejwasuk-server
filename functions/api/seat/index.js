const express = require('express');
const router = express.Router();

router.get('/:room_number/:type', require('./seatGET'));

module.exports = router;
