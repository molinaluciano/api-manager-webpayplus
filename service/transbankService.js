const Transaction = require("../model/transaction");
const {
  createTransaction,
  createCommit,
  getStatus,
  refund,
  capture,
} = require("../facade/transactionFacade");
const TransactionCapture = require("../model/transactionCapture");
if (require("dotenv").config().error) {
  throw result.error;
}
const ENV = process.env.NODE_ENV || "local";
const config = require(`../config/environment/${ENV}.config.js`);

async function buildTransaction(amount, rut) {
  const session_id = new Date().getTime();
  const nroRandom = Math.ceil(Math.random() * 1000000);
  const buyOrder = nroRandom + session_id;

  const transaction = new Transaction(
    buyOrder,
    session_id,
    amount,
    config.transbank.returnUrl
  );

  let responseResult = [];
  try {
    const resultTransaction = await createTransaction(transaction);

    responseResult = {
      url: resultTransaction.url + "?token_ws=" + resultTransaction.token,
      token: resultTransaction.token,
    };
  } catch (error) {
    throw error;
  }

  return responseResult;
}

async function buildCommit(token) {
  try {
    const resultCommit = await createCommit(token);
    return resultCommit;
  } catch (error) {
    throw error;
  }
}

async function buildAskStatus(token) {
  try {
    const result = await getStatus(token);
    return result;
  } catch (error) {
    throw error;
  }
}

async function buildVoidAPayment(token, body) {
  try {
    const result = await refund(token, body);
    return result;
  } catch (error) {
    throw error;
  }
}

async function buildCapture(token, buy_order, authorization_code, amount) {
  try {
    const transaction = new TransactionCapture(
      buy_order,
      authorization_code,
      amount
    );
    const result = await capture(token, transaction);
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  buildTransaction,
  buildCommit,
  buildAskStatus,
  buildVoidAPayment,
  buildCapture,
};
