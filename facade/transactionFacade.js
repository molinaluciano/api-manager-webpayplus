const axios = require("axios");
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
    "Tbk-Api-Key-Id": config.authentication.tbkApiKeyId,
    "Tbk-Api-Key-Secret": `${config.authentication.tbkApiKeySecret}`,
  };
}

function createTransaction(Transaction) {
  return new Promise((resolve, reject) => {
    instance
      .post(config.endPoint.transbankEndPoint, Transaction)
      .then((result) => resolve(result.data))
      .catch((error) => reject(error));
  });
}

function createCommit(token) {
  url = config.endPoint.transbankEndPoint + token;
  return new Promise((resolve, reject) => {
    instance
      .put(url)
      .then((result) => resolve(result.data))
      .catch((error) => reject(error));
  });
}

function getStatus(token) {
  url = config.endPoint.transbankEndPoint + token;
  return new Promise((resolve, reject) => {
    instance
      .get(url)
      .then((result) => resolve(result.data))
      .catch((error) => reject(error));
  });
}

module.exports = {
  createTransaction,
  createCommit,
  getStatus,
};
