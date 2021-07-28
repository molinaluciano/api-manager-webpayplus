const express = require("express");
const transactionController = require("../controller/transactionController");
const {
  transactionValidation,
  transactionCaptureValidation,
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
router.post(
  "/refund/:token",
  validate(transactionValidation),
  transactionController.composeARefund,
  async (err, req, res, next) => {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err);
    }

    return res.status(500).json(err);
  }
);

router.post(
  "/capture/:token",
  validate(transactionCaptureValidation),
  transactionController.composeACapture,
  async (err, req, res, next) => {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err);
    }

    return res.status(500).json(err);
  }
);

module.exports = router;
