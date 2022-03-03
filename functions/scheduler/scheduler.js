const schedule = require('node-schedule');
const work = require('./work');

const job = schedule.scheduleJob('0 * * * * *', () => {
  console.log('🚀 Auto updating Start');
  work.update();
});

module.exports = { job };
