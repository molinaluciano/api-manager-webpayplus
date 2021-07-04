const {
  buildTransaction,
  buildCommit,
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

module.exports = {
  composeTransaction,
  composeCommit,
};
