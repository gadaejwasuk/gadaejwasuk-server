const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

// 전체 유저 조회
const getAllUsers = async (client) => {
  const { rows } = await client.query(
    `
    SELECT * FROM "User" u
    WHERE is_deleted = FALSE
    `,
  );
  return convertSnakeToCamel.keysToCamel(rows);
};

module.exports = {
  getAllUsers,
};
