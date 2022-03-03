const { success, fail } = require('../../lib/util');
const sc = require('../../constants/statusCode');
const rm = require('../../constants/responseMessage');
const admin = require('firebase-admin');

module.exports = async (req, res, next) => {
  const target_token = 'e2k1ZL3cet-NAHp3gz_wB:BZX12cw23HGnGqSJQLGrazzasdca3tq0JkPKJlTY5cHmylMiR8dAdGAdKi9o_rf9y55H1mmvvAgHj0ZKjZyk23Q_trNrmgQx1A6h3LaoADdlPV-kX5czoDnL1F-gc2DOZJucEmf4To6hje4AfHl';

  const message = {
    data: { title: '푸시알림 테스트', body: '푸시알림 테스트합니다.', style: '테스트' },
    token: target_token,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log('Successfully sent message: : ', response);
      return res.status(sc.OK).send(success(sc.OK, rm.READ_PUSH_SUCCESS, {}));
    })
    .catch((err) => {
      console.log('Error Sending message!!! : ', err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    });
};
