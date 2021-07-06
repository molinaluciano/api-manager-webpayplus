const {
  buildTransaction,
  buildCommit,
  askingStatus,
} = require("../service/transbankService");

async function composeTransaction(req, res) {
  const { amount, rut } = req.body;
  const transaction = await buildTransaction(amount, rut);
  res.status(200).send(transaction);
}

async function composeCommit(req, res) {
  const { token } = req.params;
  const commit = await buildCommit(token);
  res.status(200).send(commit);
}

async function composeAskAboutStatus(req, res) {
  const { token } = req.params;
  const status = await askingStatus(token);
  res.status(200).send(status);
}

module.exports = {
  composeTransaction,
  composeCommit,
  composeAskAboutStatus,
};
