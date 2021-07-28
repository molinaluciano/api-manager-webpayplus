const Transaction = require("../model/transaction");
if (require("dotenv").config().error) {
  throw result.error;
}
const ENV = process.env.NODE_ENV || "local";
const config = require(`../config/environment/${ENV}.config.js`);

function generateDataTransaction(amount) {
  const session_id = new Date().getTime();
  const nroRandom = Math.ceil(Math.random() * 1000000);
  const buyOrder = nroRandom + session_id;

  const transaction = new Transaction(
    buyOrder,
    session_id,
    amount,
    config.transbank.returnUrl
  );

  return transaction;
}

module.exports = {
  generateDataTransaction,
};
