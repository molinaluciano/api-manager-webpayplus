const express = require("express");
const transactionController = require("../controller/transactionController");
const {
  transactionValidation,
} = require("../config/validation/transactionValidation");
const { validate, ValidationError } = require("express-validation");

const router = express.Router();

router.post(
  "/create-transaction",
  validate(transactionValidation),
  transactionController.composeTransaction,
  async (err, req, res, next) => {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err);
    }

    return res.status(500).json(err);
  }
);
router.put("/create-commit/:token", transactionController.composeCommit);
router.get("/ask-status/:token", transactionController.composeAskAboutStatus);

module.exports = router;
