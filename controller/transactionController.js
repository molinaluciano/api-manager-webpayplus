const {
  buildTransaction,
  buildCommit,
  askingStatus,
} = require("../service/transbankService");
const { responseData } = require("../util/converterResponseData");

async function composeTransaction(req, res) {
  const { amount, rut } = req.body;
  let response = [];

  try {
    const transaction = await buildTransaction(amount, rut);
    response = responseData(transaction);
  } catch (error) {
    response = responseData(error);
  }

  res.status(response.code).send(response.data);
}

async function composeCommit(req, res) {
  const { token } = req.params;
  let response = [];
  try {
    response = await buildCommit(token);
    response = responseData(response);
  } catch (error) {
    response = responseData(error);
  }
  res.status(response.code).send(response);
}

async function composeAskAboutStatus(req, res) {
  const { token } = req.params;
  let response = [];
  try {
    const status = await askingStatus(token);
    response = responseData(status);
  } catch (error) {
    response = responseData(error);
  }
  res.status(response.code).send(response);
}

module.exports = {
  composeTransaction,
  composeCommit,
  composeAskAboutStatus,
};
