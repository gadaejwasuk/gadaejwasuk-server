const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

// 좌석 정보 삽입
const addSeatData = async (client, data) => {
  const { rows } = await client.query(
    `
    INSERT INTO seat
    (room_number, seat_type, seat_number, is_using)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *
    `,
    [Number(data[0]), Number(data[1]), Number(data[2]), data[3]],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

// 좌석 정보 업데이트
const updateSeatData = async (client, data) => {
  const { rows } = await client.query(
    `
      UPDATE seat
      SET is_using = $2, updated_at = now()
      WHERE seat_id = $1
      RETURNING *
      `,
    [Number(data[2]), data[3]],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

module.exports = {
  addSeatData,
  updateSeatData,
};
