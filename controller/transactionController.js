const { buildTransaction } = require("../service/transbankService");
async function composeTransaction(req, res) {
  const { amount, rut } = req.body;
  const transaction = await buildTransaction(amount, rut);
  console.log(
    "🚀 ~ file: transactionController.js ~ line 5 ~ composeTransaction ~ transaction",
    transaction
  );
}

module.exports = {
  composeTransaction,
};
