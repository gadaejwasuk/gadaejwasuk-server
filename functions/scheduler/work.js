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
      console.log(`📦 Updating ... ${idx.indexOf(index) + 1}/${len}`);
      const result = await seat.getSeatData(index.room_number, index.type);

      for (let item of result) {
        await seatDB.updateSeatData(client, item);
      }
    }

    console.log('✨ Seat data update complete ');
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
};

/**
 * @TODO
 * 도서관 운영시간에만 업데이트가 돌아가게끔 특정 시간에 job close 로직 넣기
 */

module.exports = { update };
