const db = require('../db/db');
const seat = require('../lib/seat/result');
const { seatDB } = require('../db');

const update = async () => {
  const idx = [
    { room_number: 1, type: 1 },
    { room_number: 1, type: 2 },
    { room_number: 2, type: 1 },
    { room_number: 2, type: 2 },
    { room_number: 3, type: 1 },
    { room_number: 3, type: 2 },
  ];

  let client;

  try {
    client = await db.connect();
    const len = idx.length;

    for (let index of idx) {
      console.log(`π¦ Updating ... ${idx.indexOf(index) + 1}/${len}`);
      const result = await seat.getSeatData(index.room_number, index.type);

      for (let item of result) {
        await seatDB.updateSeatData(client, item);
      }
    }

    console.log('β¨ Seat data update complete ');
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
};

/**
 * @TODO
 * λμκ΄ μ΄μμκ°μλ§ μλ°μ΄νΈκ° λμκ°κ²λ νΉμ  μκ°μ job close λ‘μ§ λ£κΈ°
 */

module.exports = { update };
