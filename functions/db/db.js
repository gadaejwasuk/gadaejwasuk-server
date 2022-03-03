const functions = require('firebase-functions');
const { Pool, Query } = require('pg');
const dayjs = require('dayjs');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = require('../config/dbConfig');

console.log(`
    ####################################################
    #                    DB Running                    #
    #  Server Running on ${process.env.NODE_ENV} mode  #
    ####################################################
`);

const pool = new Pool({
  ...dbConfig,
  connectionTimeoutMillis: 60 * 1000,
  idleTimeoutMillis: 60 * 1000,
});

// TODO. 커넥션 콘솔 수정하기
const connect = async (req) => {
  const client = await pool.connect();
  const { query } = client;
  const { release } = client;

  client.query = (...args) => {
    client.lastQuery = args;
    return query.apply(client, args);
  };
  client.release = () => {
    client.query = query;
    client.release = release;
    return release.apply(client);
  };
  return client;
};

module.exports = {
  connect,
};
