const express = require("express");
const transactionController = require("../controller/transactionController");

const router = express.Router();

router.post("/create-transaction", transactionController.composeTransaction);
router.put("/create-commit/:token", transactionController.composeCommit);
router.get("/ask-status/:token", transactionController.composeAskAboutStatus);

module.exports = router;
