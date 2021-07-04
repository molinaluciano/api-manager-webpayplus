const Transaction = require("../model/transaction");
const {
  createTransaction,
  createCommit,
} = require("../facade/transactionFacade");
if (require("dotenv").config().error) {
  throw result.error;
}
const ENV = process.env.NODE_ENV || "local";
const config = require(`../config/environment/${ENV}.config.js`);

async function buildTransaction(amount, rut) {
  const session_id = new Date().getTime();
  const nroRandom = Math.ceil(Math.random() * 1000000);
  const buyOrder = rut + nroRandom;

  const transaction = new Transaction(
    buyOrder,
    session_id,
    amount,
    config.transbank.returnUrl
  );

  try {
    const resultTransaction = await createTransaction(transaction);

    const resultToRead = {
      url: resultTransaction.url + "?token_ws=" + resultTransaction.token,
      token: resultTransaction.token,
    };
    return resultToRead;
  } catch (error) {
    console.log(
      "🚀 ~ file: transbankService.js ~ line 24 ~ buildTransaction ~ error",
      error
    );
  }
}

async function buildCommit(token) {
  try {
    const resultCommit = await createCommit(token);
    return resultCommit;
  } catch (error) {
    console.log(
      "🚀 ~ file: transbankService.js ~ line 41 ~ buildCommit ~ error",
      error
    );
  }
}

module.exports = {
  buildTransaction,
  buildCommit,
};
