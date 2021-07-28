const {
  createTransaction,
  createCommit,
  getStatus,
  refund,
  capture,
} = require("../facade/transactionFacade");
const { generateDataTransaction } = require("../util/transaction");
const TransactionCapture = require("../model/transactionCapture");

async function buildTransaction(amount, rut) {
  const transaction = generateDataTransaction(amount);

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
