const { success, fail } = require('../../lib/util');
const sc = require('../../constants/statusCode');
const rm = require('../../constants/responseMessage');
const seat = require('../../lib/seat/result');
const functions = require('firebase-functions');

module.exports = async (req, res) => {
  const { room_number, type } = req.params;

  if (!room_number || !type) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));

  try {
    const result = await seat.getSeatData(room_number, type);
    if (!result) return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));

    return res.status(sc.OK).send(success(sc.OK, rm.READ_SEAT_SUCCESS, result));
  } catch (error) {
    console.log(error);
    res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  } finally {
  }
};
