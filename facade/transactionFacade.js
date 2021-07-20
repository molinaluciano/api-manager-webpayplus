const axios = require("axios");
const CreateTransactionError = require("../error/createTransactionError");
const transactionNotFoundError = require("../error/transactionNotFoundError");
if (require("dotenv").config().error) {
  throw result.error;
}

const environment = process.env.NODE_ENV || "local";
const config = require(`../config/environment/${environment}.config`);
const instance = axios.create({
  baseURL: config.urls.transbankUrl,
  headers: getHeaders(),
});

function getHeaders() {
  return {
    "Content-Type": "application/json",
    "Tbk-Api-Key-Id": config.authentication.tbkApiKeyId,
    "Tbk-Api-Key-Secret": `${config.authentication.tbkApiKeySecret}`,
  };
}

function createTransaction(Transaction) {
  return new Promise((resolve, reject) => {
    instance
      .post(config.endPoint.transbankEndPoint, Transaction)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(new CreateTransactionError(error.response.data.error_message));
      });
  });
}

function createCommit(token) {
  url = config.endPoint.transbankEndPoint + token;

  return new Promise((resolve, reject) => {
    instance
      .put(url)
      .then((result) => resolve(result.data))
      .catch((error) => {
        reject(new transactionNotFoundError(error.response.data.error_message));
      });
  });
}

function getStatus(token) {
  url = config.endPoint.transbankEndPoint + token;
  return new Promise((resolve, reject) => {
    instance
      .get(url)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(new transactionNotFoundError(error.response.data.error_message));
      });
  });
}

function refund(token, body) {
  url = config.endPoint.transbankEndPoint + token + "/refunds";
  return new Promise((resolve, reject) => {
    instance
      .post(url, body)
      .then((result) => resolve(result.data))
      .catch((error) =>
        reject(new transactionNotFoundError(error.response.data.error_message))
      );
  });
}

function capture(token, transaction) {
  url = config.endPoint.transbankEndPoint + token + "/capture";
  return new Promise((resolve, reject) => {
    instance
      .put(url, transaction)
      .then((result) => resolve(result.data))
      .catch((error) => {
        reject(new transactionNotFoundError(error.response.data.error_message));
      });
  });
}

module.exports = {
  createTransaction,
  createCommit,
  getStatus,
  refund,
  capture,
};
